#!/usr/bin/env node
/**
 * Copies leads from the old Neon database into Firebase (Firestore).
 * Run once more right after going live, to pick up bookings that reached Neon
 * before the switch. Safe to repeat: leads are keyed by their DEPWEB code.
 *
 *   node --env-file=.env.local --env-file=<file with DATABASE_URL> scripts/sync-neon-leads.mjs
 *
 * Delete this script (and the Neon database) once you no longer need it.
 */
import dns from "node:dns";
import https from "node:https";
import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

for (const key of ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY", "DATABASE_URL"]) {
    if (!process.env[key]) {
        console.error(`✗ ${key} is missing.`);
        process.exit(1);
    }
}

initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
});
const db = getFirestore();

// Some Indian ISPs (e.g. Jio) don't resolve *.neon.tech, so fall back to
// public DNS (Google / Cloudflare).
const publicResolver = new dns.Resolver();
publicResolver.setServers(["8.8.8.8", "1.1.1.1"]);
function publicLookup(hostname, options, callback) {
    dns.lookup(hostname, options, (err, address, family) => {
        if (!err) return callback(null, address, family);
        publicResolver.resolve4(hostname, (err2, addrs) => {
            if (err2 || !addrs?.length) return callback(err2 || err);
            if (options?.all) return callback(null, addrs.map((a) => ({ address: a, family: 4 })));
            callback(null, addrs[0], 4);
        });
    });
}

function neonQuery(sql) {
    const url = new URL(process.env.DATABASE_URL);
    // Neon's HTTP SQL endpoint: first host label replaced with "api".
    const host = url.hostname.replace(/^[^.]+\./, "api.");
    const body = JSON.stringify({ query: sql, params: [] });
    return new Promise((resolve, reject) => {
        const req = https.request(
            {
                host,
                path: "/sql",
                method: "POST",
                lookup: publicLookup,
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": Buffer.byteLength(body),
                    "Neon-Connection-String": process.env.DATABASE_URL,
                },
            },
            (res) => {
                let data = "";
                res.on("data", (c) => (data += c));
                res.on("end", () => {
                    if (res.statusCode !== 200) return reject(new Error(`Neon HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
                    resolve(JSON.parse(data).rows);
                });
            },
        );
        req.on("error", reject);
        req.end(body);
    });
}

try {
    const rows = await neonQuery(`
        SELECT id, code, number, type, name, phone, email, pet_type, category, service, price, city, pincode,
               date, time_slot, message, source, status, timestamp, utm_source, utm_medium, utm_campaign, created_at
        FROM leads ORDER BY number ASC`);

    // Don't overwrite leads already in Firestore (their status may have been changed in the admin).
    const existing = new Set((await db.collection("leads").select().get()).docs.map((d) => d.id));
    const fresh = rows.filter((r) => !existing.has(r.code));

    let max = 0;
    for (const r of rows) max = Math.max(max, Number(r.number) || 0);
    for (let i = 0; i < fresh.length; i += 400) {
        const batch = db.batch();
        for (const r of fresh.slice(i, i + 400)) {
            batch.set(db.collection("leads").doc(r.code), {
                id: r.id, code: r.code, number: Number(r.number), type: r.type, name: r.name, phone: r.phone,
                email: r.email || "", petType: r.pet_type || "", category: r.category || "", service: r.service || "",
                price: r.price || "", city: r.city || "", pincode: r.pincode || "", date: r.date || "",
                timeSlot: r.time_slot || "", message: r.message || "", source: r.source || "", status: r.status,
                timestamp: r.timestamp, utm_source: r.utm_source || "", utm_medium: r.utm_medium || "",
                utm_campaign: r.utm_campaign || "",
                createdAt: r.created_at ? new Date(r.created_at) : FieldValue.serverTimestamp(),
            });
        }
        await batch.commit();
    }

    // Keep the DEPWEB00<N> sequence ahead of every lead in either database.
    const counterRef = db.collection("counters").doc("leads");
    const current = (await counterRef.get()).data()?.next ?? 0;
    await counterRef.set({ next: Math.max(current, max) }, { merge: true });

    console.log(`✓ ${fresh.length} new leads copied (${rows.length} in Neon, ${existing.size} already in Firebase). Next code: DEPWEB00${Math.max(current, max) + 1}`);
} catch (err) {
    console.error("✗ Sync failed:", err.message);
    process.exit(1);
}

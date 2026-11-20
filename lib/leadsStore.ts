import "server-only";
import fs from "fs/promises";
import path from "path";
import { FieldValue } from "firebase-admin/firestore";
import { db, isFirebaseConfigured } from "./firebase/admin";
import type { AdminSettings, Lead } from "./leadTypes";

export type { AdminSettings, Lead } from "./leadTypes";

// Leads and admin settings live in Firestore:
//   leads/{code}        one document per booking / contact enquiry
//   counters/leads      { next: number } — sequential DEPWEB00<N> codes
//   config/admin        notification settings + admin login (hashed password)
// When Firebase isn't configured (local dev without keys) everything falls
// back to JSON files in /data so the site still works.

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

type StoredSettings = AdminSettings & {
    adminUsername?: string;
    adminPassword?: string; // legacy plaintext, replaced by adminPasswordHash on next login
    adminPasswordHash?: string;
};

const DEFAULT_SETTINGS: StoredSettings = {
    notificationRecipientEmail: "deepetservices1@gmail.com",
    senderDisplayName: "DeePets Notifications",
    senderEmail: "contact@deepetservices.com",
    enableEmailNotifications: true,
    googleScriptWebhookUrl: "",
    adminUsername: "1",
    adminPassword: "1",
};

let cachedSettings: StoredSettings | null = null;
let settingsCacheTime = 0;
const SETTINGS_CACHE_TTL = 30_000;

// ---------------------------------------------------------------- local fallback
async function readJson<T>(file: string, fallback: T): Promise<T> {
    try {
        return JSON.parse(await fs.readFile(file, "utf-8")) as T;
    } catch {
        return fallback;
    }
}

async function writeJson(file: string, value: unknown) {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        await fs.writeFile(file, JSON.stringify(value, null, 2), "utf-8");
    } catch {
        // read-only filesystem (e.g. serverless) — ignore
    }
}

function nowTimestamp(): string {
    return new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
}

function toLead(data: FirebaseFirestore.DocumentData): Lead {
    const { createdAt: _createdAt, ...rest } = data;
    return rest as Lead;
}

// ---------------------------------------------------------------- leads
export async function getLeads(): Promise<Lead[]> {
    if (!isFirebaseConfigured()) return readJson<Lead[]>(LEADS_FILE, []);
    const snap = await db().collection("leads").orderBy("number", "desc").get();
    return snap.docs.map((d) => toLead(d.data()));
}

export async function addLead(
    newLeadData: Omit<Lead, "id" | "code" | "number" | "timestamp" | "status"> & {
        status?: Lead["status"];
    },
): Promise<Lead> {
    const status = newLeadData.status || "Pending";
    const timestamp = nowTimestamp();

    if (!isFirebaseConfigured()) {
        const list = await readJson<Lead[]>(LEADS_FILE, []);
        const number = list.reduce((m, l) => Math.max(m, l.number || 0), 0) + 1;
        const code = `DEPWEB00${number}`;
        const lead: Lead = { ...newLeadData, id: code, code, number, status, timestamp };
        list.unshift(lead);
        await writeJson(LEADS_FILE, list);
        return lead;
    }

    const firestore = db();
    const counterRef = firestore.collection("counters").doc("leads");

    // One transaction: bump the counter and create the lead with that number,
    // so two simultaneous bookings can never get the same code.
    return firestore.runTransaction(async (tx) => {
        const counter = await tx.get(counterRef);
        const number = ((counter.data()?.next as number | undefined) ?? 0) + 1;
        const code = `DEPWEB00${number}`;
        const lead: Lead = {
            ...newLeadData,
            petType: newLeadData.petType || "Dog",
            price: String(newLeadData.price ?? "0"),
            source: newLeadData.source || "Website Form",
            id: code,
            code,
            number,
            status,
            timestamp,
        };
        tx.set(counterRef, { next: number }, { merge: true });
        tx.set(firestore.collection("leads").doc(code), {
            ...lead,
            createdAt: FieldValue.serverTimestamp(),
        });
        return lead;
    });
}

export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<Lead | null> {
    if (!isFirebaseConfigured()) {
        const list = await readJson<Lead[]>(LEADS_FILE, []);
        const lead = list.find((l) => l.id === id || l.code === id);
        if (!lead) return null;
        lead.status = status;
        await writeJson(LEADS_FILE, list);
        return lead;
    }
    const ref = db().collection("leads").doc(id);
    const snap = await ref.get();
    if (!snap.exists) return null;
    await ref.update({ status });
    return { ...toLead(snap.data()!), status };
}

export async function deleteLead(id: string): Promise<boolean> {
    if (!isFirebaseConfigured()) {
        const list = await readJson<Lead[]>(LEADS_FILE, []);
        const filtered = list.filter((l) => l.id !== id && l.code !== id);
        await writeJson(LEADS_FILE, filtered);
        return filtered.length !== list.length;
    }
    const ref = db().collection("leads").doc(id);
    if (!(await ref.get()).exists) return false;
    await ref.delete();
    return true;
}

// ---------------------------------------------------------------- settings
/** Full settings including login fields — server use only. */
export async function getStoredSettings(): Promise<StoredSettings> {
    if (cachedSettings && Date.now() - settingsCacheTime < SETTINGS_CACHE_TTL) {
        return cachedSettings;
    }
    let fresh: StoredSettings;
    if (!isFirebaseConfigured()) {
        fresh = { ...DEFAULT_SETTINGS, ...(await readJson(SETTINGS_FILE, {})) };
    } else {
        const snap = await db().collection("config").doc("admin").get();
        fresh = { ...DEFAULT_SETTINGS, ...(snap.data() as Partial<StoredSettings> | undefined) };
    }
    cachedSettings = fresh;
    settingsCacheTime = Date.now();
    return fresh;
}

/** Settings safe to send to the browser (no password fields). */
export async function getSettings(): Promise<AdminSettings & { adminUsername: string }> {
    const s = await getStoredSettings();
    return {
        notificationRecipientEmail: s.notificationRecipientEmail,
        senderDisplayName: s.senderDisplayName,
        senderEmail: s.senderEmail,
        enableEmailNotifications: s.enableEmailNotifications,
        googleScriptWebhookUrl: s.googleScriptWebhookUrl,
        adminUsername: s.adminUsername || "1",
    };
}

const EDITABLE_KEYS: (keyof AdminSettings)[] = [
    "notificationRecipientEmail",
    "senderDisplayName",
    "senderEmail",
    "enableEmailNotifications",
    "googleScriptWebhookUrl",
];

/** Saves notification settings. Login fields are ignored here — see saveCredentials. */
export async function saveSettings(input: Partial<AdminSettings>) {
    const patch: Partial<AdminSettings> = {};
    for (const key of EDITABLE_KEYS) {
        if (input[key] !== undefined) (patch as Record<string, unknown>)[key] = input[key];
    }
    await writeStored(patch);
    return getSettings();
}

export async function saveCredentials(username: string, passwordHash: string) {
    await writeStored({ adminUsername: username, adminPasswordHash: passwordHash, adminPassword: "" });
}

async function writeStored(patch: Partial<StoredSettings>) {
    const current = await getStoredSettings();
    const updated = { ...current, ...patch };
    if (!isFirebaseConfigured()) {
        await writeJson(SETTINGS_FILE, updated);
    } else {
        await db().collection("config").doc("admin").set(
            { ...patch, updatedAt: FieldValue.serverTimestamp() },
            { merge: true },
        );
    }
    cachedSettings = updated;
    settingsCacheTime = Date.now();
}

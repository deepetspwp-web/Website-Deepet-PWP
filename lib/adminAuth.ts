import "server-only";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Signed, httpOnly session cookie for the /admin panel. Every /api/admin/*
// route calls requireAdmin() so the data APIs can't be used without logging in.

const COOKIE = "deepet_admin";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret(): string {
    const s =
        process.env.ADMIN_SESSION_SECRET ||
        // Fallback keeps sessions working when only the Firebase key is set.
        process.env.FIREBASE_PRIVATE_KEY ||
        (process.env.NODE_ENV !== "production" ? "local-dev-only-secret" : "");
    if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
    return s;
}

function sign(payload: string): string {
    return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export async function createSession(username: string) {
    const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
    const payload = Buffer.from(JSON.stringify({ u: username, exp })).toString("base64url");
    const jar = await cookies();
    jar.set(COOKIE, `${payload}.${sign(payload)}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
    });
}

export async function clearSession() {
    (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<{ username: string } | null> {
    const raw = (await cookies()).get(COOKIE)?.value;
    if (!raw) return null;
    const [payload, sig] = raw.split(".");
    if (!payload || !sig) return null;
    const expected = sign(payload);
    if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
        return null;
    }
    try {
        const { u, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
        if (typeof exp !== "number" || exp < Date.now() / 1000) return null;
        return { username: String(u) };
    } catch {
        return null;
    }
}

/** Returns a 401 response when not logged in, otherwise null. */
export async function requireAdmin(): Promise<NextResponse | null> {
    if (await getSession()) return null;
    return NextResponse.json({ success: false, error: "Not signed in" }, { status: 401 });
}

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(password, salt, 32).toString("hex");
    return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string | undefined): boolean {
    if (!stored) return false;
    if (!stored.startsWith("scrypt$")) {
        // Legacy plaintext password (from the old Neon settings table).
        return password === stored;
    }
    const [, salt, hash] = stored.split("$");
    const test = scryptSync(password, salt, 32);
    const ref = Buffer.from(hash, "hex");
    return ref.length === test.length && timingSafeEqual(ref, test);
}

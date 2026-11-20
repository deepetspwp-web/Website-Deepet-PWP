import "server-only";
import { randomUUID } from "crypto";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Server-side Firebase (Admin SDK). Credentials come from a service account:
// Firebase console → Project settings → Service accounts → Generate new private key.

export function isFirebaseConfigured(): boolean {
    return Boolean(
        process.env.FIREBASE_PROJECT_ID &&
            process.env.FIREBASE_CLIENT_EMAIL &&
            process.env.FIREBASE_PRIVATE_KEY,
    );
}

function storageBucketName(): string {
    return (
        process.env.FIREBASE_STORAGE_BUCKET ||
        `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`
    );
}

let app: App | null = null;
let firestore: Firestore | null = null;

function getApp(): App {
    if (app) return app;
    if (!isFirebaseConfigured()) {
        throw new Error(
            "Firebase is not configured: set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY",
        );
    }
    app =
        getApps()[0] ??
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Env vars store the key with literal "\n" sequences.
                privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            }),
            storageBucket: storageBucketName(),
        });
    return app;
}

export function db(): Firestore {
    if (!firestore) {
        firestore = getFirestore(getApp());
        // The same Firestore instance can be shared by several server bundles;
        // settings() may only be applied once, so ignore "already initialized".
        try {
            firestore.settings({ ignoreUndefinedProperties: true });
        } catch {
            // already configured by another module instance
        }
    }
    return firestore;
}

export function bucket() {
    return getStorage(getApp()).bucket();
}

/**
 * Uploads a file to Firebase Storage and returns a permanent public download
 * URL (Firebase download-token URL, works with locked-down storage rules).
 */
export async function uploadToStorage(
    path: string,
    data: Buffer,
    contentType: string,
): Promise<{ url: string; path: string }> {
    const b = bucket();
    const token = randomUUID();
    await b.file(path).save(data, {
        resumable: false,
        contentType,
        metadata: {
            cacheControl: "public, max-age=31536000, immutable",
            metadata: { firebaseStorageDownloadTokens: token },
        },
    });
    const url = `https://firebasestorage.googleapis.com/v0/b/${b.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
    return { url, path };
}

export async function deleteFromStorage(path: string | undefined | null) {
    if (!path) return;
    try {
        await bucket().file(path).delete({ ignoreNotFound: true });
    } catch (err) {
        console.error("[storage] delete failed", path, err);
    }
}

/** Turns setup problems into a message the admin can act on. */
export function explainError(error: unknown, fallback: string): string {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("Firebase is not configured")) {
        return "Firebase is not connected yet. Add the Firebase keys to .env.local (see .env.example).";
    }
    if (/NOT_FOUND|5 NOT_FOUND/.test(msg)) {
        return "The Firestore database hasn't been created yet (Firebase console → Firestore Database → Create database).";
    }
    if (/bucket does not exist|notFound/i.test(msg)) {
        return "Firebase Storage isn't set up yet (Firebase console → Storage → Get started).";
    }
    return fallback;
}

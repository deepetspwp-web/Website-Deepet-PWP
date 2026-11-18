"use client";

import { useEffect, useSyncExternalStore } from "react";

interface UtmParams {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
}

const EMPTY: UtmParams = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
};

const STORAGE_KEY = "utm_params";
const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", onStorage);
    };
}

let cachedSnapshot: UtmParams = EMPTY;
let cachedSerialized = "";

function getSnapshot(): UtmParams {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY) || "";
        if (raw === cachedSerialized) return cachedSnapshot;
        cachedSerialized = raw;
        if (!raw) {
            cachedSnapshot = EMPTY;
            return cachedSnapshot;
        }
        const parsed = JSON.parse(raw) as Partial<UtmParams>;
        cachedSnapshot = {
            utm_source: parsed.utm_source || "",
            utm_medium: parsed.utm_medium || "",
            utm_campaign: parsed.utm_campaign || "",
        };
        return cachedSnapshot;
    } catch {
        cachedSnapshot = EMPTY;
        cachedSerialized = "";
        return cachedSnapshot;
    }
}

function getServerSnapshot(): UtmParams {
    return EMPTY;
}

export function useUtmParams(): UtmParams {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const source = searchParams.get("utm_source");
        const medium = searchParams.get("utm_medium");
        const campaign = searchParams.get("utm_campaign");
        if (!source && !medium && !campaign) return;

        const utmData: UtmParams = {
            utm_source: source || "",
            utm_medium: medium || "",
            utm_campaign: campaign || "",
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmData));
        notify();
    }, []);

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

import type { ThemePhone } from "./types";

export function digitsOnly(value: string): string {
    return value.replace(/\D/g, "");
}

export function telHref(phone: string): string {
    // digitsOnly() strips the leading "+", so always re-add it to keep the
    // tel: link in valid E.164 form (e.g. tel:+917238002900). Without it the
    // dialer treats the digits as a local number and may fail to call.
    return `tel:+${digitsOnly(phone)}`;
}

export function whatsappHref(phone: string, message?: string): string {
    const digits = digitsOnly(phone);
    const base = `https://wa.me/${digits}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function findPhone(
    phones: ThemePhone[] | undefined,
    name: string,
): ThemePhone | undefined {
    if (!phones) return undefined;
    return phones.find(
        (p) => p.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
}

export function findSocial<
    T extends { platformName: string },
>(socials: T[] | undefined, platform: string): T | undefined {
    if (!socials) return undefined;
    return socials.find(
        (s) =>
            s.platformName.trim().toLowerCase() ===
            platform.trim().toLowerCase(),
    );
}

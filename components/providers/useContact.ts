"use client";

import { useThemeOptions } from "@/components/providers/ThemeOptionsProvider";
import { findPhone, telHref, whatsappHref } from "@/lib/cms/format";

export function useContact() {
    const theme = useThemeOptions();
    const phones = theme?.contact.phones ?? [];
    const callPhone = findPhone(phones, "Phone") ?? phones[0];
    const whatsappPhone = findPhone(phones, "WhatsApp") ?? callPhone;

    return {
        siteTitle: theme?.company.siteTitle || "DeePet Services",
        callDisplay: callPhone?.phone,
        callHref: callPhone ? telHref(callPhone.phone) : undefined,
        whatsappDisplay: whatsappPhone?.phone,
        whatsappHref: whatsappPhone ? whatsappHref(whatsappPhone.phone) : undefined,
        email: theme?.contact.email,
        emailHref: theme?.contact.email ? `mailto:${theme.contact.email}` : undefined,
        address: theme?.contact.address,
        socials: theme?.socialMedia ?? [],
    };
}

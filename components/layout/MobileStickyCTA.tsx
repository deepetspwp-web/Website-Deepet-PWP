"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeOptions } from "@/components/providers/ThemeOptionsProvider";
import { findPhone, telHref, whatsappHref } from "@/lib/wp/format";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function MobileStickyCTA() {
    const theme = useThemeOptions();
    const phones = theme?.contact.phones;
    const callPhone = findPhone(phones, "Phone") ?? phones?.[0];
    const whatsappPhone = findPhone(phones, "WhatsApp") ?? callPhone;

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 safe-area-bottom"
        >
            <div className="grid grid-cols-2 gap-3">
                {callPhone && (
                    <a
                        href={telHref(callPhone.phone)}
                        className="flex items-center justify-center gap-2 bg-[#2894ba] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#207c9d] transition-colors"
                    >
                        <Phone className="w-4 h-4" />
                        Call Now
                    </a>
                )}
                {whatsappPhone && (
                    <a
                        href={whatsappHref(whatsappPhone.phone)}
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#20b858] transition-colors"
                    >
                        <WhatsAppIcon className="w-4 h-4" />
                        WhatsApp
                    </a>
                )}
            </div>
        </motion.div>
    );
}

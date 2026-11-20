"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Mail,
    MapPin,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Youtube,
    Globe,
    type LucideIcon,
} from "lucide-react";
import { useThemeOptions } from "@/components/providers/ThemeOptionsProvider";
import { findPhone, whatsappHref } from "@/lib/cms/format";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
};

function getSocialIcon(platform: string): LucideIcon {
    return SOCIAL_ICONS[platform.trim().toLowerCase()] || Globe;
}

export function Footer() {
    const theme = useThemeOptions();
    const siteTitle = theme?.company.siteTitle || "DeePet Services";
    const logoSrc = theme?.company.logoVar1 || "/deepetservices-logo.png";
    const phones = theme?.contact.phones ?? [];
    const whatsappPhone = findPhone(phones, "WhatsApp") ?? phones[0];
    const email = theme?.contact.email;
    const address = theme?.contact.address;
    const latitude = theme?.contact.latitude;
    const longitude = theme?.contact.longitude;
    const socials = theme?.socialMedia ?? [];

    const mapsSearchHref = (query: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

    const locations = [
        {
            city: "Gurugram",
            address: "Hno. 1295-P, Sector 23A, Daulatpur Nas, Gurugram 122017",
            href: mapsSearchHref("Hno. 1295-P, First floor, Sector 23A, Cartarpuri Alias Daulatpur Nas Gurugram 122017"),
        },
        {
            city: "Delhi",
            address: address || "188/8 Behind New Bloom Nursery, Carterpuri Road, Bijwasan Delhi 110061",
            href: latitude && longitude
                ? mapsSearchHref(`${latitude},${longitude}`)
                : address
                    ? mapsSearchHref(address)
                    : undefined,
        },
    ];

    return (
        <footer className="bg-[#003451] text-white pt-10 pb-24 md:pb-8 relative overflow-hidden border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link href="/" className="inline-block">
                            <div className="relative h-10 w-48">
                                <Image
                                    src={logoSrc}
                                    alt={siteTitle}
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </Link>
                        <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm">
                            Professional veterinary medical care at your doorstep across Delhi NCR. Compassionate doctors, transparent pricing, and zero travel stress.
                        </p>

                        {socials.length > 0 && (
                            <div className="flex items-center gap-2.5 pt-1">
                                {socials.map((social) => {
                                    const Icon = getSocialIcon(social.platformName);
                                    return (
                                        <a
                                            key={social.platformName}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.platformName}
                                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bfe37f] hover:text-[#003451] transition-all"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#bfe37f]">Quick Links</h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Services', href: '/#services' },
                                { label: 'How it Works', href: '/#how-it-works' },
                                { label: 'Reviews', href: '/#reviews' },
                                { label: 'Contact', href: '/contact' }
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="text-white/70 hover:text-[#bfe37f] transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#bfe37f]">Contact & Hours</h4>
                        <div className="space-y-2.5 text-xs sm:text-sm">
                            {whatsappPhone && (
                                <a
                                    href={whatsappHref(whatsappPhone.phone, `Hello ${siteTitle}!`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white/80 hover:text-[#bfe37f] transition-colors"
                                >
                                    <span className="w-6 h-6 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                                        <svg className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.4 17.7 68.9 27 106.5 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.5 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                                    </span>
                                    <span>{whatsappPhone.phone}</span>
                                </a>
                            )}

                            {email && (
                                <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/80 hover:text-[#bfe37f] transition-colors">
                                    <Mail className="w-4 h-4 text-[#bfe37f]" />
                                    <span>{email}</span>
                                </a>
                            )}

                            <div className="flex items-center gap-2 text-white/70">
                                <Clock className="w-4 h-4 text-[#bfe37f] shrink-0" />
                                <span>9:00 AM - 9:00 PM (All 7 Days)</span>
                            </div>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#bfe37f]">Clinic Branches</h4>
                        <div className="space-y-3 text-xs">
                            {locations.map((loc) => (
                                <a
                                    key={loc.city}
                                    href={loc.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-2 group text-white/70 hover:text-white"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-[#bfe37f] shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-white block group-hover:text-[#bfe37f]">{loc.city}</strong>
                                        <p className="line-clamp-2 text-white/60">{loc.address}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
                    <p>&copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms-service" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

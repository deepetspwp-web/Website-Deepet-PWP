"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, ShieldCheck, MessageCircle, ArrowUpRight } from "lucide-react";
import { useThemeOptions } from "@/components/providers/ThemeOptionsProvider";
import { telHref, whatsappHref } from "@/lib/wp/format";

export function ContactDetails() {
    const theme = useThemeOptions();
    const siteTitle = theme?.company.siteTitle || "DeePet Services";
    const phones = theme?.contact.phones ?? [];
    const mainPhone = phones[0]?.phone || "+918800000000";
    const email = theme?.contact.email || "support@deepetservices.com";
    const address = theme?.contact.address || "Hno. 1295-P, Sector 23A, Gurugram 122017";
    const latitude = theme?.contact.latitude || "28.5065";
    const longitude = theme?.contact.longitude || "77.0514";
    const mapEmbedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;

    const LOCATIONS = [
        { city: "Gurugram / Gurgaon", address: "Sector 23A, Daulatpur Nas, Gurugram 122017" },
        { city: "New Delhi & South Delhi", address: "GK-2 & Dwarka Sector 10, New Delhi" },
        { city: "Noida & Ghaziabad", address: "Sector 62 Noida & Indirapuram Ghaziabad" },
    ];

    return (
        <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                        <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                        <span>Direct Communication Channels</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] tracking-tight">
                        Reach Our Veterinary Team
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm">
                        Choose your preferred mode of contact. We provide prompt assistance across Delhi NCR.
                    </p>
                </div>

                {/* 3 Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    {/* Card 1: Phone Support */}
                    <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#bfe37f]/30 text-[#003451] flex items-center justify-center group-hover:bg-[#003451] group-hover:text-white transition-colors shadow-2xs">
                                <Phone className="w-6 h-6" />
                            </div>

                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Fastest Response</span>
                                <h3 className="text-xl font-serif font-bold text-[#003451] mt-0.5">Call Us Directly</h3>
                                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                                    Speak directly with our veterinary dispatcher for immediate appointment scheduling.
                                </p>
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                                {phones.map((p, idx) => (
                                    <a
                                        key={idx}
                                        href={telHref(p.phone)}
                                        className="text-sm font-bold text-[#003451] hover:text-[#2894ba] flex items-center justify-between"
                                    >
                                        <span>{p.phone}</span>
                                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#003451]" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card 2: WhatsApp Chat */}
                    <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shadow-2xs">
                                <MessageCircle className="w-6 h-6" />
                            </div>

                            <div>
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">WhatsApp 24/7</span>
                                <h3 className="text-xl font-serif font-bold text-[#003451] mt-0.5">Chat with Doctor</h3>
                                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                                    Send symptoms, videos, or questions to receive quick advice from a licensed vet.
                                </p>
                            </div>

                            <div className="pt-2 border-t border-slate-200/60">
                                <a
                                    href={whatsappHref(mainPhone)}
                                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                                >
                                    <span>Start WhatsApp Chat</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Email Support */}
                    <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003451] flex items-center justify-center group-hover:bg-[#003451] group-hover:text-white transition-colors shadow-2xs">
                                <Mail className="w-6 h-6" />
                            </div>

                            <div>
                                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">General & Corporate</span>
                                <h3 className="text-xl font-serif font-bold text-[#003451] mt-0.5">Email Support</h3>
                                <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                                    For health record receipts, corporate tie-ups, or feedback.
                                </p>
                            </div>

                            <div className="pt-2 border-t border-slate-200/60">
                                <a
                                    href={`mailto:${email}`}
                                    className="text-xs font-bold text-[#003451] hover:text-[#2894ba] break-all block"
                                >
                                    {email}
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Office & Operating Map Section */}
                <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 text-slate-700 text-xs font-bold uppercase tracking-wider">
                            <MapPin className="w-3.5 h-3.5 text-[#003451]" />
                            <span>Service Hubs</span>
                        </div>

                        <h3 className="text-2xl font-serif font-bold text-[#003451]">
                            Active Across All Delhi NCR
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            Our veterinarians operate mobile veterinary units dispatched strategically from hubs across Gurgaon, South Delhi, Noida, and Ghaziabad for 60–90 min arrival.
                        </p>

                        <div className="space-y-2 pt-2">
                            {LOCATIONS.map((loc, idx) => (
                                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs">
                                    <p className="font-bold text-[#003451]">{loc.city}</p>
                                    <p className="text-slate-500 mt-0.5">{loc.address}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 h-[300px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
                        <iframe
                            src={mapEmbedSrc}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="DeePet Services Clinic Location"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home, Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useContact } from "@/components/providers/useContact";

export function ContactHero() {
    const { callHref, whatsappHref } = useContact();

    return (
        <section className="relative py-14 sm:py-18 bg-[#003451] overflow-hidden text-white">
            {/* Background Ambient Accents */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#bfe37f] rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2894ba] rounded-full blur-[120px] translate-y-1/2" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 z-10 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-6 font-medium">
                    <Link href="/" className="hover:text-[#bfe37f] transition-colors flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" /> Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[#bfe37f]">Contact Us</span>
                </nav>

                <div className="max-w-3xl space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#bfe37f] text-xs font-bold uppercase tracking-wider"
                    >
                        <Clock className="w-3.5 h-3.5" />
                        <span>24/7 Veterinary Assistance in Delhi NCR</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight"
                    >
                        We&apos;re Here for You & <br />
                        <span className="text-[#bfe37f]">Your Beloved Pets</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-sm sm:text-base lg:text-lg text-white/80 font-normal leading-relaxed max-w-2xl"
                    >
                        Whether you need an urgent doorstep vet visit, routine vaccination, or surgical consultation, our licensed doctors and support team are always just a call or message away.
                    </motion.p>

                    {/* Quick Action Buttons */}
                    <div className="pt-2 flex flex-wrap gap-3">
                        <a
                            href={callHref}
                            className="inline-flex items-center gap-2 bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all"
                        >
                            <Phone className="w-4 h-4" /> Call Doctor Now
                        </a>
                        <a
                            href={whatsappHref}
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all"
                        >
                            <MessageCircle className="w-4 h-4 text-[#25D366]" /> Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

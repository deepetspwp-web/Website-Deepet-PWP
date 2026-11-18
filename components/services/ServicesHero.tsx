"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export function ServicesHero() {
    return (
        <section className="relative py-16 bg-[#003451] overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#bfe37f] rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-white/60 text-sm font-bold uppercase tracking-widest mb-12">
                    <Link href="/" className="hover:text-[#bfe37f] transition-colors flex items-center gap-2">
                        <Home className="w-4 h-4" /> Home
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#bfe37f]">Our Services</span>
                </nav>

                <div className="max-w-3xl space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight"
                    >
                        Our <span className="text-[#bfe37f]">Pet Care</span> <br />
                        Services Selection
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/70 leading-relaxed font-medium"
                    >
                        Comprehensive and professional pet care solutions tailored to your pet&apos;s unique needs. From vaccinations to critical surgery, we provide expert hands at your doorstep.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

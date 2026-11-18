"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight, Award, ShieldCheck } from "lucide-react";

export function AboutHero() {
    return (
        <section className="relative min-h-[50vh] flex items-center py-14 sm:py-18 overflow-hidden bg-[#003451]">
            <div className="absolute inset-0 z-0 opacity-30">
                <Image
                    src="/heroimages/about_hero_pets.png"
                    alt="About DeePet Services"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#003451] via-[#003451]/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003451] via-transparent to-transparent" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 z-10 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-6 font-medium">
                    <Link href="/" className="hover:text-[#bfe37f] transition-colors flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" /> Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[#bfe37f]">About Us</span>
                </nav>

                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#bfe37f] text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4" />
                            <span>About DeePet Services</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">
                            Furry Friends <br />
                            <span className="text-[#bfe37f]">Forever Care</span>
                        </h1>

                        <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed font-light">
                            Welcome to our pet care sanctuary, where passion meets expertise. As a comprehensive pet care service, we specialize in veterinary care, vaccinations, boarding, surgery, and online consultations. With a team of dedicated professionals, we prioritize the well-being of your furry friends.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

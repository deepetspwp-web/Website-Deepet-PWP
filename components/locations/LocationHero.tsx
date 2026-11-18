"use client";

import Link from "next/link";
import { ChevronRight, Home, ArrowRight, Dog, Cat } from "lucide-react";
import { motion } from "framer-motion";

interface LocationHeroProps {
    city: string;
    title: string;
    services: string[];
}

export function LocationHero({ city, title, services }: LocationHeroProps) {
    return (
        <section className="relative py-16 bg-[#003451] overflow-hidden min-h-[70vh] flex items-center">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: "url('/heroimages/deepet.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#003451] via-[#003451]/95 to-[#003451]/90" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="w-full lg:w-3/5 space-y-8">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Link href="/" className="hover:text-[#bfe37f] transition-colors flex items-center gap-2">
                                <Home className="w-3 h-3" /> Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/services" className="hover:text-[#bfe37f] transition-colors">Services</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-[#bfe37f]">Noida</span>
                        </nav>

                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[#bfe37f] text-xs font-bold uppercase tracking-widest"
                            >
                                <Dog className="w-4 h-4" /> Trusted Pet Care in {city}
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight"
                            >
                                {title}
                            </motion.h1>
                        </div>

                        {/* Blue Arrow Service Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[3rem] max-w-xl"
                        >
                            <h3 className="text-[#3893c5] font-black uppercase tracking-widest text-xs mb-6 px-2">Popular Services in {city}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {services.map((service, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-[#3893c5]/20 flex items-center justify-center group-hover:bg-[#3893c5] transition-colors">
                                            <ArrowRight className="w-4 h-4 text-[#3893c5] group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-white/80 font-bold text-sm tracking-tight group-hover:text-[#bfe37f] transition-colors">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Abstract Graphic/Shield */}
                    <div className="hidden lg:block w-2/5 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="aspect-square bg-gradient-to-br from-[#bfe37f] to-[#3893c5] rounded-[4rem] relative overflow-hidden flex items-center justify-center rotate-3"
                        >
                            <div className="absolute inset-4 bg-[#003451] rounded-[3.5rem] flex items-center justify-center -rotate-3 overflow-hidden">
                                <Dog className="w-48 h-48 text-white/5 absolute -right-10 -bottom-10" />
                                <Cat className="w-48 h-48 text-white/5 absolute -left-10 -top-10" />
                                <div className="text-center p-12 space-y-4">
                                    <div className="w-20 h-20 bg-[#bfe37f] rounded-3xl mx-auto flex items-center justify-center text-[#003451]">
                                        <Home className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-3xl font-serif font-bold text-white italic">Doorstep Service</h4>
                                    <p className="text-white/40 text-sm font-medium">Safe, stress-free care from the comfort of your home in {city}.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home, CreditCard, ShieldCheck, Sparkles, Check } from "lucide-react";
import Link from "next/link";

export function PricingHero() {
    return (
        <section className="relative py-14 sm:py-18 bg-[#003451] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#bfe37f] rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2894ba] rounded-full blur-[120px] translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-white/60 text-xs sm:text-sm mb-6 font-medium">
                    <Link href="/" className="hover:text-[#bfe37f] transition-colors flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" /> Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[#bfe37f]">Pricing</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#bfe37f] text-xs font-bold uppercase tracking-wider mb-4"
                        >
                            <CreditCard className="w-4 h-4" />
                            <span>100% Transparent Rates • All Travel Included</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight mb-4"
                        >
                            Premium Care, <br />
                            <span className="text-[#bfe37f]">Affordable</span> Rates
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-sm sm:text-base lg:text-lg text-white/80 font-normal max-w-2xl leading-relaxed mb-6"
                        >
                            Explore our comprehensive pricing for veterinary, vaccinations, boarding, and more. No hidden costs, zero surge pricing, just hospital-grade care for your beloved pets.
                        </motion.p>

                        {/* Value Pills */}
                        <div className="flex flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm text-white font-medium">
                            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <Check className="w-3.5 h-3.5 text-[#bfe37f]" /> Consultation from ₹199
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <Check className="w-3.5 h-3.5 text-[#bfe37f]" /> Pay After Visit
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <Check className="w-3.5 h-3.5 text-[#bfe37f]" /> All Delhi NCR
                            </span>
                        </div>
                    </div>

                    {/* Right Price Highlight Card */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 backdrop-blur-md shadow-2xl text-white space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#bfe37f] uppercase tracking-wider">Special Introductory Rate</span>
                                <span className="text-xs bg-[#bfe37f] text-[#003451] px-2.5 py-0.5 rounded-full font-bold">60% OFF</span>
                            </div>

                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-black text-white">₹199</span>
                                    <span className="text-sm text-white/50 line-through">₹499</span>
                                </div>
                                <p className="text-xs text-white/70 mt-1">Complete Home Veterinary Checkup & Vitals</p>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/#book"
                                    className="w-full py-3 px-4 bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] font-bold text-xs sm:text-sm rounded-xl text-center block shadow-md hover:shadow-lg transition-all"
                                >
                                    Book First Visit Now
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

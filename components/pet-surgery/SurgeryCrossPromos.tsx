"use client";

import { motion } from "framer-motion";
import { Syringe, Home } from "lucide-react";
import Link from "next/link";

export function SurgeryCrossPromos() {
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Vaccination Banner */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-[#003451] text-white p-8 md:p-10 group"
                    >
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <span className="inline-block bg-[#bfe37f] text-[#133d39] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Special Offer
                                </span>
                                <h3 className="text-3xl font-serif font-bold italic">Book At-Home Dog Vaccinations</h3>
                                <p className="text-white/80">Grab Special Discount on Dog Vaccination with expert care at your doorstep.</p>
                                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                                    <Link href="/contact" className="bg-[#bfe37f] text-[#133d39] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                        Enquire Now
                                    </Link>
                                    <div className="bg-[#3893c5] text-white px-4 py-2 rounded-xl font-black text-xl">15% OFF</div>
                                </div>
                            </div>
                            <div className="w-40 h-40 relative rounded-[2rem] overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center group-hover:-rotate-6 transition-transform">
                                <Syringe className="w-20 h-20 text-[#bfe37f]" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Vet Visit Banner */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[2.5rem] bg-[#3893c5] text-white p-8 md:p-10 group"
                    >
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <span className="inline-block bg-[#bfe37f] text-[#133d39] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Home Service
                                </span>
                                <h3 className="text-3xl font-serif font-bold italic">Book Vet Doctor Home Visit Delhi</h3>
                                <p className="text-white/80">Your Veterinary Dr. is Just a Call Away. Professional checkups at home.</p>
                                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                                    <Link href="/contact" className="bg-white text-[#3893c5] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                        Contact Us
                                    </Link>
                                    <div className="bg-[#bfe37f] text-[#133d39] px-4 py-2 rounded-xl font-black text-xl">15% OFF</div>
                                </div>
                            </div>
                            <div className="w-40 h-40 relative rounded-[2rem] overflow-hidden flex-shrink-0 bg-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
                                <Home className="w-20 h-20 text-white" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

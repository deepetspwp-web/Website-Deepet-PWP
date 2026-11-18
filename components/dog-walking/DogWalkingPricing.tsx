"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, MapPin, Footprints } from "lucide-react";

export function DogWalkingPricing() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#003451] font-bold">Choose your perfect Plan</h2>
                    <p className="text-gray-500 text-lg">Specialized dog walking plans for your pup</p>
                </div>

                <div className="max-w-md mx-auto relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#bfe37f]/20 to-[#3893c5]/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-[#003451] rounded-[2.5rem] p-10 text-white shadow-2xl border border-white/10"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-[#bfe37f] mb-1">Pet Walking</h3>
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#bfe37f]/20 p-1 rounded-md">
                                        <ShieldCheck className="w-4 h-4 text-[#bfe37f]" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Popular Plan</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-gray-400 line-through text-sm">Rs. 3,999</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-white">Rs. 3,499</span>
                                    <span className="text-sm text-gray-400">/mo</span>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-6 mb-12">
                            {[
                                { text: "Pet Pickup/Drop off Included", icon: MapPin },
                                { text: "Scoop the Poop Service", icon: ShieldCheck },
                                { text: "Paw Cleaning After Walk", icon: Footprints },
                                { text: "30 mins Focused Walking", icon: Clock },
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-4 group/item">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#bfe37f] group-hover/item:bg-[#bfe37f] group-hover/item:text-[#003451] transition-colors">
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-gray-200 font-medium">{item.text}</span>
                                </li>
                            ))}
                        </ul>

                        <button onClick={() => window.location.href = "/contact"} className="w-full py-5 bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] rounded-2xl font-bold transition-all shadow-lg shadow-[#bfe37f]/20 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-sm">
                            Choose Plan
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


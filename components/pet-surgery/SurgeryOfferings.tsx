"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, Heart, Scissors, Thermometer, Bone } from "lucide-react";

export function SurgeryOfferings() {
    const offerings = [
        { title: "Broken Leg Surgery", icon: Bone },
        { title: "Spaying & Neutering", icon: Scissors },
        { title: "Tummer Removal", icon: Activity },
        { title: "Ear Cropping", icon: Heart },
        { title: "Soft Tissue Surgery", icon: Thermometer },
        { title: "Bladder Stone Removal", icon: ShieldCheck }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Surgeries We Offers for Cats & Dogs</h2>
                    <p className="text-gray-500 text-lg">Comprehensive surgical procedures performed with care</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offerings.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-[#f8fafc] border border-gray-100 hover:shadow-xl hover:border-[#bfe37f]/50 transition-all group flex items-center gap-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#003451] group-hover:bg-[#bfe37f] flex items-center justify-center text-white group-hover:text-[#003451] shrink-0 transition-colors">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#003451] group-hover:text-[#3893c5] transition-colors">{item.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

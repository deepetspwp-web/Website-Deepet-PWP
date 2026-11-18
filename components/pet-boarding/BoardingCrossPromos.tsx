"use client";

import { motion } from "framer-motion";
import { Syringe, ShieldPlus, Stethoscope, Home } from "lucide-react";

export function BoardingCrossPromos() {
    const banners = [
        {
            title: "Expert Vaccination Services",
            subtitle: "Protect your pet with our expert vaccination services",
            discount: "12% OFF",
            icon: Syringe,
            color: "bg-[#003451]"
        },
        {
            title: "Diagnostic Testing Services",
            subtitle: "Provide a thorough and accurate assessment",
            discount: "10% OFF",
            icon: ShieldPlus,
            color: "bg-[#3893c5]"
        },
        {
            title: "Vet Checkups",
            subtitle: "Want to keep your pet in tip-top shape? vet checkups are the way to go!",
            discount: "15% OFF",
            icon: Stethoscope,
            color: "bg-[#003451]"
        },
        {
            title: "Vet Doctor Home Visit",
            subtitle: "Professional diagnostic testing services reach out to us in Delhi!",
            discount: "20% OFF",
            icon: Home,
            color: "#3893c5"
        }
    ];

    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {banners.map((banner, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className={`relative overflow-hidden rounded-[3rem] p-10 text-white group ${typeof banner.color === 'string' && banner.color.startsWith('bg-') ? banner.color : ''}`}
                            style={!banner.color.startsWith('bg-') ? { backgroundColor: banner.color } : {}}
                        >
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-2xl font-serif font-bold leading-tight">{banner.title}</h3>
                                    <p className="text-white/80">{banner.subtitle}</p>
                                    <div className="flex items-center gap-4 pt-2">
                                        <button onClick={() => window.location.href = "/contact"} className="bg-white text-[#003451] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                            Enquire Now
                                        </button>
                                        <div className="bg-[#bfe37f] text-[#133d39] px-4 py-2 rounded-xl font-black text-xl">{banner.discount}</div>
                                    </div>
                                </div>
                                <div className="w-32 h-32 bg-white/10 rounded-[2rem] flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform duration-500">
                                    <banner.icon className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

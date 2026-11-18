"use client";

import { motion } from "framer-motion";
import { Syringe, Apple, Activity, Heart, ArrowRight, Dog, Cat, Scissors, Stethoscope, GraduationCap, Footprints, Home, MonitorSmartphone, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    syringe: Syringe,
    apple: Apple,
    activity: Activity,
    heart: Heart,
    dog: Dog,
    cat: Cat,
    scissors: Scissors,
    stethoscope: Stethoscope,
    graduation: GraduationCap,
    footprints: Footprints,
    home: Home,
    monitor: MonitorSmartphone,
    plus: Plus
};

interface Promo {
    title: string;
    oldText: string;
    newText: string;
    discount: string;
    icon: string; // Changed to string
    color: string;
}

interface LocationPromosProps {
    promos: Promo[];
    city: string;
}

export function LocationPromos({ promos, city }: LocationPromosProps) {
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-serif text-[#003451] font-bold">Special Offers for {city} Pet Parents</h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Limited time discounts on premium care</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promos.map((promo, idx) => {
                        const Icon = ICON_MAP[promo.icon.toLowerCase()] || Activity;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative group rounded-[3.5rem] p-10 text-white overflow-hidden shadow-2xl ${promo.color}`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative z-10 space-y-8">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="space-y-4 min-h-[120px]">
                                        <h3 className="text-xl font-serif font-black uppercase text-white/50 tracking-tighter leading-none">{promo.title}</h3>
                                        <p className="text-2xl font-serif font-bold italic leading-tight">{promo.newText}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <button onClick={() => window.location.href = "/contact"} className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                                            Enquire Now <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <div className="flex flex-col items-end">
                                            <span className="text-4xl font-black">{promo.discount}</span>
                                            <span className="text-[10px] font-black uppercase text-white/60">Coupon: DEEPET20</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

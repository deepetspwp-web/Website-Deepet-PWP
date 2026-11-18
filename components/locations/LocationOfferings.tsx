"use client";

import { motion } from "framer-motion";
import {
    Scissors, Stethoscope, GraduationCap, Syringe,
    Footprints, Home, MonitorSmartphone, Heart,
    CheckCircle, Zap, Activity, Plus
} from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
    scissors: Scissors,
    stethoscope: Stethoscope,
    graduation: GraduationCap,
    syringe: Syringe,
    footprints: Footprints,
    home: Home,
    monitor: MonitorSmartphone,
    heart: Heart,
    activity: Activity,
    plus: Plus
};

interface ServiceItem {
    name: string;
    desc: string;
    icon: string; // Changed to string
    href: string;
}

interface LocationOfferingsProps {
    city: string;
    services: ServiceItem[];
}

export function LocationOfferings({ city, services }: LocationOfferingsProps) {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">
                    <div className="lg:w-1/2 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold leading-tight">
                                Our <span className="text-[#bfe37f]">Premium Offerings</span> <br />
                                in {city} Region
                            </h2>
                            <p className="text-gray-500 text-lg font-medium leading-relaxed">
                                Wide range of pet care facilities delivered directly to your doorstep. We ensure your pet&apos;s physical and emotional well-being through expert care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map((service, idx) => {
                                const Icon = ICON_MAP[service.icon.toLowerCase()] || Activity;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-3xl bg-[#f8fafc] border border-gray-100 group hover:border-[#bfe37f] transition-all"
                                    >
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3893c5] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-[#003451] mb-2">{service.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium mb-4 leading-relaxed">{service.desc}</p>
                                        <Link
                                            href={service.href}
                                            className="text-[#3893c5] text-xs font-black uppercase tracking-widest flex items-center gap-1 group/link"
                                        >
                                            Details <Zap className="w-3 h-3 group-hover/link:fill-current transition-all" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="aspect-[3/4] rounded-[3rem] bg-[#003451] p-8 text-white flex flex-col justify-end gap-4"
                            >
                                <div className="w-12 h-12 bg-[#bfe37f] rounded-2xl flex items-center justify-center text-[#003451]">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-serif font-bold">100% Doorstep</h4>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">No travel stress for your pets</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="aspect-[3/4] rounded-[3rem] bg-[#bfe37f] mt-8 p-8 text-[#003451] flex flex-col justify-end gap-4"
                            >
                                <div className="w-12 h-12 bg-[#003451] rounded-2xl flex items-center justify-center text-white">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-[#003451]">Expert Handling</h4>
                                <p className="text-[#003451]/50 text-[10px] font-black uppercase tracking-widest">Certified & Caring Staff</p>
                            </motion.div>
                        </div>
                        {/* Decorative background */}
                        <div className="absolute inset-0 bg-gray-100 rounded-[5rem] -z-10 -rotate-3" />
                    </div>
                </div>

            </div>
        </section>
    );
}

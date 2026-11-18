"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Stethoscope, Syringe,
    Home, MonitorSmartphone, Heart
} from "lucide-react";

const ALL_SERVICES = [
    {
        title: "Veterinary",
        desc: "Expert vet visits for checkups, minor treatments & first-aid.",
        icon: Stethoscope,
        href: "/veterinary-doctor",
        color: "bg-[#3893c5]/10 text-[#003451] border-[#3893c5]/30"
    },
    {
        title: "Pet Surgery",
        desc: "Specialized surgical procedures for dogs & cats in NCR.",
        icon: Heart,
        href: "/pet-surgery",
        color: "bg-red-50 text-red-900 border-red-100"
    },
    {
        title: "Pet Boarding",
        desc: "Comfortable, safe, and hygienic hostel facilities.",
        icon: Home,
        href: "/pet-boarding",
        color: "bg-purple-50 text-purple-900 border-purple-100"
    },
    {
        title: "Online Vet Consultation",
        desc: "24/7 instant guidance from certified vets at just ₹199.",
        icon: MonitorSmartphone,
        href: "/online-vet-consultation",
        color: "bg-[#003451] text-white border-white/10 shadow-xl"
    },
    {
        title: "Pet Vaccinations",
        desc: "Complete immunization via stress-free home visits.",
        icon: Syringe,
        href: "/pet-vaccinations",
        color: "bg-teal-50 text-teal-900 border-teal-100"
    }
];

export function ServicesGrid() {
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ALL_SERVICES.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={service.href}
                                className={`group h-full flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${service.color}`}
                            >
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <service.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-3">{service.title}</h3>
                                <p className="text-sm font-medium opacity-70 leading-relaxed mb-8">{service.desc}</p>
                                <div className="mt-auto flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                                    Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

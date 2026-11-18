"use client";

import { motion } from "framer-motion";
import { Stethoscope, Home, Heart, MonitorSmartphone, Syringe, ArrowRight, Award } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    {
        category: "Specialized Care For Dogs",
        badge: "Canine Care",
        badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
        items: [
            {
                title: "Vet Doctor Home Visit",
                icon: Stethoscope,
                description: "Dr. Deepak Malik and Dr. Diksha Moun make home visits to check on the health of your dog, keeping them happy and healthy.",
                href: "/veterinary-doctor"
            },
            {
                title: "Pet Boarding",
                icon: Home,
                description: "Comfortable and hygienic boarding so your dog feels right at home while you are away.",
                href: "/pet-boarding"
            },
            {
                title: "At-Home Vaccination",
                icon: Syringe,
                description: "Dr. Deepak Malik and Dr. Diksha Moun administer essential dog vaccines safely at your home.",
                href: "/pet-vaccinations"
            },
            {
                title: "Pet Surgery",
                icon: Heart,
                description: "Expert surgical care by Dr. Deepak Malik and Dr. Diksha Moun, ensuring your dog's safety and well-being.",
                href: "/pet-surgery"
            }
        ]
    },
    {
        category: "Specialized Care For Cats",
        badge: "Feline Care",
        badgeColor: "bg-blue-50 text-blue-800 border-blue-200/80",
        items: [
            {
                title: "At-Home Vaccination",
                icon: Syringe,
                description: "Dr. Deepak Malik and Dr. Diksha Moun administer specialized cat vaccines directly at your home.",
                href: "/pet-vaccinations"
            },
            {
                title: "Pet Health Checkup",
                icon: Stethoscope,
                description: "Regular examinations to ensure your feline friend remains in peak health.",
                href: "/veterinary-doctor"
            },
            {
                title: "Pet Surgery",
                icon: Heart,
                description: "Safe, specialized surgical procedures for cats handled by our expert veterinary team.",
                href: "/pet-surgery"
            },
            {
                title: "Online Consultation",
                icon: MonitorSmartphone,
                description: "Direct expert advice from our lead doctors without the stress of travel.",
                href: "/online-vet-consultation"
            }
        ]
    }
];

export function OurExperience() {
    return (
        <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                        <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                        <span>Clinical Expertise</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] tracking-tight">
                        Expert Professional Care
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                        Led by Dr. Deepak Malik and Dr. Diksha Moun, our team provides unmatched expertise in the comfort of your home.
                    </p>
                </div>

                {/* Service Categories without excessive negative space */}
                <div className="space-y-10">
                    {SERVICES.map((group) => (
                        <div key={group.category} className="space-y-5">
                            <div className="flex items-center gap-3">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${group.badgeColor}`}>
                                    <Award className="w-3.5 h-3.5" />
                                    <span>{group.badge}</span>
                                </span>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#003451]">
                                    {group.category}
                                </h3>
                                <div className="hidden sm:block flex-1 h-px bg-slate-200" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                                {group.items.map((service, idx) => {
                                    const Icon = service.icon;
                                    return (
                                        <Link
                                            key={service.title}
                                            href={service.href || "#"}
                                            className="group"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 15 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:bg-white hover:border-[#bfe37f] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                                            >
                                                <div className="space-y-3">
                                                    <div className="w-11 h-11 rounded-xl bg-white text-[#003451] border border-slate-200 shadow-2xs flex items-center justify-center group-hover:bg-[#003451] group-hover:text-[#bfe37f] group-hover:border-[#003451] transition-all duration-300">
                                                        <Icon className="w-5 h-5" />
                                                    </div>

                                                    <h4 className="text-lg font-serif font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors">
                                                        {service.title}
                                                    </h4>

                                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                </div>

                                                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors">
                                                    <span>View details</span>
                                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

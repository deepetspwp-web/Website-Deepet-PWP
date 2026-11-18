"use client";

import Link from "next/link";
import Image from "next/image";
import { Stethoscope, Syringe, Building2, Video, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const SERVICES = [
    {
        title: "Veterinary Consultation",
        highlight: "Home Diagnosis & Vitals",
        description: "Complete physical exam, vitals check, illness diagnosis, and prescription at your home.",
        icon: Stethoscope,
    },
    {
        title: "Doorstep Vaccinations",
        highlight: "100% Cold-Chain Certified",
        description: "Anti-Rabies, DHPPIL 7-in-1, and Tricat vaccines with digital health cards.",
        icon: Syringe,
    },
    {
        title: "Pet Boarding & Surgery",
        highlight: "Hygienic Kennels & Surgeons",
        description: "Safe boarding spaces and sterile surgical procedures by senior veterinary surgeons.",
        icon: Building2,
    },
    {
        title: "Online Vet Consultation",
        highlight: "Video Call in 15 Mins",
        description: "Instant video advice from licensed doctors for quick queries, second opinions, and diet.",
        icon: Video,
    },
    {
        title: "Emergency Medical Care",
        highlight: "Priority Doorstep Dispatch",
        description: "Immediate emergency attention for fever, poisoning, trauma, or sudden illness.",
        icon: AlertCircle,
    },
];

export function Services() {
    return (
        <section id="services" className="py-12 lg:py-16 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 text-[#003451] text-xs font-bold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                        <span>All Pet Services</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] tracking-tight">
                        All Pet Services at Your Doorstep
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm">
                        Comprehensive veterinary medical care, vaccinations, and diagnostics delivered right to your home.
                    </p>
                </div>

                {/* Compact Green Themed Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">

                    {SERVICES.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <motion.article
                                key={service.title}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#bfe37f]/20 via-[#bfe37f]/10 to-emerald-50/40 border border-[#bfe37f]/40 hover:border-[#bfe37f] shadow-xs hover:shadow-lg hover:shadow-[#bfe37f]/20 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                            >
                                {/* Shimmer Shine Effect across card on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                                <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#bfe37f]/30 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    {/* Circular Green Icon Badge matching original */}
                                    <div className="w-12 h-12 rounded-full bg-[#bfe37f]/50 text-[#003451] border border-[#bfe37f]/60 shadow-xs flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#003451] group-hover:text-white transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* Title & Tag */}
                                    <h3 className="text-xl font-serif font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors mb-1">
                                        {service.title}
                                    </h3>
                                    <p className="text-[11px] font-semibold text-emerald-800 mb-2 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                                        {service.highlight}
                                    </p>

                                    {/* Description */}
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Compact CTA Button */}
                                <div className="relative z-10 pt-2 border-t border-[#bfe37f]/30">
                                    <Link
                                        href="/#hero-book"
                                        className="inline-flex items-center gap-1.5 bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] text-xs font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md transition-all duration-200"
                                    >
                                        <span>Book Now</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}

                    {/* Spotlight 6th Card: Solid Green Theme with Shine Effect & Peeking Dog */}
                    <motion.article
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                        className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-[#bfe37f] via-[#b6e271] to-[#a3d858] text-[#003451] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group border border-[#a2d456]"
                    >
                        {/* Shimmering Shine Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/30 rounded-full blur-xl pointer-events-none" />

                        <div className="relative z-10 max-w-[70%] sm:max-w-[75%]">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/70 text-[#003451] text-[10px] font-bold uppercase tracking-wider mb-3 shadow-2xs">
                                <Sparkles className="w-3 h-3 text-emerald-800" />
                                <span>Delhi NCR Priority</span>
                            </span>

                            <h3 className="text-2xl font-serif font-bold text-[#003451] mb-2 leading-snug">
                                Book your Appointment!!
                            </h3>

                            <p className="text-[#003451]/90 text-xs sm:text-sm leading-relaxed mb-4">
                                Schedule a Visit with our expert vets and staff to keep your pet happy and healthy. Starting at just <strong>₹199/-</strong>.
                            </p>
                        </div>

                        {/* Peeking Dog Head at bottom right */}
                        <div className="absolute -bottom-2 -right-1 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none z-10">
                            <Image
                                src="/cardimage/dog.avif"
                                alt="Happy DeePet Dog"
                                fill
                                sizes="(max-width: 640px) 112px, 144px"
                                className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* CTA Button */}
                        <div className="relative z-20 pt-2">
                            <Link
                                href="/#hero-book"
                                className="inline-flex items-center gap-2 bg-[#003451] hover:bg-[#133d39] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-all duration-200"
                            >
                                <span>Schedule a Visit</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#bfe37f]" />
                            </Link>
                        </div>
                    </motion.article>

                </div>
            </div>
        </section>
    );
}

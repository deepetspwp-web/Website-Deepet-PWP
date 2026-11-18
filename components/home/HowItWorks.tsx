"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Home, FileHeart, ArrowRight, CheckCircle2, Clock } from "lucide-react";

const STEPS = [
    {
        id: "01",
        title: "Book in 30 Seconds",
        subtitle: "Instant slot confirmation",
        description: "Pick your preferred date and time online or call us directly. We assign a licensed vet near you.",
        icon: Calendar,
        perk: "Zero prepayment needed"
    },
    {
        id: "02",
        title: "Licensed Vet Arrives Home",
        subtitle: "Fully equipped mobile kit",
        description: "Our doctor visits your home equipped with sterile diagnostic instruments, vitals monitors, and medications.",
        icon: Home,
        perk: "No clinic travel stress"
    },
    {
        id: "03",
        title: "Gentle Care & Digital Rx",
        subtitle: "Comprehensive diagnosis",
        description: "Thorough physical examination, required treatment or vaccination, followed by a digital prescription and diet plan.",
        icon: FileHeart,
        perk: "Free follow-up support"
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-12 lg:py-16 bg-white relative overflow-hidden">
            {/* Background ambient subtle gradient */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12 space-y-2.5">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                        <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                        <span>How It Works</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#003451] leading-[1.2] tracking-tight">
                        Simple and clear steps to care <br className="hidden sm:inline" />
                        for your lovely pet
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                        Experience hassle-free veterinary attention without terrifying car rides or crowded waiting rooms.
                    </p>
                </div>

                {/* Grid with matching height for Image and Text Column */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    {/* Left: Clean Matching Height Image (No Overlays) */}
                    <div className="lg:col-span-5 flex flex-col h-full min-h-[360px] lg:min-h-full">
                        <div className="relative w-full h-full min-h-[360px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden shadow-xl shadow-slate-200/80 border border-slate-100 bg-slate-50 group">
                            <Image
                                src="/heroimages/hiw-booking.png"
                                alt="Pet parent booking doorstep veterinary visit"
                                fill
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* Right: Modern Connected Step Cards + CTA */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-4">
                        <div className="space-y-3.5">
                            {STEPS.map((step, index) => {
                                const IconComponent = step.icon;
                                return (
                                    <motion.article
                                        key={step.id}
                                        initial={false}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: index * 0.08 }}
                                        className="relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300/80 transition-all duration-300 group flex flex-col sm:flex-row gap-4 sm:gap-5 items-start"
                                    >
                                        {/* Step Number + Icon Badge */}
                                        <div className="flex sm:flex-col items-center gap-2.5 shrink-0">
                                            <span className="text-xs font-black tracking-widest text-slate-400 font-mono">
                                                {step.id}
                                            </span>
                                            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/70 text-[#003451] group-hover:bg-[#003451] group-hover:text-white group-hover:border-[#003451] flex items-center justify-center transition-all duration-300 shadow-xs">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                        </div>

                                        {/* Step Details */}
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <h3 className="text-lg font-serif font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors">
                                                    {step.title}
                                                </h3>
                                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    {step.perk}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </div>

                        {/* CTA button matching bottom of column */}
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                            <Link
                                href="/#hero-book"
                                className="inline-flex items-center gap-2 bg-[#003451] hover:bg-[#133d39] text-white px-7 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
                            >
                                <span>Book a Visit Now</span>
                                <ArrowRight className="w-4 h-4 text-[#bfe37f]" />
                            </Link>
                            <span className="text-xs text-slate-500 font-medium">
                                Fast booking • Consultation from ₹199
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

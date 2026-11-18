"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, Stethoscope, Home, Syringe, Cat, Dog, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const PROMOS = [
    {
        title: "Book Online Vet Consultation",
        subtitle: "Online Vet Consultant is Just a Call Away.",
        tag: "ONLINE VET",
        discount: "20% Off",
        icon: MonitorSmartphone,
        color: "bg-[#003451]",
        textColor: "text-white",
        subtitleColor: "text-slate-300",
        badgeStyle: "bg-white/10 text-[#8ec8e8] border-white/10",
        ctaColor: "text-[#bfe37f]",
        watermarkColor: "text-white/[0.03]"
    },
    {
        title: "Book Pet Surgery Services",
        subtitle: "Our Expert Team is Just A Call Away.",
        tag: "PET SURGERY",
        discount: "15% Off",
        icon: Stethoscope,
        color: "bg-[#003451]",
        textColor: "text-white",
        subtitleColor: "text-slate-300",
        badgeStyle: "bg-white/10 text-[#8ec8e8] border-white/10",
        ctaColor: "text-[#bfe37f]",
        watermarkColor: "text-white/[0.03]"
    },
    {
        title: "Book Trusted Pet Boarding Services",
        subtitle: "With Stay, 24/7 Daycare, & Medical Facilities.",
        tag: "PET BOARDING",
        discount: "10% Off",
        icon: Home,
        color: "bg-[#003451]",
        textColor: "text-white",
        subtitleColor: "text-slate-300",
        badgeStyle: "bg-white/10 text-[#8ec8e8] border-white/10",
        ctaColor: "text-[#bfe37f]",
        watermarkColor: "text-white/[0.03]"
    },
    {
        title: "Book At-Home Dog Vaccinations",
        subtitle: "Grab Special Discount on Dog Vaccination.",
        tag: "DOG VACCINE",
        discount: "10% Off",
        icon: Dog,
        color: "bg-[#bfe37f]",
        textColor: "text-[#003451]",
        subtitleColor: "text-[#003451]/75",
        badgeStyle: "bg-[#003451]/10 text-[#003451] border-[#003451]/10",
        ctaColor: "text-[#003451]",
        watermarkColor: "text-[#003451]/[0.035]"
    },
    {
        title: "Book At-Home Cat Vaccinations",
        subtitle: "Grab Special Discount on Cat Vaccination.",
        tag: "CAT VACCINE",
        discount: "11% Off",
        icon: Cat,
        color: "bg-[#003451]",
        textColor: "text-white",
        subtitleColor: "text-slate-300",
        badgeStyle: "bg-white/10 text-[#8ec8e8] border-white/10",
        ctaColor: "text-[#bfe37f]",
        watermarkColor: "text-white/[0.03]"
    },
    {
        title: "Book Vet Doctor Home Visit",
        subtitle: "Your Veterinary Dr. is Just a Call Away.",
        tag: "HOME VISIT",
        discount: "13% Off",
        icon: Syringe,
        color: "bg-[#003451]",
        textColor: "text-white",
        subtitleColor: "text-slate-300",
        badgeStyle: "bg-white/10 text-[#8ec8e8] border-white/10",
        ctaColor: "text-[#bfe37f]",
        watermarkColor: "text-white/[0.03]"
    }
];

export function PricingPromos() {
    return (
        <section className="py-12 lg:py-16 bg-[#f8fafc] border-y border-slate-200/60 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Limited Time Special Offers</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif text-[#003451] font-bold tracking-tight">
                        Limited Time <span className="text-[#2894ba]">Special Offers</span>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm font-medium">
                        Unbeatable discounts for premium pet care across Delhi NCR
                    </p>
                </div>

                {/* Grid: 6 cards in 1 line on desktop, 2 per row (1/2 width) on phone */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
                    {PROMOS.map((promo, idx) => {
                        const Icon = promo.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.04 }}
                                className={`rounded-[2rem] p-4 sm:p-5 flex flex-col justify-between h-full min-h-[290px] sm:min-h-[320px] relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${promo.color} ${promo.textColor} group`}
                            >
                                {/* Background Watermark Icon (Subtly Faded) */}
                                <Icon
                                    className={`absolute -bottom-3 -right-3 w-24 h-24 sm:w-28 sm:h-28 ${promo.watermarkColor} pointer-events-none stroke-[1] transition-transform duration-500 group-hover:scale-105`}
                                />

                                {/* Top Section: Tag Badge + Title + Subtitle */}
                                <div className="relative z-10 space-y-3">
                                    {/* Pill Tag */}
                                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${promo.badgeStyle}`}>
                                        {promo.tag}
                                    </span>

                                    {/* Serif Title */}
                                    <h3 className="text-sm sm:text-base lg:text-base font-serif font-bold leading-tight line-clamp-3">
                                        {promo.title}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className={`text-[11px] sm:text-xs leading-relaxed line-clamp-2 ${promo.subtitleColor}`}>
                                        {promo.subtitle}
                                    </p>
                                </div>

                                {/* Bottom Section: Big Discount + ENQUIRE NOW -> */}
                                <div className="relative z-10 pt-4 mt-auto">
                                    {/* Big % Discount Display */}
                                    <div className="mb-3">
                                        <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none block">
                                            {promo.discount}
                                        </span>
                                    </div>

                                    {/* ENQUIRE NOW Link */}
                                    <Link
                                        href="/contact"
                                        className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider transition-all duration-200 group-hover:gap-2.5 ${promo.ctaColor}`}
                                    >
                                        <span>ENQUIRE NOW</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

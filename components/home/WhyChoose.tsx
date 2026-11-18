"use client";

import { ShieldCheck, UserCheck, Clock, Camera, HeartHandshake, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
    {
        title: "100% Background-Verified Staff",
        description: "Every veterinarian and pet handler undergoes thorough identity and clinical credential verification for your peace of mind.",
        badge: "Police & Credential Verified",
        icon: ShieldCheck
    },
    {
        title: "Trained & Board-Certified Doctors",
        description: "Experienced veterinary professionals with B.V.Sc & M.V.Sc degrees, specializing in internal medicine, dermatology, and surgery.",
        badge: "Verified Vets Only",
        icon: UserCheck
    },
    {
        title: "Same-Day & 24/7 Support",
        description: "Flexible morning, afternoon, and evening slots with prompt response times across Delhi NCR for emergency consultations.",
        badge: "60–90 Min Arrival",
        icon: Clock
    },
    {
        title: "Real-Time Photo & Video Updates",
        description: "Receive instant diagnosis summaries, digital prescriptions, and regular recovery updates directly on WhatsApp.",
        badge: "Digital Health Records",
        icon: Camera
    },
    {
        title: "15,000+ Happy Treatments",
        description: "Trusted by thousands of pet parents who value calm, stress-free medical care right in the comfort of their living rooms.",
        badge: "4.9/5 Rating",
        icon: HeartHandshake
    },
    {
        title: "Full Delhi NCR Coverage",
        description: "Dedicated mobile veterinary teams actively stationed across Delhi, Gurgaon, Noida, Greater Noida, and Faridabad.",
        badge: "All NCR Pincodes",
        icon: MapPin
    }
];

export function WhyChoose() {
    return (
        <section id="why-choose-deepet" className="py-12 lg:py-16 bg-white relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Section Header */}
                <div className="text-center mb-10 space-y-3 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[#003451] text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>The DeePet Difference</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#003451] leading-tight">
                        Why Choose <span className="text-[#2894ba]">DeePet Care?</span>
                    </h2>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                        We combine hospital-grade clinical precision with the warmth and comfort of your home, ensuring your pet stays calm throughout.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {FEATURES.map((feature, idx) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.article
                                key={feature.title}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="group relative p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Icon & Badge Header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 text-[#003451] group-hover:bg-[#003451] group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-xs">
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                            {feature.badge}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-serif font-bold text-[#003451] mb-2.5 group-hover:text-[#2894ba] transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

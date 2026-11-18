"use client";

import { motion } from "framer-motion";
import { Heart, Lightbulb, ShieldCheck, Activity, Users, Compass, Eye, Sparkles } from "lucide-react";

const VALUES = [
    { icon: Heart, title: "Love", text: "We care for every pet.", color: "text-rose-500 bg-rose-50" },
    { icon: Lightbulb, title: "Knowledge", text: "We know how to take care of pets.", color: "text-amber-500 bg-amber-50" },
    { icon: ShieldCheck, title: "Trust", text: "We always do what is best for your pet.", color: "text-emerald-600 bg-emerald-50" },
    { icon: Activity, title: "Health", text: "We help pets feel their best.", color: "text-blue-600 bg-blue-50" },
    { icon: Users, title: "Family", text: "Pets are part of the family.", color: "text-purple-600 bg-purple-50" },
];

export function MissionVisionValues() {
    return (
        <section className="py-12 lg:py-16 bg-slate-50/70 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                        <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                        <span>Purpose & Principles</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] tracking-tight">
                        Our Mission, Vision & Values
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm">
                        Guided by deep empathy and medical excellence to give every pet a happier, healthier life.
                    </p>
                </div>

                {/* Mission & Vision Cards: Hover transitions to Green+Black and Blue+White */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-14">

                    {/* Mission Card: On Hover -> Background Green with Black Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="group relative rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-md hover:shadow-2xl hover:bg-[#bfe37f] hover:border-[#bfe37f] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                        <div className="space-y-5 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 group-hover:bg-black group-hover:text-[#bfe37f] flex items-center justify-center transition-colors shadow-2xs">
                                    <Compass className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-black group-hover:text-white transition-colors">
                                    Our Purpose
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#003451] group-hover:text-black transition-colors">
                                Our Mission
                            </h3>

                            <p className="text-slate-600 group-hover:text-black text-base sm:text-lg leading-relaxed italic transition-colors">
                                &quot;DeePet Services is dedicated to keeping pets all the time nice and healthy. They are offering a number of services, including walking, training, and doctor visits. The team itself is made up of pet lovers who seek to care for them.&quot;
                            </p>
                        </div>

                        <div className="pt-6 border-t border-slate-100 group-hover:border-black/20 flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-black transition-colors relative z-10">
                            <Sparkles className="w-4 h-4 text-emerald-600 group-hover:text-black" />
                            <span>Committed to Pet Well-being Everyday</span>
                        </div>
                    </motion.div>

                    {/* Vision Card: On Hover -> Background Blue with White Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="group relative rounded-3xl p-8 sm:p-10 bg-white border border-slate-200/80 shadow-md hover:shadow-2xl hover:bg-[#003451] hover:border-[#003451] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                        <div className="space-y-5 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003451] group-hover:bg-white group-hover:text-[#003451] flex items-center justify-center transition-colors shadow-2xs">
                                    <Eye className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-white/20 group-hover:text-white transition-colors">
                                    Our Dream
                                </span>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#003451] group-hover:text-white transition-colors">
                                Our Vision
                            </h3>

                            <p className="text-slate-600 group-hover:text-white/90 text-base sm:text-lg leading-relaxed italic transition-colors">
                                &quot;We want to be the best for care for any kind of pet. We want every pet to feel safe, happy, and loved in our presence.&quot;
                            </p>
                        </div>

                        <div className="pt-6 border-t border-slate-100 group-hover:border-white/20 flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-[#bfe37f] transition-colors relative z-10">
                            <Sparkles className="w-4 h-4 text-[#218dcc] group-hover:text-[#bfe37f]" />
                            <span>Building A Safer, Happier Pet World</span>
                        </div>
                    </motion.div>

                </div>

                {/* Values Header */}
                <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#003451]">Our Core Values</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">The 5 uncompromised principles that guide every doorstep visit.</p>
                </div>

                {/* 5 Elevated Values Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                    {VALUES.map((val, idx) => {
                        const Icon = val.icon;
                        return (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-between group"
                            >
                                <div className="space-y-3">
                                    <div className={`w-12 h-12 rounded-2xl ${val.color} flex items-center justify-center mx-auto shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-lg font-serif font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors">
                                        {val.title}
                                    </h4>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        {val.text}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";

interface LocationIntroProps {
    city: string;
    paragraphs: string[];
    highlightText?: string;
    testimonial?: {
        text: string;
        author: string;
    };
}

export function LocationIntro({ city, paragraphs, highlightText, testimonial }: LocationIntroProps) {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-start">

                    {/* Main Content */}
                    <div className="lg:w-3/5 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold leading-tight">
                                Complete <span className="text-[#3893c5]">Pet Care Solutions</span> <br />
                                and Services in {city}
                            </h2>
                            <div className="w-24 h-2 bg-[#bfe37f] rounded-full" />
                        </div>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                            {paragraphs.map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </div>

                        {highlightText && (
                            <div className="bg-[#f8fafc] p-8 rounded-[3rem] border border-gray-100 italic font-bold text-[#003451]/70 leading-relaxed text-xl relative">
                                <div className="absolute top-4 left-4 text-[#bfe37f] opacity-20 text-6xl font-serif">&quot;</div>
                                {highlightText}
                            </div>
                        )}
                    </div>

                    {/* Stats & Trust Card */}
                    <div className="lg:w-2/5 space-y-8 sticky top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-[#003451] text-white p-10 rounded-[3.5rem] shadow-2xl space-y-8 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#bfe37f] rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 group-hover:scale-150 transition-transform duration-700" />

                            <div className="space-y-2">
                                <p className="text-[#bfe37f] font-black uppercase tracking-widest text-xs">Unmatched Expertise</p>
                                <h3 className="text-3xl font-serif font-bold italic underline decoration-[#bfe37f] decoration-4 underline-offset-8">Why Choose Us?</h3>
                            </div>

                            <div className="space-y-6">
                                {[
                                    "10+ Years Professional Experience",
                                    "Verified & Certified Pet Experts",
                                    "Personalized Care for Every Pet",
                                    "Doorstep & Online Convenience"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-[#bfe37f] group-hover:text-[#003451] transition-all">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {testimonial && (
                                <div className="pt-8 border-t border-white/10 space-y-4">
                                    <div className="flex text-[#bfe37f] gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <p className="text-sm font-medium text-white/60 italic leading-relaxed">
                                        &quot;{testimonial.text}&quot;
                                    </p>
                                    <p className="text-[#bfe37f] font-black text-xs uppercase tracking-widest">– {testimonial.author}</p>
                                </div>
                            )}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

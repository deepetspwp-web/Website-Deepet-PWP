"use client";

import { motion } from "framer-motion";
import { Phone, Star, Clock, ShieldCheck, Video } from "lucide-react";
import Link from "next/link";
import { useContact } from "@/components/providers/useContact";

export function ConsultationHero() {
    const { callHref, callDisplay } = useContact();
    return (
        <section className="relative py-20 overflow-hidden bg-[#003451]">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3893c5]/10 rounded-l-[10rem] transform translate-x-1/4 -skew-x-12" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bfe37f]/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="container relative mx-auto px-4 md:px-6 z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left side: Value Proposition */}
                    <div className="flex-1 text-white space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-[#bfe37f]/20 border border-[#bfe37f]/30 px-4 py-2 rounded-full text-[#bfe37f] text-sm font-bold uppercase tracking-widest"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bfe37f] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#bfe37f]"></span>
                            </span>
                            Live Now: 24/7 Support
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-serif leading-[1.05] mb-6">
                                Online Vet <br />
                                Consultation <br />
                                <span className="text-[#bfe37f]">@ ₹199 Only</span>
                            </h1>
                            <p className="text-xl text-white/70 max-w-lg mb-8 leading-relaxed">
                                Talk to Expert Veterinary Doctors Online on Call and Get Trusted Pet Care Advice For Dogs & Cats At ₹199.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#3893c5] rounded-xl flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">11,000+</div>
                                    <div className="text-xs text-white/50 uppercase tracking-widest">Pets Served</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#bfe37f] rounded-xl flex items-center justify-center text-[#003451]">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-lg font-bold">10 Mins</div>
                                    <div className="text-xs text-white/50 uppercase tracking-widest">Avg Response</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side: Modern CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full lg:w-[450px]"
                    >
                        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-[#bfe37f]" />

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-serif text-[#003451] font-bold">Book Consultation</h3>
                                    <p className="text-gray-500 font-medium italic">For any pet health issues get online veterinary consultation.</p>
                                </div>

                                <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-100 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="text-gray-400 line-through text-sm">Rs. 999</div>
                                        <div className="text-3xl font-black text-[#003451]">₹199 / <span className="text-sm font-bold text-gray-500">Visit</span></div>
                                    </div>
                                    <div className="bg-yellow-400 text-[#003451] px-4 py-2 rounded-2xl font-black animate-bounce">80% OFF</div>
                                </div>

                                <div className="space-y-4">
                                    {callHref && (
                                        <Link
                                            href={callHref}
                                            className="flex items-center justify-center gap-4 w-full py-5 bg-[#003451] hover:bg-[#3893c5] text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/10 group/btn"
                                        >
                                            <Phone className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                                            <span>Call Now {callDisplay}</span>
                                        </Link>
                                    )}

                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium py-2">
                                        <Video className="w-4 h-4 text-[#3893c5]" /> Available on Video, Chat or Phone
                                    </div>

                                    <div className="bg-[#bfe37f]/10 p-4 rounded-2xl border border-[#bfe37f]/30">
                                        <p className="text-xs text-[#133d39] font-bold leading-relaxed text-center uppercase tracking-tight">
                                            Upto 80% Pet health problems can be solved by consulting with vet doctor online.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100 italic text-center">
                                    <p className="text-sm text-gray-400">Trusted by over 1,000+ Happy Pet Parents</p>
                                    <div className="flex justify-center gap-1 mt-2">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

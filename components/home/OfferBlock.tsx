"use client";

import Link from "next/link";
import { Check, Sparkles, Tag, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { motion } from "framer-motion";

const OFFERS = [
    { text: "Full Physical Examination & Vitals Check", tag: "Included" },
    { text: "Zero Travel or Doorstep Fee", tag: "₹0 Extra" },
    { text: "Same-Day Priority Slots Available", tag: "Guaranteed" },
    { text: "Extra Discounts on Vaccinations & Meds", tag: "20% OFF" }
];

export function OfferBlock() {
    return (
        <section className="py-10 lg:py-14 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">

                {/* Promotional Voucher Card */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-3xl bg-gradient-to-br from-[#003451] via-[#0d4663] to-[#133d39] text-white p-6 sm:p-9 lg:p-10 shadow-2xl shadow-slate-900/20 border border-[#2894ba]/30 overflow-hidden"
                >
                    {/* Decorative background glows */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#bfe37f]/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2894ba]/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">

                        {/* Top Voucher Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#bfe37f] text-xs font-bold uppercase tracking-wider">
                            <Tag className="w-3.5 h-3.5" />
                            <span>New Customer Exclusive • First Visit</span>
                        </div>

                        {/* Heading & Price Anchor */}
                        <div className="space-y-2">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
                                Professional Home Vet Visit Just <span className="text-[#bfe37f]">₹199/-</span>
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                                Complete physical examination and vitals diagnosis in your pet&apos;s comfortable home environment. No travel stress, no clinic waiting queues.
                            </p>
                        </div>

                        {/* Offer Checklist Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left max-w-2xl mx-auto py-2">
                            {OFFERS.map((offer, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#bfe37f] flex items-center justify-center text-[#003451]">
                                            <Check className="w-3 h-3 stroke-[3px]" />
                                        </div>
                                        <span className="text-xs sm:text-sm font-medium text-white/95">
                                            {offer.text}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#bfe37f] bg-white/10 px-2 py-0.5 rounded-md shrink-0">
                                        {offer.tag}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Action CTA */}
                        <div className="pt-4 space-y-3">
                            <Link
                                href="/#hero-book"
                                className="inline-flex items-center justify-center gap-2 bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] text-base sm:text-lg font-bold px-10 py-4 rounded-xl shadow-xl shadow-black/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                            >
                                <span>Claim First Visit Offer — ₹199</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <p className="text-xs text-white/60 font-medium flex items-center justify-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-[#bfe37f]" />
                                <span>Slots filling fast for today across Delhi, Gurgaon, Noida & Faridabad</span>
                            </p>
                        </div>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}

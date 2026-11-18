"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, PhoneCall, ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FAQS = [
    {
        question: "How much does a home veterinary visit cost?",
        answer: "Our first home consultation is priced at an introductory flat rate of ₹199/- across Delhi NCR. This includes travel, complete physical examination of vitals (heart, lungs, temperature, coat, eyes, ears), and a personalized digital prescription with diet advice. No hidden doorstep fees."
    },
    {
        question: "How fast can a veterinarian arrive at my doorstep?",
        answer: "We offer both scheduled and same-day priority visits. On average, our mobile veterinarians arrive within 60 to 90 minutes of booking confirmation, depending on your locality in Delhi, Gurgaon, Noida, or Faridabad."
    },
    {
        question: "What equipment and medicines does the vet bring along?",
        answer: "Our doctors travel with a sterile medical kit containing diagnostic tools (stethoscope, digital thermometer, otoscope), essential injectable medications (antipyretics, anti-emetics, painkillers, antibiotics), IV sets, wound dressing materials, and certified cold-chain vaccines."
    },
    {
        question: "What if my pet needs surgery, hospitalisation, or advanced diagnostics?",
        answer: "Our visiting veterinarian will stabilize your pet, administer immediate emergency first aid, and seamlessly coordinate admission to our fully-equipped veterinary clinic with safe pet ambulance transport if required."
    },
    {
        question: "Which areas in Delhi NCR do you serve?",
        answer: "We actively serve all sectors and neighbourhoods across New Delhi, South Delhi, West Delhi, Gurgaon (Gurugram), Noida, Greater Noida, and Faridabad."
    },
    {
        question: "How do I pay for the consultation?",
        answer: "No advance payment is needed when booking. You can conveniently pay via UPI, Credit/Debit card, or Cash directly to the veterinarian after the checkup is successfully completed."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-10 lg:py-14 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-[#003451] text-xs font-bold uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Frequently Asked Questions</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] tracking-tight">
                        Got Questions? We&apos;ve Got Answers
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm">
                        Everything you need to know about our in-home veterinary service, timings, and care protocols.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3 mb-10">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-300 ${
                                    isOpen
                                        ? "border-emerald-300 bg-slate-50/50 shadow-sm"
                                        : "border-slate-200/80 bg-white hover:border-slate-300"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex items-center justify-between w-full text-left p-5 sm:p-6 group cursor-pointer"
                                >
                                    <span className={`text-base sm:text-lg font-serif font-bold pr-4 transition-colors ${
                                        isOpen ? "text-[#003451]" : "text-slate-800 group-hover:text-[#2894ba]"
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                        isOpen ? "bg-[#003451] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                                    }`}>
                                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/50">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Assistance Banner */}
                <div className="rounded-3xl bg-gradient-to-br from-[#003451] via-[#0b3e5b] to-[#133d39] text-white p-8 sm:p-10 shadow-xl border border-[#2894ba]/30 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1.5 text-center md:text-left">
                        <span className="text-xs font-bold text-[#bfe37f] uppercase tracking-wider">
                            24/7 Helpline Available
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                            Still have questions or need emergency assistance?
                        </h3>
                        <p className="text-slate-300 text-sm max-w-md">
                            Our team is available round-the-clock to guide you and dispatch a vet to your home.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a
                            href="tel:+918800000000"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
                        >
                            <PhoneCall className="w-4 h-4 text-[#bfe37f]" />
                            <span>Call Doctor</span>
                        </a>
                        <Link
                            href="/#hero-book"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] font-bold text-sm shadow-md transition-all"
                        >
                            <span>Book Consultation</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}

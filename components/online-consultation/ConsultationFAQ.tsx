"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const FAQS = [
    {
        q: "Can a vet diagnose my dog online?",
        a: "Yes, the vets can evaluate symptoms, photos, and videos to help you. They will advise a physical visit to our pet clinic in case of an emergency."
    },
    {
        q: "What are the issues that can be resolved online?",
        a: "Gastrointestinal complications (such as dog vomiting), allergies on the skin, nutritional counseling, anxiety, minor injuries, and after-surgery consultations."
    },
    {
        q: "Are your consultations available around the clock?",
        a: "Yes, DeePet Services provides 24-hour consultations in India."
    },
    {
        q: "What is the cost involved with a consultation?",
        a: "Our consultations start at ₹199. Contact us for more details."
    },
    {
        q: "How often should I take online vet consultation?",
        a: "It depends on pet and their healthcare needs. Every once in a while ask your vet doctor about it based on breed and age."
    }
];

export function ConsultationFAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">FAQs About Virtual Veterinary Help</h2>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                    className="w-full p-8 text-left flex items-center justify-between gap-6 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-bold text-[#003451]">{faq.q}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIdx === idx ? 'bg-[#bfe37f] text-[#133d39]' : 'bg-gray-100 text-gray-400'}`}>
                                        {openIdx === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                    </div>
                                </button>
                                {openIdx === idx && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        className="px-8 pb-8 text-gray-500 leading-relaxed"
                                    >
                                        {faq.a}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

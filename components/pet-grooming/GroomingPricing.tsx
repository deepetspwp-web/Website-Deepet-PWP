"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const DOG_PRICING = [
    {
        title: "Full Grooming",
        price: "1999",
        original: "2,499",
        features: ["Bathing", "Trimming & Haircut", "Conditioning", "Deshedding", "Nail Clipping", "Dental Cleaning", "Paw/Ear/Eye Cleaning", "Hairstyling", "Sanitary Cleaning", "Body/Paw Massage", "Perfume Application"]
    },
    {
        title: "Mini Grooming",
        price: "1,559",
        original: "1,799",
        features: ["Bathing or Trimming or Haircut", "Dry bath (option available)", "Paw Cleaning", "Dental Cleaning", "Nail Clipping", "Combing/Brushing", "Hairstyling", "Perfume Application", "Conditioning"]
    },
    {
        title: "Dog Bathing",
        price: "999",
        original: "1,299",
        features: ["Shampooing", "Dry bath option available", "Nail Clipping", "Brushing/Combing", "Blow Dry", "Application of perfume"]
    },
    {
        title: "Dog Trimming",
        price: "999",
        original: "1,299",
        features: ["Trimming", "Haircut", "Brushing/Combing", "Nail Clipping", "Application of perfume"]
    },
    {
        title: "Dog Medicated Bath",
        price: "999",
        original: "1,299",
        features: [
            "Bath for Fungal infection",
            "Bath for Mange",
            "Bath for Allergies",
            "Bath for Dandruff",
            "Bath for Bacterial infection"
        ]
    }
];

const CAT_PRICING = [
    {
        title: "Full Grooming",
        price: "1,799",
        original: "2,499",
        features: ["Bathing (dry option available)", "Brushing", "Haircut or Trim (breed specific)", "Scrubbing", "Coat Conditioning", "Blow dry", "Ear Cleaning", "Fanny/Paw Hair Trim", "Tail Hair Shaping", "Body Massage"]
    },
    {
        title: "Mini Grooming",
        price: "1,399",
        original: "1,499",
        features: ["Bathing or Trimming or Haircut", "Brushing", "Blow Dry", "Ear Cleaning", "Paw Hair Trim", "Tail Hair Shaping"]
    },
    {
        title: "Cat Bathing",
        price: "999",
        original: "1,299",
        features: ["Shampooing", "Dry bath option available", "Nail Clipping", "Brushing/Combing", "Blow Dry", "Application of perfume"]
    },
    {
        title: "Cat Medicated Bath",
        price: "999",
        original: "1,299",
        features: ["Bath for Fungal infection", "Bath for Mange", "Bath for Allergies", "Bath for Dandruff", "Bath for Bacterial infection"]
    }
];

export function GroomingPricing() {
    const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Dog & Cat Grooming Charges</h2>
                    <p className="text-gray-500 text-lg">Transparent pricing for premium at-home care</p>

                    {/* Tab Switcher */}
                    <div className="flex bg-[#f8fafc] p-1 rounded-2xl w-fit mx-auto mt-8 border border-gray-100 shadow-inner">
                        <button
                            onClick={() => setActiveTab('dog')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'dog' ? 'bg-[#003451] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Dog Plans
                        </button>
                        <button
                            onClick={() => setActiveTab('cat')}
                            className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'cat' ? 'bg-[#003451] text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            Cat Plans
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeTab === 'dog' ? DOG_PRICING : CAT_PRICING).map((plan, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative rounded-3xl p-8 border ${idx === 0 ? 'bg-[#003451] text-white border-transparent shadow-2xl scale-105 z-10' : 'bg-white text-[#003451] border-gray-100 hover:border-[#bfe37f]/50'}`}
                        >
                            {idx === 0 && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#bfe37f] text-[#133d39] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Best Value
                                </div>
                            )}

                            <h3 className={`text-xl font-bold mb-4 ${idx === 0 ? 'text-[#bfe37f]' : 'text-[#3893c5]'}`}>
                                {plan.title}
                            </h3>

                            <div className="mb-8">
                                <span className={`line-through text-sm ${idx === 0 ? 'text-gray-400' : 'text-gray-400'}`}>Rs. {plan.original}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">Rs. {plan.price}</span>
                                    <span className="text-xs font-medium uppercase tracking-wider opacity-60">/Session</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.slice(0, 8).map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-sm">
                                        <div className={`p-0.5 rounded-full ${idx === 0 ? 'bg-[#bfe37f]/20 text-[#bfe37f]' : 'bg-[#bfe37f]/20 text-[#133d39]'}`}>
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className={idx === 0 ? 'text-gray-300' : 'text-gray-500'}>{feature}</span>
                                    </li>
                                ))}
                                {plan.features.length > 8 && (
                                    <li className={`text-xs font-bold italic opacity-60 pt-2 ${idx === 0 ? 'text-[#bfe37f]' : 'text-[#3893c5]'}`}>
                                        + {plan.features.length - 8} more specialized services
                                    </li>
                                )}
                            </ul>

                            <a href="/#book" className={`w-full py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest flex items-center justify-center ${idx === 0 ? 'bg-[#bfe37f] text-[#133d39] hover:bg-[#a9d663]' : 'bg-[#f0f9ff] text-[#3893c5] hover:bg-[#3893c5] hover:text-white'}`}>
                                Book Now
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Check, Zap } from "lucide-react";

const PACKAGES = {
    dog: [
        {
            name: "Puppy Vaccination Package",
            oldPrice: "7,999",
            price: "5,999",
            features: [
                "35th day: Puppy DP",
                "50th day: DHPPIL",
                "60th day: Canine Corona",
                "71th day: DHPPIL (booster)",
                "90th day: Canine Corona (booster)",
                "90th day: Anti Rabies",
                "120th day: Anti Rabies booster",
                "120th day: Kennel Cough",
                "Comprehensive Deworming"
            ],
            color: "bg-[#003451]",
            popular: true
        },
        {
            name: "Adult Dog Vaccination Package",
            oldPrice: "4,499",
            price: "3,499",
            features: [
                "Anti Rabies",
                "DHPPIL",
                "Canine Corona",
                "Kennel Cough",
                "Regular Deworming"
            ],
            color: "bg-[#3893c5]",
            popular: false
        }
    ],
    cat: [
        {
            name: "Kitten Vaccination Package",
            oldPrice: "4,999",
            price: "3,999",
            features: [
                "60th day: Tricat",
                "90th day: Tricat booster",
                "95th day: Anti Rabies",
                "125th day: Anti Rabies booster",
                "Regular Deworming"
            ],
            color: "bg-[#003451]",
            popular: true
        },
        {
            name: "Adult Cat Vaccination Package",
            oldPrice: "1,999",
            price: "1,799",
            features: [
                "Tricat",
                "Anti Rabies",
                "Regular Deworming"
            ],
            color: "bg-[#3893c5]",
            popular: false
        }
    ]
};

const INDIVIDUAL_SERVICES = {
    dog: [
        { name: "Rapid Kit Test for Parvo", price: "1,199" },
        { name: "Rapid Kit Test for Distemper", price: "1,999" },
        { name: "Puppy DP", price: "1,199" },
        { name: "Anti Rabies", price: "799" },
        { name: "DHPPIL (10 in 1)", price: "1,199" },
        { name: "Kennel Cough", price: "1,499" },
        { name: "Canine Corona", price: "1,199" },
        { name: "Consultation", price: "799" },
        { name: "Deworming - Puppy/Adult", price: "299 / 499" },
        { name: "Tricat", price: "1,199" }
    ],
    cat: [
        { name: "Rapid Kit Test for Parvo", price: "1,199" },
        { name: "Rapid Kit Test for Distemper", price: "1,999" },
        { name: "Puppy DP", price: "1,199" },
        { name: "Anti Rabies", price: "799" },
        { name: "DHPPIL (10 in 1)", price: "1,199" },
        { name: "Kennel Cough", price: "1,499" },
        { name: "Canine Corona", price: "1,199" },
        { name: "Consultation", price: "799" },
        { name: "Deworming - Kitten/Adult", price: "299 / 499" },
        { name: "Tricat", price: "1,199" }
    ]
};

export function VaccinationPricing() {
    const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');

    return (
        <section className="py-24 bg-white overflow-hidden" id="pricing">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold underline decoration-[#bfe37f] decoration-8 underline-offset-8 decoration-skip-ink">Choose Your Perfect Plan</h2>
                    <p className="text-gray-500 text-lg">Comprehensive protection packages for every life stage</p>

                    {/* Tab Switcher */}
                    <div className="flex justify-center pt-8">
                        <div className="inline-flex p-1 bg-[#f8fafc] rounded-2xl border border-gray-100">
                            <button
                                onClick={() => setActiveTab('dog')}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'dog' ? 'bg-[#003451] text-white shadow-lg' : 'text-gray-400 hover:text-[#003451]'}`}
                            >
                                For Dogs 🐾
                            </button>
                            <button
                                onClick={() => setActiveTab('cat')}
                                className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'cat' ? 'bg-[#3893c5] text-white shadow-lg' : 'text-gray-400 hover:text-[#3893c5]'}`}
                            >
                                For Cats 🐱
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        {PACKAGES[activeTab].map((pkg, idx) => (
                            <motion.div
                                key={`${activeTab}-${idx}`}
                                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`relative rounded-[3rem] p-8 md:p-12 ${pkg.color} text-white shadow-2xl overflow-hidden group`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-8 right-8 bg-[#bfe37f] text-[#133d39] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">
                                        Best Value
                                    </div>
                                )}
                                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-serif font-bold">{pkg.name}</h3>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-gray-300 line-through text-lg">Rs. {pkg.oldPrice}</span>
                                            <div className="text-5xl font-black">₹{pkg.price}<span className="text-sm font-bold text-white/50 lowercase ml-2">per session</span></div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-white/10" />

                                    <div className="space-y-4">
                                        <p className="text-sm font-bold uppercase tracking-widest text-[#bfe37f]">What&apos;s Included:</p>
                                        <div className="grid grid-cols-1 gap-4">
                                            {pkg.features.map((feature, fIdx) => (
                                                <div key={fIdx} className="flex items-start gap-3">
                                                    <div className="p-1 bg-[#bfe37f]/20 rounded-full shrink-0">
                                                        <Check className="w-4 h-4 text-[#bfe37f]" />
                                                    </div>
                                                    <span className="text-sm font-medium leading-relaxed">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button onClick={() => window.location.href = "/contact"} className="w-full py-5 bg-white text-[#003451] rounded-2xl font-black uppercase tracking-widest hover:bg-[#bfe37f] transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl">
                                        Book This Package
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Individual Services Section */}
                <div className="mt-24 max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#003451]">Individual Vaccination & Test Prices</h3>
                        <p className="text-gray-500 mt-2 text-lg">Professional care for specific needs</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="contents"
                            >
                                {INDIVIDUAL_SERVICES[activeTab].map((service, sIdx) => (
                                    <motion.div
                                        key={`${activeTab}-service-${sIdx}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: sIdx * 0.05 }}
                                        className="flex justify-between items-center p-6 bg-[#f8fafc] rounded-[2rem] border border-gray-100 hover:border-[#bfe37f] hover:bg-white hover:shadow-xl transition-all group"
                                    >
                                        <div className="space-y-1">
                                            <span className="font-bold text-[#003451] text-lg group-hover:text-[#3893c5] transition-colors block leading-tight">
                                                {service.name}
                                            </span>
                                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Standard Care</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-gray-400 block leading-none mb-1 font-black uppercase tracking-tighter">Starts at</span>
                                            <div className="flex items-baseline gap-0.5">
                                                <span className="text-xl font-black text-[#003451]">₹{service.price}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-16 bg-[#f8fafc] max-w-4xl mx-auto p-6 rounded-3xl border border-gray-100 flex items-center justify-center gap-4 text-center">
                    <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                        Free doorstep visit included in all packages within Delhi NCR
                    </p>
                </div>
            </div>
        </section>
    );
}

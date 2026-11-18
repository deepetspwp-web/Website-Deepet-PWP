"use client";

import { motion } from "framer-motion";
import { Info, ShieldCheck } from "lucide-react";
import { useState } from "react";

const DOG_VET_PLANS = [
    {
        title: "Dog Veterinary Services",
        price: "799",
        desc: "General veterinary check-up and diagnostics",
        features: ["Rapid Kit Test for Parvo", "Distemper", "Puppy DP", "Anti Rabies", "DHPPIL (10 in 1)", "Kennel Cough", "Canine Corona", "Consultation", "Deworming", "Tricat"]
    },
    {
        title: "Puppy Vaccination Package",
        price: "6,499",
        desc: "Complete vaccination set from 35th to 120th day",
        features: ["35th day Puppy DP", "50th day DHPPIL", "60th day Canine Corona", "71th day DHPPIL (booster)", "90th day Canine Corona (booster)", "90th day Anti Rabies", "120th day Anti Rabies (booster)", "120th day Kennel Cough", "Deworming"]
    },
    {
        title: "Adult Vaccination Package",
        price: "3,499",
        desc: "Essential annual vaccinations for adult dogs",
        features: ["Anti Rabies", "DHPPIL", "Canine Corona", "Kennel Cough", "Deworming"]
    },
    {
        title: "Single Vaccine: Anti Rabies",
        price: "799",
        desc: "Anti-Rabies Vaccination for Puppies & Adult Dogs",
        features: ["Anti Rabies Vaccine", "Professional Admin", "Certification"]
    },
    {
        title: "Single Vaccine: Canine Corona",
        price: "1,199",
        desc: "Canine Corona Shots for Dogs",
        features: ["Canine Corona Vaccine", "Professional Admin", "Certification"]
    }
];

const CAT_VET_PLANS = [
    {
        title: "Anti-Rabies Single Dose",
        price: "799",
        desc: "Anti-Rabies Shots For Cats",
        features: ["Anti Rabies Vaccine", "Professional Admin", "Certification"]
    },
    {
        title: "Kitten Vaccination Package",
        price: "3,999",
        desc: "Shield for your kittens from 60th to 125th day",
        features: ["60th day Tricat", "90th day Tricat (booster)", "95th day Anti Rabies", "125th day Anti Rabies (booster)", "Deworming"]
    },
    {
        title: "Cat Vaccination Package",
        price: "1,799",
        desc: "Essential annual package for adult cats",
        features: ["Tricat", "Anti Rabies", "Deworming shots"]
    }
];

export function VetPricing() {
    const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Our At-home {activeTab === 'dog' ? 'Dog' : 'Cat'} Vaccination Price</h2>
                    <p className="text-gray-500 text-lg">Choose your perfect Plan for your beloved {activeTab === 'dog' ? 'dog' : 'cat'}</p>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(activeTab === 'dog' ? DOG_VET_PLANS : CAT_VET_PLANS).map((plan, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative rounded-3xl p-8 border hover:shadow-2xl transition-all h-full flex flex-col ${idx === 1 && activeTab === 'dog' ? 'bg-[#003451] text-white border-transparent scale-105 z-10' : 'bg-white text-[#003451] border-gray-100'}`}
                        >
                            {(idx === 1 && activeTab === 'dog') && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#bfe37f] text-[#133d39] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                                    Best Choice
                                </div>
                            )}

                            <div className="mb-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#bfe37f] mb-2 block">Pet Services</span>
                                <h3 className={`text-2xl font-bold mb-2 ${idx === 1 && activeTab === 'dog' ? 'text-white' : 'text-[#003451]'}`}>
                                    {plan.title}
                                </h3>
                                <p className={`text-sm ${idx === 1 && activeTab === 'dog' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {plan.desc}
                                </p>
                            </div>

                            <div className="mb-8 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className={`text-xs font-medium uppercase tracking-wider opacity-60 ${idx === 1 && activeTab === 'dog' ? 'text-gray-300' : ''}`}>Price Starts at</span>
                                    <span className={`text-2xl font-bold ${idx === 1 && activeTab === 'dog' ? 'text-[#bfe37f]' : 'text-[#003451]'}`}>₹{plan.price}</span>
                                </div>
                                <ShieldCheck className={`w-8 h-8 ${idx === 1 && activeTab === 'dog' ? 'text-[#bfe37f]' : 'text-[#003451]/20'}`} />
                            </div>

                            <div className="flex-grow space-y-4 mb-8">
                                <h4 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${idx === 1 && activeTab === 'dog' ? 'text-gray-300' : 'text-[#bfe37f]'}`}>
                                    <Info className="w-3.5 h-3.5" />
                                    What it Includes:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {plan.features.map((feature, fIdx) => (
                                        <div key={fIdx} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${idx === 1 && activeTab === 'dog' ? 'bg-white/10 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <a href="/#book" className={`w-full py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest shadow-lg flex items-center justify-center ${idx === 1 && activeTab === 'dog' ? 'bg-[#bfe37f] text-[#133d39] hover:bg-[#a9d663] shadow-green-500/10' : 'bg-[#003451] text-white hover:bg-[#00263b] shadow-blue-500/10'}`}>
                                Book Now
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

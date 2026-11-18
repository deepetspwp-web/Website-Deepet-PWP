"use client";

import { motion } from "framer-motion";
import { Dog, Cat, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const PET_DETAILS = {
    dogs: [
        "Regular walks and playtime to keep the dog physically active",
        "Engaging activities to stimulate mental health",
        "Providing a balanced and nutritious diet tailored to the dog's needs",
        "Special dietary considerations for specific health conditions",
        "Regular check-ups and vaccinations"
    ],
    cats: [
        "Providing a balanced and nutritious diet",
        "Special dietary considerations for health conditions",
        "Providing a clean and comfortable area for elimination",
        "Engaging playtime to stimulate physical and mental health",
        "Brushing to prevent matting and reduce shedding"
    ]
};

export function PetCareDetails() {
    const [activeTab, setActiveTab] = useState<'dogs' | 'cats'>('dogs');

    return (
        <section className="py-12 lg:py-16 bg-[#003451] text-white relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#bfe37f]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2894ba]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#bfe37f] text-xs font-bold uppercase tracking-wider">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Tailored Care by Species</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
                        Care for Every Furry Friend
                    </h2>

                    <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                        Dogs and cats have unique physical, emotional, and dietary needs. We create customized protocols designed for your pet&apos;s specific species and lifestyle.
                    </p>

                    {/* Dog / Cat Tab Switcher */}
                    <div className="pt-2 flex justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('dogs')}
                            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer ${
                                activeTab === 'dogs'
                                    ? 'bg-[#bfe37f] text-[#003451] scale-105 shadow-[#bfe37f]/20'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                            }`}
                        >
                            <Dog className="w-4 h-4" />
                            <span>Dogs Care</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('cats')}
                            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer ${
                                activeTab === 'cats'
                                    ? 'bg-[#bfe37f] text-[#003451] scale-105 shadow-[#bfe37f]/20'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                            }`}
                        >
                            <Cat className="w-4 h-4" />
                            <span>Cats Care</span>
                        </button>
                    </div>
                </div>

                {/* Content Card with matching height */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/15 p-6 sm:p-8 lg:p-10 rounded-3xl backdrop-blur-md shadow-2xl max-w-5xl mx-auto"
                >
                    {/* Points Column */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-[#bfe37f] uppercase tracking-wider">
                                {activeTab === 'dogs' ? 'Canine Wellness Protocol' : 'Feline Wellness Protocol'}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white capitalize">
                                {activeTab} Care Specialists
                            </h3>
                        </div>

                        <div className="space-y-3 pt-2">
                            {PET_DETAILS[activeTab].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#bfe37f]/40 transition-all duration-200"
                                >
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#bfe37f]/20 text-[#bfe37f] flex items-center justify-center mt-0.5">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 group">
                            <Image
                                src={activeTab === 'dogs' ? "/dogimage/dog1.jpg" : "/catimage/cat1.jpg"}
                                alt={activeTab === 'dogs' ? 'Happy dog receiving care' : 'Happy cat receiving care'}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/20 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-[#bfe37f]" />
                                    <span className="text-xs font-bold text-white">
                                        {activeTab === 'dogs' ? 'Canine Certified Vets' : 'Feline Friendly Doctors'}
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-[#bfe37f] uppercase tracking-wider">
                                    Doorstep
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Stethoscope } from "lucide-react";

export function ServicesDetails() {
    const vetIncludes = [
        "Routine Check-ups", "Blood Tests", "Health Screening",
        "Minor Treatments", "First-Aid Care", "Diet Consultation",
        "Vaccination Advice"
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Veterinary Home Visit Showcase (Lead Service) */}
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-flex items-center gap-2 bg-[#bfe37f]/20 text-[#003451] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                            <Stethoscope className="w-4 h-4" /> Feature Presentation
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#003451] font-bold leading-tight">
                            Professional <span className="text-[#3893c5]">Vet Care</span> <br />
                            Services at Your Doorstep
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Book the best veterinary doctors from DeePet at your home and avoid the travel stress of your furry friend. Our licensed vets are always ready to provide at-home checkups and treatments for your cats and dogs at affordable charges.
                            </p>
                            <p>
                                Now, you can keep your pet healthy and happy with the help of our experienced doctors. Our comprehensive list of services ensures your pet gets the expert care they deserve.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {vetIncludes.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-[#f8fafc] p-4 rounded-xl border border-gray-100">
                                    <div className="w-6 h-6 bg-[#bfe37f] rounded-full flex items-center justify-center text-[#003451]">
                                        <Check className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-bold text-[#003451] whitespace-nowrap">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-[#003451] text-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#bfe37f] rounded-full -translate-y-1/2 translate-x-1/2 opacity-20 group-hover:scale-150 transition-transform duration-700" />
                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-[#bfe37f] font-black uppercase tracking-[0.2em] text-xs">Home Consultation Offer</p>
                                    <h3 className="text-4xl font-serif font-bold">Starting from ₹499</h3>
                                    <p className="text-white/50 text-sm italic">* All travel included - No hidden charges!</p>
                                </div>
                                <div className="w-px h-16 bg-white/10 hidden md:block" />
                                <button className="bg-[#bfe37f] text-[#003451] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">
                                    Book a Vet Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="aspect-[4/5] bg-gray-100 rounded-[4rem] relative overflow-hidden"
                        >
                            <Image
                                src="/dogimage/dog2.jpg"
                                alt="Stress-Free Vet Care"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-[#003451]/20 group-hover:bg-[#003451]/10 transition-colors" />
                            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-[#003451] via-transparent to-transparent text-white">
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-[#bfe37f] rounded-2xl flex items-center justify-center text-[#003451]">
                                        <Check className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-3xl font-serif font-bold">Stress-Free <br /> Vet Care</h4>
                                    <p className="text-white/60">No travel anxiety. Same comfort as home.</p>
                                </div>
                            </div>
                        </motion.div>
                        {/* Decorative floating elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#3893c5] rounded-3xl -z-10 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#bfe37f] rounded-full -z-10 blur-2xl opacity-50" />
                    </div>
                </div>

            </div>
        </section>
    );
}

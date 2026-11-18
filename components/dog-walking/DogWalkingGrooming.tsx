"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useContact } from "@/components/providers/useContact";

export function DogWalkingGrooming() {
    const { callHref } = useContact();
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-[#3893c5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                    {/* Background patterns */}
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
                        <div className="absolute bottom-10 left-10 w-96 h-96 border-8 border-white rounded-full opacity-50" />
                    </div>

                    <div className="flex flex-col lg:flex-row items-center relative z-10">
                        <div className="w-full lg:w-1/2 p-10 lg:p-20 space-y-8 text-white">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-[#bfe37f] text-sm font-bold uppercase tracking-widest">Cross Promotion</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                                Pet Grooming Services <br />
                                <span className="text-[#bfe37f]">Starting from ₹999</span>
                            </h2>

                            <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                                Hire the best pet grooming services from DeePet at your home and avoid the travel stress of your furry friend. Our trained groomers are always ready to provide at-home grooming for your cats and dogs at affordable charges.
                            </p>

                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Full Grooming", "Mini Grooming", "Nail Cutting",
                                    "Ear Clipping", "Paw Massage", "Hair Trimming"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <div className="bg-[#bfe37f] rounded-full p-1">
                                            <Check className="w-3 h-3 text-[#133d39]" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a href={callHref} className="inline-block bg-[#bfe37f] text-[#133d39] px-10 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-black/20 hover:scale-105 active:scale-95 text-lg">
                                    Enquire Now (15% Off)
                                </a>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px]">
                            <Image
                                src="/heroimages/deepet.webp"
                                alt="Pet Grooming"
                                fill
                                className="object-cover lg:rounded-l-[4rem]"
                            />
                            {/* Overlay tag */}
                            <div className="absolute top-10 right-10 bg-[#bfe37f] text-[#133d39] px-6 py-3 rounded-2xl font-bold shadow-xl rotate-12 animate-pulse">
                                25% OFF
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

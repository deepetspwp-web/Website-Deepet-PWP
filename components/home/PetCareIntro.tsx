"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PetCareIntro() {
    return (
        <section className="py-12 lg:py-16 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

                {/* Top Section: Matching Image 7 Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 lg:mb-14">

                    {/* Left Content Column */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
                        <div className="space-y-3.5">
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                                <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                                <span>Veterinary Services</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#003451] leading-[1.2] tracking-tight">
                                Expert Veterinary Care at <br className="hidden sm:inline" />
                                Your Doorstep
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                                Provide your pets with the best medical care without the stress of travel. Our licensed veterinarians come to your home for comprehensive checkups, vaccinations, diagnostics, and treatments. Ensure your furry friend&apos;s health with professional care that&apos;s convenient for you and comfortable for them. Book a home visit today.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/#hero-book"
                                className="inline-flex items-center gap-2 bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] px-7 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                            >
                                <span>Schedule a Visit</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Image: Clean, high-res rounded photo card matching Image 7 */}
                    <div className="lg:col-span-6 flex flex-col">
                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/70 border border-slate-100 bg-slate-50 group">
                            <Image
                                src="/heroimages/hero-vet-exam.png"
                                alt="Expert Veterinary Care at Your Doorstep"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>
                </div>

                {/* Horizontal Stats Row: Perfectly aligned 2-col on phone, 4-col on desktop */}
                <div className="pt-8 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 sm:gap-6 text-center items-center">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#218dcc] tracking-tight">15000+</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 text-center">Home Visits</p>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:border-l lg:border-slate-200/80">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#218dcc] tracking-tight">12500+</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 text-center">Successful Treatments</p>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:border-l lg:border-slate-200/80">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#218dcc] tracking-tight">1000+</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 text-center">Successful Surgeries</p>
                    </div>
                    <div className="flex flex-col items-center justify-center lg:border-l lg:border-slate-200/80">
                        <p className="text-3xl md:text-4xl font-extrabold text-[#218dcc] tracking-tight">50+</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 text-center">Expert Vets</p>
                    </div>
                </div>

            </div>
        </section>
    );
}

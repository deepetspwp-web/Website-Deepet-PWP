"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const ADVANTAGES = [
    "Less stress for pets",
    "Personalized attention",
    "No travel or waiting",
    "Comfortable home environment",
    "Flexible scheduling",
    "Photo/video updates"
];

export function WhyHomeVisit() {
    return (
        <section id="why-home-visit" className="py-12 lg:py-16 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                    {/* Left: Clean Matching Height Image (3 Easter Bunny Dogs) */}
                    <div className="lg:col-span-6 flex flex-col h-full min-h-[300px] lg:min-h-full">
                        <div className="relative w-full h-full min-h-[300px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto rounded-3xl overflow-hidden shadow-xl shadow-slate-200/70 border border-slate-100 bg-slate-50 group">
                            <Image
                                src="/heroimages/image.avif"
                                alt="Happy dogs enjoying home pet care"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* Right: Why Choose Home Pet Care Details */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6 py-2">

                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                                <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                                <span>The In-Home Advantage</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#003451] leading-[1.2] tracking-tight">
                                Why Pet Parents Prefer <br className="hidden sm:inline" />
                                <span className="text-[#95c93d]">In-Home Vet Visits</span>
                            </h2>

                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                We are fully committed to your pet&apos;s well-being, bringing professional care right to your doorstep.
                            </p>
                        </div>

                        {/* 6 Clean Checklist Points */}
                        <div className="space-y-3.5 my-2">
                            {ADVANTAGES.map((text, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="flex-shrink-0 text-[#218dcc]">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-sm sm:text-base">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-2">
                            <Link
                                href="/#hero-book"
                                className="inline-flex items-center gap-2 bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                            >
                                <span>Schedule a Visit</span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

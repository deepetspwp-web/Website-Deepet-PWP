"use client";

import { motion } from "framer-motion";
import { Check, Stethoscope, Home, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PriceItem {
    name: string;
    price: string;
    unit?: string;
    popular?: boolean;
}

const VETERINARY_ITEMS: PriceItem[] = [
    { name: "Vet Consultation", price: "₹199", popular: true },
    { name: "Vet Doctor Home Visit", price: "₹799" },
    { name: "Anti Rabies Vaccine", price: "₹799" },
    { name: "DHPPIL (10 in 1)", price: "₹1199" },
    { name: "Puppy DP Vaccine", price: "₹1199" },
    { name: "Tricat Cat Vaccine", price: "₹1199" },
    { name: "Canine Corona Vaccine", price: "₹1199" },
    { name: "Kennel Cough Vaccine", price: "₹1499" },
    { name: "Rapid Kit Test for Parvo", price: "₹1199" },
    { name: "Rapid Kit Test for Distemper", price: "₹1199" },
    { name: "Deworming - Puppy/Adult", price: "₹299/499" },
];

const BOARDING_ITEMS: PriceItem[] = [
    { name: "Pet Boarding", price: "₹300 - ₹3000", unit: "per day", popular: true },
];

const PACKAGES = [
    {
        name: "Puppy Vaccination",
        price: "₹7,499",
        subtitle: "Complete protection for growing pups",
        features: [
            "50th day DHPPIL",
            "60th day Canine Corona",
            "71th day DHPPIL (booster)",
            "90th day Canine Corona (booster)",
            "90th day Anti Rabies",
            "120th day Anti Rabies (booster)",
            "Deworming"
        ],
        popular: false,
        theme: "bg-white text-[#003451] border-slate-200",
        btnTheme: "bg-[#003451] text-white hover:bg-[#133d39]"
    },
    {
        name: "Adult Dog Vaccination",
        price: "₹3,499",
        subtitle: "Annual booster & essential immunization",
        features: [
            "Anti Rabies",
            "DHPPIL (7-in-1 / 10-in-1)",
            "Canine Corona",
            "Kennel Cough",
            "Deworming"
        ],
        popular: true,
        theme: "bg-gradient-to-br from-[#003451] via-[#094161] to-[#133d39] text-white border-[#2894ba]/40",
        btnTheme: "bg-[#bfe37f] text-[#003451] hover:bg-[#aee063]"
    },
    {
        name: "Kitten Vaccination",
        price: "₹4,799",
        subtitle: "Comprehensive feline protection schedule",
        features: [
            "60th day Tricat",
            "90th day Tricat (booster)",
            "95th day Anti Rabies",
            "125th day Anti Rabies (booster)",
            "Deworming"
        ],
        popular: false,
        theme: "bg-white text-[#003451] border-slate-200",
        btnTheme: "bg-[#003451] text-white hover:bg-[#133d39]"
    }
];

export function PricingCatalog() {
    return (
        <section className="py-12 lg:py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">

                {/* Exclusive Packages Section */}
                <div className="mb-14 lg:mb-16">
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>All-Inclusive Value</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif text-[#003451] font-bold tracking-tight">
                            Exclusive Care Packages
                        </h2>

                        <p className="text-slate-600 text-xs sm:text-sm">
                            Complete scheduled healthcare packages for every life stage with 100% cold-chain vaccines.
                        </p>
                    </div>

                    {/* 3 Package Cards with ALL CTAs ANCHORED DOWN AT THE BOTTOM */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
                        {PACKAGES.map((pkg, idx) => (
                            <motion.div
                                key={pkg.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-3xl p-6 sm:p-8 border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group ${pkg.theme}`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-4 right-4 bg-[#bfe37f] text-[#003451] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                                        Most Popular
                                    </div>
                                )}

                                {/* Card Header & Features */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-serif font-bold mb-1">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-xs opacity-75 font-medium leading-relaxed">
                                            {pkg.subtitle}
                                        </p>

                                        <div className="flex items-baseline gap-2 mt-4 pt-3 border-t border-current/10">
                                            <span className="text-3xl sm:text-4xl font-black tracking-tight">{pkg.price}</span>
                                            <span className="text-[11px] font-bold uppercase opacity-70">/ Full Package</span>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <ul className="space-y-2.5">
                                        {pkg.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex gap-2.5 items-start text-xs sm:text-sm font-medium leading-snug">
                                                <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                    pkg.popular ? 'bg-[#bfe37f] text-[#003451]' : 'bg-emerald-100 text-emerald-800'
                                                }`}>
                                                    <Check className="w-2.5 h-2.5 stroke-[3px]" />
                                                </div>
                                                <span className="opacity-90">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA Anchored Down at the very bottom */}
                                <div className="mt-8 pt-5 border-t border-current/15">
                                    <Link
                                        href="/#book"
                                        className={`w-full py-3 px-5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] ${pkg.btnTheme}`}
                                    >
                                        <span>Book Package</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Individual Pricing Tables: Veterinary & Boarding */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto pt-6 border-t border-slate-100">

                    {/* Veterinary Price List (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center">
                                <Stethoscope className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-serif text-[#003451] font-bold">
                                    Veterinary & Diagnostic Services
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">Standard at-home rates across Delhi NCR</p>
                            </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
                            <div className="divide-y divide-slate-200/70">
                                {VETERINARY_ITEMS.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-3 group hover:bg-white px-2.5 rounded-lg transition-colors">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs sm:text-sm text-slate-700 font-semibold group-hover:text-[#003451]">
                                                {item.name}
                                            </span>
                                            {item.popular && (
                                                <span className="text-[10px] font-bold bg-[#bfe37f] text-[#003451] px-2 py-0.5 rounded-full">
                                                    Special
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-sm sm:text-base font-extrabold text-[#003451] tracking-tight">
                                            {item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Boarding Section & Assurance (5 cols) */}
                    <div className="lg:col-span-5 space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-[#003451] rounded-xl flex items-center justify-center">
                                <Home className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-serif text-[#003451] font-bold">
                                    Pet Boarding
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">Safe home & kennel daycare</p>
                            </div>
                        </div>

                        <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
                            <div className="divide-y divide-slate-200/70">
                                {BOARDING_ITEMS.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-3">
                                        <div>
                                            <span className="text-xs sm:text-sm text-slate-800 font-bold block">{item.name}</span>
                                            {item.unit && <span className="text-[11px] text-slate-400 font-semibold uppercase">{item.unit}</span>}
                                        </div>
                                        <span className="text-base sm:text-lg font-black text-[#003451]">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Assurance Card */}
                        <div className="bg-gradient-to-br from-[#003451] to-[#0c4463] rounded-2xl p-6 sm:p-7 text-white relative overflow-hidden shadow-xl border border-white/10 space-y-3">
                            <Shield className="absolute bottom-2 right-2 w-28 h-28 text-white/5 pointer-events-none" />
                            <div className="relative z-10 space-y-2.5">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#bfe37f]">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>24/7 Monitored Facility</span>
                                </span>
                                <h4 className="text-xl font-serif font-bold text-white">Safe & Hygienic Boarding</h4>
                                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                                    Clean kennels, individual feeding plans, veterinary checkups on arrival, and real-time WhatsApp updates throughout your pet&apos;s stay.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href="/pet-boarding"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#bfe37f] hover:underline"
                                    >
                                        <span>Explore Boarding Facilities</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

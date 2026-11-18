"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, Award, CalendarCheck, ShieldCheck } from "lucide-react";

interface Doctor {
    name: string;
    designation: string;
    image: string;
}

const DOCTORS: Doctor[] = [
    {
        name: "Dr. Deepak Malik",
        designation: "Senior Veterinary Surgeon & Consultant",
        image: "/drimages/DR1.jpeg",
    },
    {
        name: "Dr. Diksha Moun",
        designation: "Veterinary Physician & Home Care Specialist",
        image: "/drimages/DR2.jpeg",
    },
    {
        name: "Dr. Pooja Tarar",
        designation: "Consultant Veterinary Doctor & Diagnostics",
        image: "/drimages/DR3.jpeg",
    }
];

export function DoctorsSection() {
    return (
        <section id="our-doctors" className="py-12 lg:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
            {/* Ambient decorative blobs */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#bfe37f]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6 z-10 max-w-7xl">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Verified Veterinary Experts</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#003451] tracking-tight">
                        Meet Our Certified Doctors
                    </h2>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                        Hospital-grade medical care delivered right to your doorstep by licensed, compassionate veterinary specialists.
                    </p>
                </div>

                {/* Doctor Cards Grid - Clean: Photo, Name, Designation, Booking CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {DOCTORS.map((doc, idx) => (
                        <motion.article
                            key={doc.name}
                            initial={false}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-md shadow-slate-200/60 border border-slate-100 hover:shadow-xl hover:border-emerald-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                        >
                            {/* Doctor Photo */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-slate-100">
                                <Image
                                    src={doc.image}
                                    alt={`${doc.name} - ${doc.designation}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Name & Designation */}
                            <div className="flex-1 flex flex-col justify-start mb-6 space-y-2">
                                <h3 className="text-2xl font-serif font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors">
                                    {doc.name}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-[#133d39] tracking-wide bg-[#bfe37f]/25 px-3 py-1.5 rounded-lg w-fit">
                                    {doc.designation}
                                </p>
                            </div>

                            {/* Booking CTA */}
                            <Link
                                href="/#hero-book"
                                className="w-full py-3.5 px-5 bg-[#003451] hover:bg-[#133d39] text-white rounded-xl font-bold text-sm text-center shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                            >
                                <Stethoscope className="w-4 h-4 text-[#bfe37f]" />
                                <span>Book Consultation</span>
                            </Link>
                        </motion.article>
                    ))}
                </div>

            </div>
        </section>
    );
}

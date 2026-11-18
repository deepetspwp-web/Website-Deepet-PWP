"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, ShieldCheck } from "lucide-react";

const DOCTORS = [
    {
        name: "Dr. Deepak Malik",
        qual: "B. V. Sc & A.H ( General Medicine )",
        exp: "13 years of experience",
        image: "/drimages/DR1.jpeg",
        cta: "Connect With Vet Now",
        color: "bg-[#003451]"
    },
    {
        name: "Dr. Diksha Moun",
        qual: "BVSc & AH",
        exp: "5 year of experience",
        image: "/drimages/DR2.jpeg",
        cta: "Get Best Consultation",
        color: "bg-[#3893c5]"
    },
    {
        name: "Dr. Pooja Tarar",
        qual: "B.V. Sc & H.V, M.V. Sc",
        exp: "",
        image: "/drimages/DR3.jpeg",
        cta: "Talk to Best Vet Dr.",
        color: "bg-[#003451]"
    }
];

export function ConsultationDoctors() {
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 bg-[#bfe37f]/20 text-[#133d39] rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                        Our Experts
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Online Doctors For Consultation</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Connect with our team of certified veterinarians serving for over 20+ years.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {DOCTORS.map((doc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group"
                        >
                            <div className="relative w-full aspect-square mb-8 rounded-[2rem] overflow-hidden bg-gray-100">
                                {doc.image ? (
                                    <Image
                                        src={doc.image}
                                        alt={doc.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                        <User className="w-24 h-24" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl border border-gray-100 italic font-bold text-xs text-[#003451]">
                                    DeePet Services
                                </div>
                                <div className="absolute bottom-4 left-4 bg-[#bfe37f] text-[#133d39] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Vetted
                                </div>
                            </div>

                            <div className="space-y-4 flex-1 flex flex-col">
                                <h3 className="text-2xl font-serif text-[#003451] font-bold underline decoration-[#bfe37f] decoration-4 underline-offset-4">{doc.name}</h3>
                                <div className="space-y-1">
                                    <p className="text-gray-500 font-medium leading-relaxed">{doc.qual}</p>
                                    {doc.exp && (
                                        <p className="text-[#3893c5] font-bold text-sm uppercase tracking-wide">{doc.exp}</p>
                                    )}
                                </div>

                                <div className="pt-4 mt-auto">
                                    <button className={`w-full py-4 ${doc.color} text-white rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg`}>
                                        {doc.cta}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

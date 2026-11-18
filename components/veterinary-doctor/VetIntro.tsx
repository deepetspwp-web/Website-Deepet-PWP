"use client";

import { motion } from "framer-motion";
import { Check, ClipboardList, HelpingHand, UserCheck } from "lucide-react";

export function VetIntro() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Description & Services */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Easily schedule convenient at-home vet visits for your beloved cats and dogs! Our caring pet doctor will come right to your doorstep, ensuring your furry friends receive top-notch veterinary care in the comfort of your home. For any kinds of veterinary help contact us.
                            </p>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold text-[#003451] mb-4 flex items-center gap-2">
                                    <ClipboardList className="w-5 h-5 text-[#bfe37f]" />
                                    Our services include:
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        "Home Diagnostics", "Health Checkup", "Consultation",
                                        "Skin Issue", "Blood Test", "Wound Treatment",
                                        "Surgical Treatment", "Dental Care",
                                        "Vaccination for Dog & puppy", "Cat & Kitten Vaccination"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                            <div className="w-1.5 h-1.5 bg-[#bfe37f] rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-[#003451] mb-6 flex items-center gap-2">
                                <HelpingHand className="w-6 h-6 text-[#bfe37f]" />
                                Why Choose Us
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { title: "Expert vets come to your home", desc: "Professional veterinary services at your doorstep." },
                                    { title: "Reduced stress of travel", desc: "Avoid the hassle and anxiety of taking your pet to a clinic." },
                                    { title: "Affordable pet treatment", desc: "Packages tailored for different health issues." },
                                    { title: "Online Vet Consultation", desc: "Available at ₹199 only for quick advice." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                        <div className="bg-[#bfe37f]/10 p-2 rounded-lg h-fit">
                                            <Check className="w-4 h-4 text-[#133d39]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#003451]">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Suitable For & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-[#003451] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <UserCheck className="w-6 h-6 text-[#bfe37f]" />
                                Suitable For Pet Parents Who:
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    "Find it difficult to visit the vet clinic",
                                    "Want to avoid the stress that pets experience at clinics",
                                    "Require consistent veterinary care but lack time for clinic visits"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <div className="mt-1.5 p-1 bg-[#bfe37f] rounded-full">
                                            <Check className="w-3 h-3 text-[#133d39]" />
                                        </div>
                                        <span className="text-gray-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-[#003451] mb-6">Table of Contents</h3>
                            <ul className="space-y-2">
                                {[
                                    "DeePet Veterinarian doctor near me",
                                    "Who is a veterinary doctor?",
                                    "What does a veterinary doctor do?",
                                    "What diseases a veterinarian doctor treat?",
                                    "DeePet vaccination services",
                                    "DeePet Health Checkup services",
                                    "How to book an appointment for your pet?",
                                    "Why choose DeePet veterinary doctor home visit?",
                                    "FAQ's About Vet Doctor Home Visit",
                                    "Our At-home Dog Vaccination Price",
                                    "Choose your perfect Plan"
                                ].map((item, idx) => (
                                    <li key={idx} className="text-gray-500 hover:text-[#bfe37f] transition-colors cursor-pointer flex items-center gap-2 group">
                                        <span className="text-xs text-gray-300 font-mono">0{idx + 1}</span>
                                        <span className="border-b border-transparent group-hover:border-[#bfe37f]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

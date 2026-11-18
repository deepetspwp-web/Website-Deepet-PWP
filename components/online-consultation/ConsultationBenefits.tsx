"use client";

import { motion } from "framer-motion";
import { Home, ShieldCheck, Clock, Heart, CheckCircle2, Zap, MonitorSmartphone } from "lucide-react";

export function ConsultationBenefits() {
    const whyChoose = [
        { label: "Homes Served", value: "11k+ Vet Visits Done", icon: Home },
        { label: "Experience", value: "Trusted for 22+ Years", icon: ShieldCheck },
        { label: "Support", value: "24*7 Support", icon: Clock },
        { label: "Happy Clients", value: "95% Happy Clients", icon: Heart },
        { label: "Doctors", value: "Verified & Certified", icon: CheckCircle2 },
        { label: "Affordable", value: "Vetcare starting ₹199", icon: Zap }
    ];

    const benefits = [
        {
            title: "Virus-Free Environment",
            desc: "Avoid exposure to viruses and bacteria common in clinics. Stay in your comfort zone."
        },
        {
            title: "Cost Effective",
            desc: "Virtual fees are significantly lower than physical vet visits. Save on travel and consultation."
        },
        {
            title: "Pet Comfort",
            desc: "Pets cooperate better for diagnosis in their own familiar home environment."
        },
        {
            title: "Instant Guidance",
            desc: "What to do if your dog vomits? Get instant answers through video calls."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Why Choose Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24">
                    {whyChoose.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-3xl bg-[#f8fafc] border border-gray-100 flex flex-col items-center text-center gap-3 group hover:bg-[#003451] transition-all duration-500"
                        >
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3893c5] shadow-sm group-hover:bg-[#bfe37f] group-hover:text-[#003451] transition-colors">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-tighter group-hover:text-white/50">{stat.label}</div>
                                <div className="text-sm font-bold text-[#003451] group-hover:text-white whitespace-pre-line">{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-serif text-[#003451] font-bold leading-tight">
                                Benefits of Veterinary <br />
                                <span className="text-[#3893c5]">Doctor Online Consultation</span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                It&apos;s the online world now and you don&apos;t necessarily need to take your pet out of your house for the check-up purpose.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="p-6 rounded-2xl bg-[#f8fafc] border-l-4 border-[#bfe37f] space-y-2"
                                >
                                    <h3 className="font-bold text-[#003451]">{benefit.title}</h3>
                                    <p className="text-sm text-gray-500">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, borderRadius: "2rem" }}
                            whileInView={{ opacity: 1, borderRadius: "4rem" }}
                            className="aspect-[4/5] bg-[#003451] relative overflow-hidden flex items-center justify-center"
                        >
                            <MonitorSmartphone className="w-48 h-48 text-[#bfe37f]/20 absolute" />
                            <div className="z-10 text-center text-white p-12 space-y-6">
                                <h3 className="text-4xl font-serif font-bold italic">Safe & Discrete</h3>
                                <p className="text-white/60 text-lg">Your consultations are private and recorded for your future reference.</p>
                                <div className="flex justify-center gap-4">
                                    <div className="px-6 py-2 bg-white/10 rounded-full text-xs font-bold">Encrypted</div>
                                    <div className="px-6 py-2 bg-white/10 rounded-full text-xs font-bold">Secure</div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Floating elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#bfe37f] rounded-3xl -z-10" />
                    </div>
                </div>

            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, PiggyBank, Clock, Zap, Microscope, Cpu } from "lucide-react";

export function VaccinationDetails() {
    const benefits = [
        {
            title: "Disease Prevention",
            desc: "Vaccinations act as a shield, stimulating the immune system to combat sickness and reducing the risk of infection.",
            icon: ShieldCheck
        },
        {
            title: "Cost Effective Healthcare",
            desc: "Preventing illness through timely vaccination is far more effective and affordable than treating serious ailments later.",
            icon: PiggyBank
        },
        {
            title: "Community Safety",
            desc: "Vaccinations contribute to the overall health of the pet community in parks, grooming centers, and boarding facilities.",
            icon: HeartPulse
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Benefits Section */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Benefits of Doorstep Pet Vaccination</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">At DeePet, we promise your canine companion&apos;s health comes first.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-10 rounded-[3rem] bg-[#f8fafc] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group"
                        >
                            <div className="w-16 h-16 bg-[#003451] group-hover:bg-[#bfe37f] rounded-2xl flex items-center justify-center text-white group-hover:text-[#003451] mb-8 transition-colors">
                                <benefit.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-4">{benefit.title}</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Info Grid (Timing & Why Choose) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                    {/* Timing */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#003451] text-white p-12 rounded-[3.5rem] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <Clock className="w-10 h-10 text-[#bfe37f]" />
                                <h3 className="text-3xl font-serif font-bold">Time for Each Vaccination</h3>
                            </div>
                            <div className="space-y-4 text-white/70 leading-relaxed">
                                <p>For puppies, the first vaccination should be between <span className="text-[#bfe37f] font-bold">6-8 weeks</span>, followed by boosters every two weeks.</p>
                                <p>Adult dogs and cats need annual boosters to maintain their immunity levels. Our team will help you design the perfect schedule.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Why Choose */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-12 bg-[#bfe37f]/10 rounded-[3.5rem] border-2 border-[#bfe37f]/30 space-y-8"
                    >
                        <div className="flex items-center gap-4 text-[#003451]">
                            <Microscope className="w-10 h-10" />
                            <h3 className="text-3xl font-serif font-bold">Why Choose DeePet?</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                "No.1 Veterinary Services Provider in Delhi NCR",
                                "Verified & Certified Vet Doctors with Background Checks",
                                "Easily Accessible Clinic & Online Consultations",
                                "24/7 Support for all Pet Health Concerns"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <Zap className="w-4 h-4 text-[#003451] fill-[#bfe37f]" />
                                    <span className="text-[#003451] font-bold text-sm tracking-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Microchipping Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-r from-[#3893c5] to-[#218dcc] rounded-[4rem] p-10 md:p-16 text-white overflow-hidden shadow-2xl group"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center shrink-0">
                            <Cpu className="w-12 h-12 text-[#bfe37f]" />
                        </div>
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h3 className="text-3xl md:text-5xl font-serif font-bold italic">A Lifesaver: Microchipping Your Pet</h3>
                            <p className="text-white/80 text-lg max-w-xl">A simple, permanent way to ensure your pet can always find their way back home. Safe, painless, and highly effective.</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                                <button onClick={() => window.location.href = "/contact"} className="bg-[#bfe37f] text-[#003451] px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                                    Enquire Now
                                </button>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black">10%</span>
                                    <span className="text-xl font-bold uppercase text-[#bfe37f]">Off Today</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

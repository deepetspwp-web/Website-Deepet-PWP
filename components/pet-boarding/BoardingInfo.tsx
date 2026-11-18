"use client";

import { motion } from "framer-motion";
import { Stethoscope, ShieldPlus, HeartPulse } from "lucide-react";

export function BoardingInfo() {
    const infoItems = [
        {
            title: "Comprehensive Wellness Exams",
            description: "Regular check-ups are crucial to your pet's well-being. Our comprehensive wellness exams cover everything from nose to tail, ensuring we catch any potential issues early.",
            icon: Stethoscope
        },
        {
            title: "Vaccinations and Preventative Care",
            description: "Our clinic offers a range of vaccinations to protect your pets from common diseases. We'll work with you to create a personalized preventative care plan.",
            icon: ShieldPlus
        },
        {
            title: "Compassionate Surgery and Dentistry",
            description: "When surgical or dental interventions are necessary, our skilled veterinarians perform procedures with utmost care and precision. Your pet's comfort and safety are priorities.",
            icon: HeartPulse
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {infoItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 rounded-[2.5rem] bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#003451] group-hover:bg-[#bfe37f] flex items-center justify-center text-white group-hover:text-[#003451] mb-6 transition-colors">
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#003451] mb-4">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

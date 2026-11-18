"use client";

import { motion } from "framer-motion";
import { UserCheck, Calendar, Clock, Smartphone } from "lucide-react";

const STEPS = [
    {
        title: "Choose the expert",
        description: "First step involves you to choose the dog walking expert who will accompany your dog for the walk.",
        icon: UserCheck
    },
    {
        title: "Select date and time",
        description: "Choose the time and date according to your preference from our available slots.",
        icon: Calendar
    },
    {
        title: "Select walk details",
        description: "Choose walking time from 25 to 60 minutes. All walks are GPS tracked for your peace of mind.",
        icon: Clock
    },
    {
        title: "Stay connected",
        description: "Receive real-time updates with photos, videos, and GPS tracking during the walk.",
        icon: Smartphone
    }
];

export function DogWalkingSteps() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#3893c5] font-bold">How to book dog walker near me?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        With expert team, your dog will get necessary exercises and excitement which will ensure their health and happiness. Here&apos;s how simply you can book a walking session at DeePet.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative flex flex-col items-center text-center space-y-4 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#bfe37f]/20 flex items-center justify-center text-[#133d39] mb-4 group-hover:scale-110 transition-transform">
                                <step.icon className="w-8 h-8" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#bfe37f] text-[#133d39] font-bold flex items-center justify-center text-sm border-2 border-white">
                                    {idx + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#003451]">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

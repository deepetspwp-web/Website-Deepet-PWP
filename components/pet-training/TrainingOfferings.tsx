"use client";

import { motion } from "framer-motion";
import { Dog, Users, Shield, Footprints } from "lucide-react";

const OFFERINGS = [
    {
        title: "Behaviour training",
        description: "Focuses on barking, aggression, and howling. We use humble ways to teach your dog to manage emotions.",
        icon: Dog
    },
    {
        title: "Social Training",
        description: "Helps your dog behave well around other animals or humans, ensuring they stay calm and comfortable in new situations.",
        icon: Users
    },
    {
        title: "Obedience training",
        description: "Teaches crucial daily commands like Sit, Come, Stay, and how to interact with strangers and family members.",
        icon: Shield
    },
    {
        title: "Potty training",
        description: "A professional approach to help your puppy learn to answer nature's call properly, usually within a 6-month span.",
        icon: Footprints
    }
];

export function TrainingOfferings() {
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Type of Dog Training Services we Offers?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        We have helped over 1000+ happy pet parents with specialized behavior and obedience training programs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {OFFERINGS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#bfe37f]/30 transition-all group h-full flex flex-col"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#003451] group-hover:bg-[#bfe37f] flex items-center justify-center text-white group-hover:text-[#003451] mb-6 transition-colors">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-[#003451] mb-3">{item.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm flex-grow">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

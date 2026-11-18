"use client";

import { motion } from "framer-motion";
import { Clock, Camera, UserCheck, Smartphone, Target, Star } from "lucide-react";

const WHY_POINTS = [
    { title: "Timely session for your pet", icon: Clock },
    { title: "Update with photos, videos, GPS etc", icon: Camera },
    { title: "Expert team to take care of your pet", icon: UserCheck },
    { title: "Easy booking", icon: Smartphone },
    { title: "Easily accessible services", icon: Target },
    { title: "Best Dog Walking Services", icon: Star }
];

export function DogWalkingWhy() {
    return (
        <section className="py-24 bg-[#003451] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#bfe37f]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#218dcc]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-serif font-bold leading-tight"
                        >
                            Why Choose DeePet for <br />
                            <span className="text-[#bfe37f]">dog walking services?</span>
                        </motion.h2>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            We at DeePet services are passionate to deliver nothing but top-notch care and fun services to your pet. And what makes us stand out from the crowd:
                        </p>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {WHY_POINTS.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#bfe37f] flex items-center justify-center text-[#133d39] group-hover:scale-110 transition-transform">
                                    <point.icon className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-lg">{point.title}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Check, Star, Video, ShieldCheck, MapPin, Award } from "lucide-react";

export function BoardingDetails() {
    const whyChooseList = [
        { text: "Verified and skilled team of experienced professionals", icon: ShieldCheck },
        { text: "Centrally located in the heart of Delhi for accessibility", icon: MapPin },
        { text: "Passionate individuals serving best boarding results", icon: Award },
        { text: "Priority to Safety - We never compromise on safety", icon: ShieldCheck },
        { text: "Flexible boarding from one night to weeks", icon: Star }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="space-y-12">
                        {/* Our Story / Intro */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-block px-4 py-1.5 bg-[#bfe37f]/20 text-[#133d39] rounded-full text-xs font-bold uppercase tracking-widest">
                                Our Story
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif text-[#003451] font-bold leading-tight">
                                Best Pet Boarding <br />
                                <span className="text-[#3893c5]">Services Near Me</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                                <p>
                                    Our pets are like our baby to us and we like to go everywhere with them. But, logically and in real world it&apos;s not possible and we have to take care of them while going without them.
                                </p>
                                <p>
                                    It is such an overwhelming experience to board your pet for the first time. To help you for this overwhelming experience there exists pet boarding Gurgaon where you can handover your pet and they will look after your pet.
                                </p>
                            </div>
                        </motion.div>

                        {/* Updates & Support */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#f8fafc] p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6"
                        >
                            <div className="flex items-center gap-4 text-[#3893c5]">
                                <Video className="w-8 h-8" />
                                <h3 className="text-2xl font-bold font-serif">Regular Updates</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Once you have dropped your pet at DeePet then you can contact us anytime to get updates through pictures and videos. Our host ensures your pet feels at home and you stay connected daily.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <li className="flex items-center gap-2 text-[#003451] font-semibold">
                                    <Check className="w-5 h-5 text-[#bfe37f]" /> 24/7 Photo/Video Updates
                                </li>
                                <li className="flex items-center gap-2 text-[#003451] font-semibold">
                                    <Check className="w-5 h-5 text-[#bfe37f]" /> Emergency Support
                                </li>
                                <li className="flex items-center gap-2 text-[#003451] font-semibold">
                                    <Check className="w-5 h-5 text-[#bfe37f]" /> Professional Caretakers
                                </li>
                                <li className="flex items-center gap-2 text-[#003451] font-semibold">
                                    <Check className="w-5 h-5 text-[#bfe37f]" /> Personalized Diet
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="space-y-12 lg:pt-12">
                        {/* Refund & Reschedule */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#003451] text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-2xl font-bold font-serif mb-4 flex items-center gap-3">
                                <Check className="w-8 h-8 text-[#bfe37f]" /> Cancel and refund
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                In case you have dropped your plans for bookings then don&apos;t worry because you can always reschedule the booking at your chosen time. Apart from that, our easy refund policy will help you to rearrange the booking at your convenience.
                            </p>
                        </motion.div>

                        {/* Why Choose DeePet */}
                        <div className="space-y-8">
                            <h3 className="text-3xl font-serif text-[#003451] font-bold">Why choose DeePet pet boarding?</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {whyChooseList.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:border-[#bfe37f]/50 transition-all hover:bg-white hover:shadow-md"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#003451] flex items-center justify-center text-[#bfe37f] shrink-0">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[#003451] font-medium leading-tight">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Syringe, Activity, ShieldPlus, Heart, Thermometer, TestTube2, Bone } from "lucide-react";

export function VaccinationOfferings() {
    const dogOfferings = [
        { name: "Rapid Kit Test for Parvo", price: "Rs. 1199", icon: Activity },
        { name: "Rapid Kit Test for Distemper", price: "Rs. 1999", icon: Activity },
        { name: "Puppy DP", price: "Rs. 1199", icon: Heart },
        { name: "Anti Rabies", price: "Rs. 799", icon: ShieldPlus },
        { name: "DHPPIL (10 in 1)", price: "Rs. 1199", icon: Syringe },
        { name: "Kennel Cough", price: "Rs. 1499", icon: Thermometer },
        { name: "Canine Corona", price: "Rs. 1199", icon: Syringe },
        { name: "Deworming - puppy/adult", price: "Rs. 299/499", icon: Bone },
        { name: "Consultation", price: "Rs. 799", icon: TestTube2 }
    ];

    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Our Professional Vet Services</h2>
                    <p className="text-gray-500 text-lg">Detailed list of individual vaccinations and diagnostic tests</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dogOfferings.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white p-8 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#f8fafc] group-hover:bg-[#bfe37f] rounded-2xl flex items-center justify-center text-[#3893c5] group-hover:text-[#003451] transition-colors">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-[#003451] leading-tight">{item.name}</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Available Now</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-black text-[#3893c5]">{item.price.split(' ')[1]}</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Starting At</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button onClick={() => window.location.href = "/contact"} className="inline-flex items-center gap-4 bg-[#003451] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#3893c5] transition-all cursor-pointer group">
                        <span>Need a custom vaccination plan?</span>
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <Syringe className="w-4 h-4" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}

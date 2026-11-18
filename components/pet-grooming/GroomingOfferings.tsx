"use client";

import { motion } from "framer-motion";
import { Scissors, Bath, BrushIcon as Brush, Footprints, Ear, Smile, Wand2 } from "lucide-react";
import Image from "next/image";
import { useContact } from "@/components/providers/useContact";

const OFFERINGS = [
    {
        title: "Brushing",
        description: "Specialized techniques to remove loose hair and enhance skin health. Tools selected based on breed and coat type.",
        icon: Brush
    },
    {
        title: "Teeth cleaning",
        description: "Maintain oral hygiene and keep bad breath away with professional teeth brushing facilities.",
        icon: Smile
    },
    {
        title: "Bathing",
        description: "Removes dirt, odour, and allergens while softening the coat and reducing shedding.",
        icon: Bath
    },
    {
        title: "Hair cut",
        description: "Regular trims by expert stylists to decrease disease chances and keep your pet presentable.",
        icon: Scissors
    },
    {
        title: "Ear cleaning",
        description: "Careful removal of dirt and wax to prevent infections and pain for your furry friend.",
        icon: Ear
    },
    {
        title: "Nail clipping",
        description: "Professional and expert approach to handle pets with care for safe nail clipping.",
        icon: Footprints
    },
    {
        title: "Paw massage",
        description: "Relax muscles, ligaments, and stimulate blood flow for ultimate rejuvenation.",
        icon: Wand2
    }
];

export function GroomingOfferings() {
    const { callHref } = useContact();
    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">What we offer?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Grooming includes a lot of little details. We provide a complete professional experience at your doorstep.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                    {OFFERINGS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
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

                {/* Cross-Promotion Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[3rem] overflow-hidden bg-[#3893c5] text-white p-8 md:p-12"
                >
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 border-8 border-white rounded-full -translate-y-1/2 translate-x-1/2" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="inline-block px-4 py-1.5 bg-[#bfe37f] text-[#133d39] rounded-full text-xs font-bold uppercase tracking-wider">
                                Health Alert
                            </div>
                            <h3 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                                Want to keep your pet healthy? <br />
                                <span className="text-[#bfe37f]">Vet doctor home visit reach out to us!</span>
                            </h3>
                            <p className="text-white/80 text-lg">
                                Professional diagnostic testing services delivered at your home.
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <a href={callHref} className="bg-[#bfe37f] text-[#133d39] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                    Enquire Now
                                </a>
                                <div className="text-yellow-300 font-bold text-2xl flex flex-col">
                                    <span className="text-xs uppercase tracking-widest text-white/60 mb-1">Special Offer</span>
                                    25% OFF
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
                            <Image
                                src="/heroimages/hiw-booking.png"
                                alt="Vet Consultation"
                                fill
                                className="object-cover rounded-[2.5rem]"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

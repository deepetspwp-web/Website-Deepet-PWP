"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Smile as Tooth,
    Scissors as Surgery,
    Zap,
    Utensils,
    Brain,
    ShoppingBag,
    ChevronRight
} from "lucide-react";

const SERVICES = [
    {
        icon: Cpu,
        title: "Microchipping for Pets",
        desc: "A tiny chip implanted under your pet's skin containing a unique ID number. It's a safe and effective method that offers peace of mind, ensuring your pet can find their way home if they get lost."
    },
    {
        icon: Tooth,
        title: "Pet Dental Care",
        desc: "Regular brushing and professional cleanings prevent gum disease and tooth decay. Keeping your pet's teeth clean ensures they stay healthy and happy for years to come. Schedule a dental checkup today!"
    },
    {
        icon: Surgery,
        title: "Veterinary Surgery",
        desc: "Whether it's routine spaying or complex orthopedic repairs, our skilled veterinary team prioritizes your pet's safety. We use advanced techniques and state-of-the-art equipment for smooth recovery."
    },
    {
        icon: Zap,
        title: "Emergency Pet Services",
        desc: "24/7 emergency services for urgent medical situations, from accidents to sudden illnesses. Our experienced team is ready to provide life-saving treatments when it matters most, day or night."
    },
    {
        icon: Utensils,
        title: "Nutritional Counseling",
        desc: "Personalized diet plans based on age, breed, and health. Whether for weight management or allergies, ensure your pet gets the nutrients they need for a long, healthy life."
    },
    {
        icon: Brain,
        title: "Behavioural Counseling",
        desc: "Address signs of anxiety or aggression through customized training and expert guidance. We help you understand the root causes to improve your pet's stress-free life."
    },
    {
        icon: ShoppingBag,
        title: "Pet Pharmacy",
        desc: "Fully stocked with trusted medications, supplements, and preventatives. All sourced from trusted suppliers ensuring quality and safety for your pet's pharmaceutical needs."
    }
];

export function VetAdditionalServices() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Comprehensive Specialized Care</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything your pet needs for a long, healthy, and happy life, all under one roof or at your doorstep.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SERVICES.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[#bfe37f] transition-all group shadow-sm hover:shadow-xl flex flex-col items-start"
                        >
                            <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#bfe37f]/20 transition-colors mb-6">
                                <service.icon className="w-8 h-8 text-[#003451] group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold text-[#003451] mb-4">{service.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                {service.desc}
                            </p>
                            <button className="flex items-center gap-2 text-sm font-bold text-[#003451] hover:text-[#bfe37f] transition-colors group/btn">
                                Learn More
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ))}

                    {/* CTA Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: SERVICES.length * 0.1 }}
                        className="bg-gradient-to-br from-[#bfe37f] to-[#a9d663] p-8 rounded-[2rem] shadow-xl flex flex-col justify-center items-center text-center text-[#133d39] h-full border-4 border-white"
                    >
                        <h3 className="text-2xl font-serif font-bold mb-4">Ready to provide the best care?</h3>
                        <p className="text-[#133d39]/70 text-sm mb-8">Schedule a session with our expert veterinarians today and give your pet the care they deserve.</p>
                        <button onClick={() => window.location.href = "/contact"} className="w-full py-4 bg-[#133d39] text-white rounded-xl font-bold hover:scale-[1.02] shadow-lg transition-transform uppercase tracking-widest text-xs">
                            Enquire Now
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

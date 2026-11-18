"use client";

import { motion } from "framer-motion";

const BOOKINGS = [
    { client: "Nikhil Bhati", action: "recently booked our vet services for his dog surgery." },
    { client: "Ankita Jindal", action: "hired pet grooming services for her dog and cat in Faridabad" },
    { client: "Mohit Rajput", action: "just booked emergency vet visit in Delhi for his cat." },
    { client: "Lokesh Reddy", action: "asked for health checkup of his newly adopted puppy." },
    { client: "Ravi Kumar", action: "booked Veterinary Service with DeePet Services recently for his Dog." },
    { client: "Swati Tiwari", action: "booked vet visit in Delhi with DeePet Services recently" },
    { client: "Sanjay Joshi", action: "hired pet groomer in Gurgaon with us few minutes ago." },
    { client: "Deepak", action: "asked for a quote to train his 2 dogs in Greater Noida." },
    { client: "Madhu Vyas", action: "hired cat grooming services at home in Gurgaon." },
    { client: "Jyoti Gupta", action: "asked for vet visit to vaccinate her puppy in Noida" }
];

export function ConsultationMarquee() {
    return (
        <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-8 items-center"
                >
                    {[...BOOKINGS, ...BOOKINGS].map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 bg-[#f8fafc] px-6 py-4 rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#3893c5] flex items-center justify-center text-white font-bold text-sm">
                                {item.client[0]}
                            </div>
                            <div className="text-sm">
                                <span className="font-bold text-[#003451]">{item.client}</span>
                                <span className="text-gray-500 ml-2">{item.action}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

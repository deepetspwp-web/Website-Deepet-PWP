"use client";

import { motion } from "framer-motion";
import { User, Clock } from "lucide-react";

const BOOKINGS = [
    { name: "Nikhil Bhati", action: "booked our vet services for his dog surgery", location: "Delhi" },
    { name: "Ankita Jindal", action: "hired pet grooming services for her dog and cat", location: "Faridabad" },
    { name: "Mohit Rajput", action: "booked emergency vet visit for his cat", location: "Delhi" },
    { name: "Lokesh Reddy", action: "asked for health checkup of his newly adopted puppy", location: "Noida" },
    { name: "Ravi Kumar", action: "booked Veterinary Service for his Dog", location: "Delhi" },
    { name: "Swati Tiwari", action: "booked vet visit recently", location: "Delhi" },
    { name: "Sanjay Joshi", action: "hired pet groomer few minutes ago", location: "Gurgaon" },
    { name: "Deepak", action: "asked for a quote to train his 2 dogs", location: "Greater Noida" },
    { name: "Madhu Vyas", action: "hired cat grooming services at home", location: "Gurgaon" },
    { name: "Jyoti Gupta", action: "asked for vet visit to vaccinate her puppy", location: "Noida" }
];

export function GroomingRecentBookings() {
    return (
        <section className="bg-[#bfe37f] py-4 overflow-hidden border-y border-[#133d39]/10">
            <div className="flex whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -2000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 60,
                        ease: "linear"
                    }}
                    className="flex gap-8 items-center"
                >
                    {[...BOOKINGS, ...BOOKINGS, ...BOOKINGS].map((booking, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#133d39]">
                                <User className="w-4 h-4" />
                            </div>
                            <p className="text-[#133d39] text-sm font-medium">
                                <span className="font-bold">{booking.name}</span> {booking.action} in <span className="font-bold">{booking.location}</span>
                            </p>
                            <Clock className="w-3 h-3 text-[#133d39]/60" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

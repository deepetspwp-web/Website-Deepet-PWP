"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface BookingItem {
    image: string;
    name: string;
    location: string;
    service: string;
    pet: string;
    timeAgo: string;
}

const BOOKINGS: BookingItem[] = [
    {
        image: "/reviewsimages/unnamed (1).png",
        name: "Madhu Vyas",
        location: "Gurgaon Sec 45",
        service: "General Checkup & Vitals",
        pet: "Golden Retriever",
        timeAgo: "4m ago"
    },
    {
        image: "/reviewsimages/unnamed (2).png",
        name: "Jyoti Gupta",
        location: "Noida Sec 62",
        service: "Vaccination Booster",
        pet: "Persian Cat",
        timeAgo: "11m ago"
    },
    {
        image: "/reviewsimages/unnamed (3).png",
        name: "Nikhil Bhati",
        location: "South Delhi, GK-2",
        service: "At-Home Blood Test",
        pet: "Beagle",
        timeAgo: "18m ago"
    },
    {
        image: "/reviewsimages/unnamed (4).png",
        name: "Lokesh Reddy",
        location: "Faridabad Sec 16",
        service: "Skin Care & Allergy Care",
        pet: "Shih Tzu",
        timeAgo: "24m ago"
    },
    {
        image: "/reviewsimages/unnamed (5).png",
        name: "Mohit Rajput",
        location: "Dwarka Sec 10, Delhi",
        service: "Urgent Home Vet Visit",
        pet: "Labrador",
        timeAgo: "32m ago"
    },
    {
        image: "/reviewsimages/unnamed (6).png",
        name: "Ankita Jindal",
        location: "Indirapuram, Ghaziabad",
        service: "Puppy Complete Checkup",
        pet: "Indie Pup",
        timeAgo: "40m ago"
    }
];

export function ClientWall() {
    return (
        <section className="bg-slate-50/90 py-3 overflow-hidden relative border-y border-slate-200/60">
            {/* Gradient edge masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="flex items-center">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 55,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex gap-3 items-center whitespace-nowrap pl-4"
                >
                    {[...BOOKINGS, ...BOOKINGS, ...BOOKINGS, ...BOOKINGS].map((item, idx) => (
                        <div
                            key={idx}
                            className="inline-flex items-center gap-2.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs hover:shadow-md transition-shadow"
                        >
                            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={28}
                                    height={28}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-xs leading-tight flex items-center gap-2">
                                <span className="font-bold text-[#003451]">{item.name}</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-600 font-medium">{item.service}</span>
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <MapPin className="w-2.5 h-2.5" />
                                    {item.location}
                                </span>
                                <span className="text-slate-400 text-[10px]">{item.timeAgo}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

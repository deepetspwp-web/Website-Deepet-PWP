"use client";

import { motion } from "framer-motion";
import { Footprints, Home } from "lucide-react";

const PRICING_DATA = [
    {
        name: "Waggins",
        tagline: "The best pet boarding, where tails never stop wagging!",
        basePrice: "1,800",
        original: "2,200",
        details: "Rs. 1,800, Rs. 2,300, Rs. 3,300 / Depends on the room size",
        icon: Footprints
    },
    {
        name: "House Of Howl",
        tagline: "The ultimate pet boarding experience your pets will love!",
        basePrice: "1,000",
        original: "1,400",
        details: "For Big Dogs Rs. 1,200, For Small Dogs Rs. 1,000",
        icon: Home
    },
    {
        name: "OMA Pets",
        tagline: "Pet boarding feels like a second home for your furry family",
        basePrice: "1,000",
        original: "1,400",
        details: "For Big Dogs Rs. 1,200, For Small Dogs Rs. 1,000",
        icon: Home
    },
    {
        name: "Muddy Paws",
        tagline: "The premier pet boarding destination for happy pets",
        basePrice: "1,000",
        original: "1,400",
        details: "For Big Dogs Rs. 1,200, For Small Dogs Rs. 1,000",
        icon: Footprints
    }
];

export function BoardingPricing() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Pet Boarding Price Plan</h2>
                    <p className="text-gray-500 text-lg">Choose your perfect Plan for your beloved pets</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRICING_DATA.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-[#f8fafc] p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:border-[#bfe37f]/50 transition-all flex flex-col group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#003451] group-hover:bg-[#bfe37f] flex items-center justify-center text-white group-hover:text-[#003451] mb-6 transition-colors">
                                <plan.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-[#3893c5] mb-2">{plan.name}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">&quot;{plan.tagline}&quot;</p>

                            <div className="mb-6 space-y-1">
                                <span className="text-gray-400 line-through text-sm">Rs. {plan.original}</span>
                                <div className="text-2xl font-bold text-[#003451]">
                                    Price Starts at <span className="text-[#3893c5]">₹{plan.basePrice}</span>
                                </div>
                            </div>

                            <p className="text-xs font-semibold text-[#133d39] mb-8 bg-[#bfe37f]/10 p-3 rounded-xl border border-[#bfe37f]/20">
                                {plan.details}
                            </p>

                            <a href="/#book" className="w-full py-4 bg-[#003451] hover:bg-[#3893c5] text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-all mt-auto shadow-lg shadow-blue-500/10 flex items-center justify-center">
                                Book Now
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

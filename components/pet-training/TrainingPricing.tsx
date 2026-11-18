"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PRICING_PLANS = [
    {
        title: "Puppy Training",
        subtitle: "Training Period: 2-3 Months*",
        price: "9,999",
        original: "12,299",
        per: "per 12 session",
        features: ["Pee-Poop Training", "Name Recognition", "House Etiquettes", "Basic Socialization", "Puppy Biting Correction", "Leash Walking", "Basic Commands: Sit, Stay..."]
    },
    {
        title: "Behavioural Modification",
        subtitle: "Training Period: 4-6 Months*",
        price: "15,999",
        original: "18,249",
        per: "per 12 session",
        features: ["Separation Anxiety", "Fussy Eater", "Fear/Anxiety Correction", "Barking/Growling Issue", "Aggressive Behaviour", "Leash Pulling", "Hyper Activity Check"]
    },
    {
        title: "Basic + Advance Obedience",
        subtitle: "Training Period: 4-6 Months*",
        price: "12,999",
        original: "14,299",
        per: "per 12 session",
        features: ["House Etiquettes", "Crate Training", "Advanced Commands", "Heal Walking", "Greetings (Shake hand)", "Guarding Principles", "Place Recognition"]
    },
    {
        title: "Protection/Guard Dog",
        subtitle: "Training Period: 6-9 Months*",
        price: "19,999",
        original: "21,999",
        per: "per 12 session",
        features: ["Article Protection", "Property Protection", "Sniff & Search", "Personal Protection", "Agility Training", "Herding Commands"]
    }
];

export function TrainingPricing() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Choose your perfect Plan</h2>
                    <p className="text-gray-500 text-lg">Specialized training plans tailored to your dog&apos;s needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRICING_PLANS.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`relative rounded-3xl p-8 border hover:shadow-2xl transition-all duration-300 flex flex-col ${idx % 2 === 0 ? 'bg-[#f8fafc] border-gray-100' : 'bg-[#003451] text-white border-transparent'}`}
                        >
                            <h3 className={`text-xl font-bold mb-1 ${idx % 2 === 0 ? 'text-[#3893c5]' : 'text-[#bfe37f]'}`}>{plan.title}</h3>
                            <p className={`text-xs font-semibold mb-6 uppercase tracking-wider ${idx % 2 === 0 ? 'text-gray-400' : 'text-gray-300'}`}>{plan.subtitle}</p>

                            <div className="mb-8">
                                <span className="text-gray-400 line-through text-sm">Rs. {plan.original}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold">Rs. {plan.price}</span>
                                    <span className={`text-xs font-medium uppercase tracking-wider opacity-60`}>{plan.per}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <li key={fIdx} className="flex items-center gap-3 text-sm">
                                        <div className={`p-0.5 rounded-full bg-[#bfe37f]/20 ${idx % 2 === 0 ? 'text-[#133d39]' : 'text-[#bfe37f]'}`}>
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className={idx % 2 === 0 ? 'text-gray-600' : 'text-gray-300'}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a href="/#book" className={`w-full py-4 rounded-xl font-bold transition-all text-sm uppercase tracking-widest flex items-center justify-center ${idx % 2 === 0 ? 'bg-[#003451] text-white hover:bg-[#3893c5]' : 'bg-[#bfe37f] text-[#133d39] hover:bg-[#a9d663]'}`}>
                                Book Now
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

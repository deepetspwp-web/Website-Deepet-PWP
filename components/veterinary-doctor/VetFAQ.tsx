"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQS = [
    {
        question: "What should I do if my pet's vaccination history is unknown?",
        answer: "Before doing anything make sure to book an appointment from the Vet services at home the veterinary doctor would get some tests done and then prepare the report. And, if you haven't got a pet yet, you can get a pet from the veterinary doctor suggestion so that they provide you with all the necessary details."
    },
    {
        question: "Will i get same day veterinarian doctor visit at my home?",
        answer: "Yes the vet will visit your home for the pet's health as per your decided time. Or in case of any emergency you can inform them for further suitable dates so that they can book the dates for you."
    },
    {
        question: "Will vet carry all the necessary equipments and medicine?",
        answer: "Once you are done with the session bookings, our expert pet doctor home visit you with all the necessary equipments and medicine. So that the treatment can be processed properly and if anything needs more focused treatment then your pet will be suggested to get treatment done through vet's clinic."
    },
    {
        question: "How much is the charge for veterinary doctor home visit?",
        answer: "The charges for home visit of a veterinary doctor depends on various factors such as pet, it's breed, it's size, their health concern and many other important points. However, the charges can be varied between 500 to 10000 accordingly."
    },
    {
        question: "How often should I visit cheap vet near me?",
        answer: "A health checkup for your pet is really important. However the checkup interval can be different according to the pet. Make sure to book a consultation with vet doctor and they can suggest you the right interval for the checkup. However, it depends on weekly to monthly checkups but if your pet has some health conditions then you need to book the vet's appointment according to their prescribed time."
    },
    {
        question: "How to choose a best veterinary doctor for your pet?",
        answer: "Points like their education, experience, clinic location, availability and support etc are needed to be checked carefully. DeePet vet visit at home provides you a platform where you can choose the best vet for your pet. This doctor will be best suited for your pet for any health concern."
    },
    {
        question: "What is the pet dr near me charges?",
        answer: "The veterinary doctor charges can differ based on your pet, their size, breed etc. You can check the charges based on your pet through contacting us. However, the charges can be anywhere between Rs 500 to Rs 10000 based on the package, services and your pet. Once you contact our team, they will jot down everything important related to your pet and then book your appointment accordingly."
    }
];

export function VetFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#003451] text-xs font-bold uppercase tracking-widest border border-blue-100">
                            <HelpCircle className="w-4 h-4" />
                            Got Questions?
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Frequently Asked Questions</h2>
                        <p className="text-gray-500 text-lg">Everything you need to know about our home vet services</p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className={`rounded-[1.5rem] border transition-all ${openIndex === idx ? 'bg-gray-50 border-[#bfe37f] shadow-lg shadow-[#bfe37f]/5' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full text-left p-6 flex items-center justify-between gap-4"
                                >
                                    <span className={`font-bold text-lg md:text-xl ${openIndex === idx ? 'text-[#003451]' : 'text-gray-700'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openIndex === idx ? 'bg-[#bfe37f] border-[#bfe37f] text-[#133d39] scale-110' : 'bg-white border-gray-200 text-gray-400'}`}>
                                        {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-gray-500 leading-relaxed text-base">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Support Banner */}
                    <div className="mt-16 p-8 rounded-[2rem] bg-[#003451] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Still have more questions?</h3>
                            <p className="text-gray-400 text-sm italic">Our team is available 24/7 to help you with your queries.</p>
                        </div>
                        <button onClick={() => window.location.href = "/contact"} className="px-8 py-4 bg-[#bfe37f] text-[#133d39] rounded-xl font-bold hover:scale-[1.02] transition-transform text-sm uppercase tracking-widest whitespace-nowrap shadow-xl shadow-green-500/10">
                            Contact Us Today
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

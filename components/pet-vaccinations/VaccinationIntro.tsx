"use client";

import { motion } from "framer-motion";

const FAQS = [
    {
        q: "What are the pet vaccination prices?",
        a: "Our prices are very transparent and competitive. Individual vaccines start from Rs. 299, and full packages start from Rs. 1,799."
    },
    {
        q: "Can I get my pet vaccinated at home?",
        a: "Yes! At DeePet, we provide professional doorstep vaccination services in Delhi NCR. Our vet will visit your home to ensure a stress-free experience."
    },
    {
        q: "What happens if I miss the vaccination appointment?",
        a: "Missing an appointment can leave your pet vulnerable. It's crucial to reschedule and visit a vet or book a home visit as soon as possible to get back on track."
    }
];

export function VaccinationIntro() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2 space-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-serif text-[#003451] font-bold leading-tight"
                        >
                            Pet Vaccination <br />
                            <span className="text-[#3893c5]">At Home Near Me</span>
                        </motion.h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                            <p>
                                Vaccinations are really important for a human and the same goes with animals. It&apos;s the responsibility of the pet owner to keep their pets in best health by maintaining their vaccination schedule.
                            </p>
                            <p>
                                Pet vaccination prevents pets from catching any harmful disease or any other deadly ailments threatening to their life. According to a survey, many pets are protected from severe illness through proper monitoring.
                            </p>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-[#bfe37f]">
                                <p className="font-bold text-[#003451]">
                                    &quot;With proper and regular vaccination your pet can avoid illness which will even save you from spending a big chunk of your savings.&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 h-full">
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-10">Vaccination FAQs</h3>
                            <div className="space-y-10">
                                {FAQS.map((faq, idx) => (
                                    <div key={idx} className="space-y-3 relative pl-8">
                                        <div className="absolute left-0 top-1 text-2xl font-black text-[#bfe37f]">{idx + 1}.</div>
                                        <h4 className="text-[#3893c5] font-bold text-lg">
                                            {faq.q}
                                        </h4>
                                        <p className="text-gray-500 leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

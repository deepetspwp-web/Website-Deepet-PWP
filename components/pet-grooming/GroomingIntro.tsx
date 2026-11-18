"use client";

import { motion } from "framer-motion";

const FAQS = [
    {
        q: "Why is grooming important?",
        a: "Regular grooming is really important for your pet's health as it removes any debris, dirt and any kind of infection chances. Timely grooming helps to reduce hair or dental issues in your pets. You can easily find pet groomers close to me and book a session for your pet."
    },
    {
        q: "How much pet grooming cost?",
        a: "Our at-home pet grooming services start from ₹999. We offer various packages from basic baths to full premium grooming sessions for both dogs and cats."
    },
    {
        q: "How to groom a pet?",
        a: "Professional grooming involves specialized techniques for brushing, bathing, hair cutting, and cleaning sensitive areas like ears and teeth using breed-specific tools."
    },
    {
        q: "How long does pet grooming session takes?",
        a: "A typical grooming session can take anywhere from 45 minutes to 2 hours depending on the pet's size, coat condition, and the specific services requested."
    }
];

export function GroomingIntro() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-serif text-[#003451] font-bold leading-tight"
                        >
                            Doorstep Pet Grooming Services - Unleash the Best Care
                        </motion.h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                The little furry friend of yours have been with you through thick and thin times, this is the reason why we love our pets. Over the time they develop a bond with you and you two love each other like anything. As fantastic as it sounds, pet grooming is actually a big responsibility.
                            </p>
                            <p>
                                Apart from this, having a cat or a dog as a pet needs extra care because they become hyperactive while grooming. We understand that your days must be busy and you can&apos;t afford to drive to pet hospital for the grooming process. This is why we offer pet grooming home service, you just have to finalize the time and our team will visit you.
                            </p>
                            <p>
                                DeePet services offers nothing but top-notch quality of grooming services for dogs and cats. Our expert and certified pet groomers who gives first class grooming experience to your pets. From nail clipping, to haircut and dog massage to dog bath, everything will be delivered to your house effortlessly.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-[#f8fafc] rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-8">Common Questions</h3>
                            <div className="space-y-8">
                                {FAQS.map((faq, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h4 className="text-[#3893c5] font-bold flex gap-2">
                                            <span className="text-[#bfe37f]">Q-</span> {faq.q}
                                        </h4>
                                        <p className="text-gray-500 pl-6 leading-relaxed">
                                            <span className="font-semibold text-gray-700">Ans-</span> {faq.a}
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

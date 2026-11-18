"use client";

import { motion } from "framer-motion";

const FAQS = [
    {
        q: "What is pet boarding?",
        a: "Pet boarding is a service where you can handover your pet to a professional facility for a period of time. These centres feed your pet, give them walks, and care for everything they require while you are away."
    },
    {
        q: "What are pet boarding charges?",
        a: "Our pet boarding services start from ₹999/₹1000 per day. Charges vary depending on the roommate size and the specific hostel selected (Waggins, House Of Howl, etc.)."
    },
    {
        q: "How to make my pet feel at ease after pet boarding session?",
        a: "Once you have got your pet from boarding, you can make them feel safe by spending more time with them. Provide them their favourite toys and bedding, and give them a walk."
    }
];

export function BoardingIntro() {
    return (
        <section className="py-20 bg-[#f8fafc]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/2 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-serif text-[#003451] font-bold leading-tight"
                        >
                            Deepet Services <br />
                            <span className="text-[#3893c5]">Your Trusted Partner in Pet Care</span>
                        </motion.h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                At Deepet Services, we understand that your pets are not just animals; they are beloved members of your family. Our dedicated team of experienced veterinarians and compassionate staff is here to provide exceptional veterinary services for your cherished cats and dogs.
                            </p>
                            <p>
                                Our pet boarding Gurgaon services are designed to help you for this overwhelming experience. Handover your pet to our professionals who have more than 6-8 years of experience. We ensure your heart doesn&apos;t sink leaving your pet in other hands.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-8">Boarding Common Questions</h3>
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

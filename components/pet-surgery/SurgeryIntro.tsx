"use client";

import { motion } from "framer-motion";

const FAQS = [
    {
        q: "Can i visit the dog surgery centre for consultation?",
        a: "Yes, you can visit our center for a consultation. Our expert vet surgeon will help you understand the procedure and help your pet in this hard time."
    },
    {
        q: "How much a cat surgery cost?",
        a: "There are many factors on which the cost depends such as breed, size, health conditions etc. However, the cost can be starting from Rs 5000 to Rs 50000."
    },
    {
        q: "How to prepare my pet for surgery?",
        a: "Our team will provide a detailed checklist based on the type of surgery. Common steps include fasting and keeping your pet calm."
    }
];

export function SurgeryIntro() {
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
                            Vet Surgeon in Delhi NCR <br />
                            <span className="text-[#3893c5]">For Dogs & Cats</span>
                        </motion.h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                An injured or ill pet can&apos;t tell you actually how they feel or what&apos;s actually hurting them. And, we understand the pain that you feel after you see them in discomfort.
                            </p>
                            <p>
                                This is why DeePet&apos;s Pet surgery center is there to help you for this hard time. If you are looking for any types of pet surgery then feel free to contact us our expert vet surgeon will help you.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-8">Surgery Common Questions</h3>
                            <div className="space-y-8">
                                {FAQS.map((faq, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <h4 className="text-[#3893c5] font-bold flex gap-2">
                                            <span className="text-[#bfe37f]">{idx + 1}.</span> {faq.q}
                                        </h4>
                                        <p className="text-gray-500 pl-6 leading-relaxed">
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

"use client";

import { motion } from "framer-motion";

const FAQS = [
    {
        q: "What are the process involved for dog training?",
        a: "Our professional dog trainers train the dogs in a sympathetic and fun way. The process involves identifying behavioral needs, setting goals, and using positive reinforcement to teach commands and social skills."
    },
    {
        q: "What are the dog trainer fees?",
        a: "Our training packages start from ₹9,999. We offer various plans depending on the type of training required, such as puppy training, behavioral modification, or protection training."
    },
    {
        q: "How much time is required for dog training?",
        a: "It's not fixed; it depends from dog to dog. However, the minimum time taken for dogs to get trained can somewhere be between a month to six months."
    }
];

export function TrainingIntro() {
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
                            Pet Training Near Me - At Home Dog Trainer
                        </motion.h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                            <p>
                                A pet comes as a new family member but as the time pass by they become the heart of the family. Similarly, when you bring them into your life they are not aware of some of the disciples and norms. And, it&apos;s even not easy for them to understand our language or way immediately. This is when dog training services can help you with the same.
                            </p>
                            <p>
                                One important thing is that training doesn&apos;t mean strictness with the dog. Our professional dog trainers train the dogs with utter sympathetic and fun way. This training would not only be beneficial for your dog but for you as well.
                            </p>
                            <p>
                                Our dog training service provider will guide you to become more comfortable with your pet so that you both become friends to each other and increase more understanding between the two of you.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <div className="bg-[#f8fafc] rounded-[2rem] p-8 shadow-sm border border-gray-100 h-full">
                            <h3 className="text-2xl font-serif text-[#003451] font-bold mb-8">Training Insights</h3>
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

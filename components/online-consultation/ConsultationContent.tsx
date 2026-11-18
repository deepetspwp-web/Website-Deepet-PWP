"use client";

import { motion } from "framer-motion";
import { CheckCircle, Dog, Cat } from "lucide-react";

export function ConsultationContent() {
    const issues = [
        "Digestion issues", "Skin problems", "Dental care", "Diet plan",
        "Wellness & Prevention", "Vaccination advice", "Anxiety problems",
        "Ear problems", "Nutrition advice"
    ];

    const dogIssues = [
        { title: "Nutrition advice", desc: "Talk to a vet on call for proper guidance for your pet's diet." },
        { title: "Dog parenting management", desc: "Tools and techniques to design their lifestyle and how to take care of them." },
        { title: "Behavioral training tips", desc: "Learn on how to act or behave in any new or sudden condition." }
    ];

    const catIssues = [
        { title: "Nutrition advice", desc: "Different pets need different diets. Get expert guidance for your cat's nutrition." },
        { title: "Cat parenting management", desc: "Our experts guide you to take the best care of your feline friend." },
        { title: "Behavioral training", desc: "Address signs or behaviors your cat exhibits from the comfort of home." }
    ];

    return (
        <section className="py-24 bg-[#003451] text-white">
            <div className="container mx-auto px-4 md:px-6">

                {/* Main Story Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                            Online Vet Consultant at <br />
                            <span className="text-[#bfe37f]">DeePet Services</span>
                        </h2>
                        <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                            <p>
                                Do you also start your morning with &quot;Why did my dog vomit today?&quot; Or &quot;Why is he sleeping too late?&quot; Then you have landed at the very right page.
                            </p>
                            <p>
                                DeePet online vet consultation understands every health conditions of your pet and is ready to help them get better at any time of the day.
                            </p>
                            <p className="bg-white/5 p-6 rounded-2xl border border-white/10 italic">
                                &quot;When it&apos;s the matter of the pet&apos;s health then we don&apos;t want to take any risk. DeePet Services has taken the pledge to provide best, easily accessible and convenient 24 hour vet online consultation.&quot;
                            </p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {issues.map((issue, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3 group hover:bg-[#bfe37f] hover:text-[#003451] transition-all cursor-default"
                            >
                                <CheckCircle className="w-4 h-4 text-[#bfe37f] group-hover:text-[#003451]" />
                                <span className="text-sm font-bold">{issue}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Pet Specific Guidance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Dog Column */}
                    <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#bfe37f] rounded-2xl flex items-center justify-center text-[#133d39]">
                                <Dog className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold">For Dog Consultation</h3>
                        </div>
                        <div className="space-y-6">
                            {dogIssues.map((item, idx) => (
                                <div key={idx} className="space-y-2 border-l-2 border-[#bfe37f]/30 pl-6">
                                    <h4 className="text-[#bfe37f] font-bold text-lg">{item.title}</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cat Column */}
                    <div className="bg-white/5 rounded-[3rem] p-10 border border-white/10 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#3893c5] rounded-2xl flex items-center justify-center text-white">
                                <Cat className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold">For Cat Consultation</h3>
                        </div>
                        <div className="space-y-6">
                            {catIssues.map((item, idx) => (
                                <div key={idx} className="space-y-2 border-l-2 border-[#3893c5]/30 pl-6">
                                    <h4 className="text-[#3893c5] font-bold text-lg">{item.title}</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

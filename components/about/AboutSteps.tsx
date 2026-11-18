"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Sparkles } from "lucide-react";

const STEPS = [
    {
        id: "01",
        title: "Select Service",
        description: "We use only the safest cleaning and diagnostic products specifically formulated for animals."
    },
    {
        id: "02",
        title: "Book Your Day",
        description: "Our experienced veterinary staff arrives promptly equipped for complete at-home care."
    },
    {
        id: "03",
        title: "Have Relax",
        description: "Your furry family member receives compassionate attention right in their safe home comfort."
    }
];

export function AboutSteps() {
    return (
        <section className="py-12 lg:py-16 bg-slate-50/70 relative overflow-hidden border-y border-slate-200/60">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#95c93d]">
                        <span className="w-2 h-2 rounded-full bg-[#bfe37f]" />
                        <span>Effortless Process</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] tracking-tight">
                        Three Simple Steps to Care
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm">
                        Sit back and relax while our licensed team cares for your pets with love and precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute top-2 right-4 text-7xl font-serif font-black text-slate-100 group-hover:text-emerald-50 transition-colors pointer-events-none">
                                {step.id}
                            </div>
                            <div className="relative z-10 space-y-3">
                                <div className="w-12 h-12 bg-[#bfe37f] rounded-2xl flex items-center justify-center text-[#003451] font-mono font-black text-lg shadow-xs">
                                    {step.id}
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#003451] group-hover:text-[#2894ba] transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

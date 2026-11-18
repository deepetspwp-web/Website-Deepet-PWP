"use client";

import { Check, X, Table as TableIcon } from "lucide-react";

export function ConsultationTable() {
    const rows = [
        { feature: "Availability", online: "24/7 (anywhere in India)", clinic: "Limited to clinic hours" },
        { feature: "Cost", online: "Starts ₹199", clinic: "₹500+ per visit" },
        { feature: "Travel Needed", online: false, clinic: true },
        { feature: "Immediate Help", online: true, clinic: "Based on Wait Time" },
        { feature: "Emergencies", online: "Mild to moderate cases", clinic: "Serious/surgical cases ONLY" }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-[#f8fafc] rounded-2xl flex items-center justify-center text-[#003451] border border-gray-100">
                            <TableIcon className="w-8 h-8" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#003451] font-bold">Online Vet vs Clinic Visit</h2>
                    <p className="text-gray-500 text-lg">Which is better for your current situation?</p>
                </div>

                <div className="max-w-4xl mx-auto overflow-hidden rounded-[3rem] border border-gray-100 shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#003451] text-white">
                                <th className="p-8 text-xl font-serif">Feature</th>
                                <th className="p-8 text-xl font-serif bg-[#3893c5]">Online Consultation</th>
                                <th className="p-8 text-xl font-serif">Clinic Visitations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 uppercase tracking-tighter text-xs font-bold">
                            {rows.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-8 text-gray-500">{row.feature}</td>
                                    <td className="p-8 text-[#3893c5] bg-[#3893c5]/5">
                                        {typeof row.online === 'boolean' ? (
                                            row.online ? <Check className="w-6 h-6" /> : <X className="w-6 h-6 text-gray-300" />
                                        ) : row.online}
                                    </td>
                                    <td className="p-8 text-gray-400">
                                        {typeof row.clinic === 'boolean' ? (
                                            row.clinic ? <Check className="w-6 h-6 text-[#003451]" /> : <X className="w-6 h-6" />
                                        ) : row.clinic}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-12 text-center text-gray-400 italic font-medium">
                    * For life-threatening situations (severe trauma, bleeding), visit a clinic immediately.
                </div>
            </div>
        </section>
    );
}

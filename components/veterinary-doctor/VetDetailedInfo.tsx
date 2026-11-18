"use client";

import { motion } from "framer-motion";
import { Check, Info, Stethoscope, Syringe, TestTube, Crosshair, Bug, Shield } from "lucide-react";

export function VetDetailedInfo() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    {/* Who/What Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-serif text-[#003451] font-bold">Who is a veterinary doctor?</h2>
                            <p className="text-gray-600 leading-relaxed">
                                A veterinary doctor treats different animals with their conditions and diseases. They are highly equipped and experienced to treat different animals, similar to medical professionals who treat people.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl font-serif text-[#003451] font-bold">What does a veterinary doctor do?</h2>
                            <p className="text-gray-600 leading-relaxed">
                                From routine checkups to specialized surgery, they diagnose ailments, prescribe drugs, analyze tests, and guide pet owners on proper care to maintain animal health.
                            </p>
                        </motion.div>
                    </div>

                    {/* Consultation Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-[#bfe37f]/20 rounded-2xl">
                                <Stethoscope className="w-8 h-8 text-[#133d39]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif text-[#003451] font-bold">Consultation</h2>
                                <p className="text-gray-500">Tailored guidance for your pet&apos;s specific needs</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "General Health Consultations", "Nutritional Consultations",
                                "Behavioral Consultations", "Allergy & Skin Consultations",
                                "Senior Pet Consultations", "Pre-Surgical Consultations",
                                "Chronic Condition Management"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 italic">
                                    <div className="w-2 h-2 bg-[#bfe37f] rounded-full" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vaccinations Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-2xl">
                                <Syringe className="w-8 h-8 text-[#003451]" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif text-[#003451] font-bold">At Home Vaccinations</h2>
                                <p className="text-gray-500">Protect your pet with expert doorstep services</p>
                            </div>
                        </div>
                        <div className="bg-[#003451] rounded-3xl p-8 text-white grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Puppy/Adult dog packages", "Kitten/Adult cat packages",
                                "Puppy DP & DHPPiL", "Canine corona & Kennel Cough",
                                "Antirabies Vaccine", "Tricat vaccine (Feline CRP)"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="p-1 bg-[#bfe37f] rounded-full">
                                        <Check className="w-3 h-3 text-[#133d39]" />
                                    </div>
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Blood Tests Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-50 rounded-2xl">
                                <TestTube className="w-8 h-8 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif text-[#003451] font-bold">Diagnostic & Blood Tests</h2>
                                <p className="text-gray-500">Thorough and accurate assessment of your pet&apos;s health</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed max-w-4xl">
                            Our diagnostic testing services provide a thorough and accurate assessment of your pet&apos;s health, helping to detect issues early for effective treatment:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Blood Tests */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col md:col-span-1 lg:row-span-2">
                                <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <TestTube className="w-4 h-4 text-red-600" />
                                    </div>
                                    Blood Tests
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                    Comprehensive panels to check for infections, organ function, and overall wellness.
                                </p>
                                <ul className="space-y-2 mt-auto">
                                    {[
                                        "Complete Blood Count (CBC)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)",
                                        "Blood sugar & Diabetes panel", "Thyroid profile", "Lipid profile (Total cholesterol)",
                                        "CPK-MB - for heart conditions", "Vitamin D3, A, B1, B12, E", "Routine Blood Protozoa",
                                        "PCR Canine tick fever panel", "PCR for Canine parvovirus, distemper, heartworm",
                                        "Feline PCR panel", "Rabies titre test", "Canine specific SDMA"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-red-400 rounded-full" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* X-Rays & Ultrasounds + Urinalysis */}
                            <div className="space-y-6 flex flex-col">
                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex-grow">
                                    <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Info className="w-4 h-4 text-blue-600" />
                                        </div>
                                        X-Rays & Ultrasounds
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Advanced imaging to diagnose bone fractures, tumors, or internal issues with clarity.
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex-grow">
                                    <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                            <TestTube className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        Urinalysis & Fecal Tests
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                        Screening for infections, parasites, and kidney or bladder conditions.
                                    </p>
                                    <ul className="space-y-2">
                                        {[
                                            "Urine routine analysis", "Urine culture & sensitivity",
                                            "Stool routine analysis", "Stool culture & sensitivity"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Skin tests */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col">
                                <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Bug className="w-4 h-4 text-purple-600" />
                                    </div>
                                    Skin Tests
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                    To find out root cause of red, itchy, inflamed skin & hairfall.
                                </p>
                                <ul className="space-y-2 mt-auto">
                                    {[
                                        "Skin scraping- Bacterial culture & sensitivity",
                                        "Fungal culture and sensitivity",
                                        "Routine microscopic examination for Mange and mites",
                                        "CBC & IgE (For skin allergies)",
                                        "Thyroid profile"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-purple-400 rounded-full" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Reproductive hormones */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col md:col-span-1">
                                <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                    <div className="p-2 bg-pink-100 rounded-lg">
                                        <Shield className="w-4 h-4 text-pink-600" />
                                    </div>
                                    Reproductive Hormones
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                    To find out the correct time for mating, delivery & any abnormal issues.
                                </p>
                                <ul className="space-y-2 mt-auto">
                                    {[
                                        "Progesterone serum", "Prolactin Hormone", "FSH & LH", "Testosterone"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-pink-400 rounded-full" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Cytology and Histopathology */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col md:col-span-2">
                                <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <Crosshair className="w-4 h-4 text-indigo-600" />
                                    </div>
                                    Cytology and Histopathology
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                    Cytology is the study of cells under a microscope in order to identity abnormalities and Histopathology is the microscopic study of tissue samples. These tools are essential in the diagnosis of cancers, skin conditions and organ diseases.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-auto">
                                    {[
                                        "Ear Cytology", "Fluid Cytology", "Pus Cytology",
                                        "Skin Cytology", "Urine Cytology", "Vaginal Cytology",
                                        "Nasal Swab Cytology", "Fluid Examination Routine",
                                        "FNAC", "Histopathology / Biopsy"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
                            <p className="text-red-900 text-center font-medium leading-relaxed">
                                Our diagnostic tools allow us to pinpoint health concerns with precision, ensuring the best possible care for your pet.
                            </p>
                        </div>
                    </div>

                    {/* Parasite Control Section */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-50 rounded-2xl">
                                <Bug className="w-8 h-8 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-serif text-[#003451] font-bold">Parasite Control (Deworming)</h2>
                                <p className="text-gray-500">Comprehensive protection from internal and external parasites</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed max-w-4xl">
                            Our comprehensive deworming service protects your pet from harmful internal and external parasites, ensuring their well-being and comfort & promoting a healthier and happier life:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Internal */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-full flex flex-col">
                                <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                    <div className="p-2 bg-[#bfe37f]/30 rounded-lg">
                                        <Shield className="w-4 h-4 text-[#133d39]" />
                                    </div>
                                    Internal Deworming
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                    Safeguard your pet from dangerous parasites like roundworms, tapeworms, and hookworms. Regular deworming prevents severe health issues such as malnutrition, digestive issues, anemia, intestinal blockages, and organ damage, keeping your pet healthy from the inside out.
                                </p>
                                <ul className="space-y-3 mt-auto">
                                    {[
                                        "Internal Deworming with Syrup (Puppy/kitten)",
                                        "Internal Deworming with Tablet (Adult dog/cat)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0">
                                                <Check className="w-4 h-4 text-[#8aab53]" />
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* External */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-full flex flex-col">
                                <h4 className="font-bold text-[#003451] mb-3 text-lg flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Shield className="w-4 h-4 text-blue-600" />
                                    </div>
                                    External Parasite Control
                                </h4>
                                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                                    Defend your pet against fleas, ticks, mites, and other pests that cause skin irritation, allergic reactions, and transmit serious diseases like Lyme disease. Our targeted treatments eliminate parasites quickly and provide long-lasting protection.
                                </p>
                                <ul className="space-y-3 mt-auto">
                                    {[
                                        "External parasite control with injection",
                                        "External parasite control with tablet",
                                        "External parasite control with medicated bath",
                                        "External parasite control with Spot on",
                                        "External parasite control with medicated Powder, Spray"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 flex-shrink-0">
                                                <Check className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <span className="text-sm text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-[#bfe37f]/20 p-6 rounded-2xl border border-[#bfe37f]/40">
                            <p className="text-[#133d39] text-center font-medium leading-relaxed">
                                Our veterinarians will create a customized deworming plan based on your pet&apos;s lifestyle, age, and health to ensure year-round protection & peace of mind for you and your furry companion.
                            </p>
                        </div>
                    </div>

                    {/* Health Checkup Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#003451] to-[#00263b] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-4">
                                <h2 className="text-3xl font-serif font-bold">Health Checkup</h2>
                                <p className="text-gray-300 leading-relaxed">
                                    Regular vet checkups are the way to go! Catch potential health issues early, ensure your pet stays up-to-date on vaccines and dental care. A quick visit can make all the difference.
                                </p>
                            </div>
                            <button onClick={() => window.location.href = "/contact"} className="bg-[#bfe37f] text-[#133d39] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl">
                                Book Checkup
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { HeartPulse, Table } from "lucide-react";

export function SurgeryDetails() {
    const commonProcedures = [
        {
            title: "1- Castration",
            desc: "A simple sterilization process for male dogs to prevent reproduction. Our expert team of dog surgery hospital is always there to help you anywhere anytime."
        },
        {
            title: "2- Orthopaedic surgery",
            desc: "This procedure is beneficial to recover bones or joints and get back to a healthy state."
        },
        {
            title: "3- Soft tissue surgery",
            desc: "Treats conditions such as repairing wounds with stitches after an accident."
        },
        {
            title: "4- Dental Surgery",
            desc: "One of the most common problems that can rise when a pets get aged."
        },
        {
            title: "5- Eye surgery",
            desc: "Treats cataract, glaucoma or any trauma to the eyes with utter care and responsibility."
        }
    ];

    const allSurgeryTypes = [
        { name: "Neutering(Castration)", desc: "Removal of testicles to reduce hormones and related issues." },
        { name: "Spaying(Ovariohysterectomy)", desc: "Removal of ovaries and uterus to control population and reduce risks." },
        { name: "Dental Cleaning", desc: "Removing extreme tartar, tooth extraction." },
        { name: "Tumor removal", desc: "Removal of growths depending on type, stage, and diagnosis." },
        { name: "Cystotomy", desc: "Surgery to remove stones from bladder and ureters." },
        { name: "Ear hematoma surgery", desc: "Surgery to stop filling up blood in ear flap." },
        { name: "Amputation", desc: "Removal of limb due to severe injury, infection or cancer." },
        { name: "Soft tissue surgery", desc: "Include hernia repair, wound repair and mass removal." },
        { name: "Cesarean Section", desc: "For complicated pregnancies." },
        { name: "Splenectomy", desc: "Removal of spleen due to tumors or trauma." },
        { name: "Skin surgery", desc: "For removal of warts, cysts, abscesses." }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">

                {/* Vet Surgery Center Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif text-[#003451] font-bold leading-tight">
                            Veterinary Surgeon <br />
                            <span className="text-[#3893c5]">For Dogs & Cats</span>
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            In order to provide your tailed friend with best and expert&apos;s caring hand, you consider to choose veterinary surgical center. This is the best way that you can provide to your pet for their treatment.
                        </p>
                        <div className="bg-[#f8fafc] p-8 rounded-[2rem] border border-gray-100 italic text-[#003451] font-medium leading-relaxed">
                            &quot;Once we start the treatment procedure, we put full transparency between our planning and you. When you are searching for pet surgery clinic near me make sure to choose only experienced staff and a centre where your pet is comfortable, less stressed and fear.&quot;
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <h3 className="text-2xl font-serif text-[#003451] font-bold mb-4 italic underline decoration-[#bfe37f] decoration-4 underline-offset-8">Some Common Pet Surgeries & Procedure</h3>
                        {commonProcedures.map((proc, idx) => (
                            <div key={idx} className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-100 hover:border-[#bfe37f]/50 transition-all flex flex-col gap-2">
                                <h4 className="text-[#3893c5] font-bold text-lg">{proc.title}</h4>
                                <p className="text-gray-500">{proc.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Anesthesia & Cost */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#003451] text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-[#bfe37f] rounded-2xl flex items-center justify-center text-[#133d39]">
                                <HeartPulse className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold">Importance of Anesthesia</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Just like humans are afraid of hospitals and syringes, pets are also the same. Our doctors use appropriate anesthesia to help them keep calm and safe during the procedure.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                So when you are finding one of the best vet surgeon near me in Delhi make sure they calm your pet down and use anesthesia before starting the procedure.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border-2 border-[#bfe37f] p-12 rounded-[3.5rem] shadow-xl space-y-8"
                    >
                        <div className="flex items-center gap-4 text-[#003451]">
                            <Table className="w-10 h-10" />
                            <h3 className="text-3xl font-serif font-bold">Cost of Pet Surgery</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                The charges for pet surgeries in Delhi totally depend on the type of surgery and procedure.
                            </p>
                            <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center space-y-2">
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Starting Price</span>
                                <div className="text-5xl font-black text-[#003451]">₹5,000</div>
                                <span className="text-gray-400">up to ₹50,000</span>
                            </div>
                            <p className="text-sm text-gray-400 text-center italic font-medium">Full transparency in billing. No hidden costs.</p>
                        </div>
                        <button onClick={() => window.location.href = "/contact"} className="w-full py-4 bg-[#003451] text-white rounded-xl font-bold uppercase tracking-widest hover:bg-[#3893c5] transition-colors">
                            Get Detailed Pricing
                        </button>
                    </motion.div>
                </div>

                {/* All Surgery Types Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#003451] font-bold">Types of Pet Surgery We Offer</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">From elective procedures to complex surgeries, our facility is equipped to handle all pet health needs.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allSurgeryTypes.map((type, idx) => (
                            <div key={idx} className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group">
                                <h4 className="text-[#3893c5] font-bold mb-2 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#bfe37f]" /> {type.name}
                                </h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {type.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

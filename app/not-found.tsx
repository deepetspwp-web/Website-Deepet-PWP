"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#bfe37f]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#003451]/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative inline-block mb-8">
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="text-[12rem] md:text-[15rem] font-serif font-black text-[#003451]/10 leading-none select-none"
                        >
                            404
                        </motion.h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-[#003451]/10 border border-gray-100"
                            >
                                <div className="w-24 h-24 bg-[#bfe37f] rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-4xl">🐾</span>
                                </div>
                                <p className="text-[#003451] font-serif font-bold text-xl uppercase tracking-widest">Lost in the Park?</p>
                            </motion.div>
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif text-[#003451] font-bold mb-4">Page Not Found</h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        It seems like the page you are looking for has wandered off. Don&apos;t worry, we can help you find your way back.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto px-8 py-4 bg-[#003451] text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#003451]/20 group"
                        >
                            <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            Back to Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-[#003451] border-2 border-[#003451]/10 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-sm text-gray-400 font-medium uppercase tracking-[0.2em]"
                >
                    DeePet Services &copy; {new Date().getFullYear()}
                </motion.div>
            </div>
        </div>
    );
}

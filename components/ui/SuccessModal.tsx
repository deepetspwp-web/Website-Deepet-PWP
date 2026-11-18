"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export function SuccessModal({
    isOpen,
    onClose,
    title = "Booking Request Sent!",
    message = "Thank you for choosing DeePet. Our team will contact you shortly to confirm your slot."
}: SuccessModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#bfe37f]/10 rounded-full blur-3xl -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#2894ba]/10 rounded-full blur-3xl -ml-16 -mb-16" />

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 bg-[#bfe37f]/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-[#133d39]" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif font-bold text-[#133d39]">
                                    {title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full bg-[#2894ba] hover:bg-[#1e7ca0] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#2894ba]/20 active:scale-95"
                            >
                                Got it, Thanks!
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

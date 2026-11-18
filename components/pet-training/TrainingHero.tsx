"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Check, Phone, Dog, Cat } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";
import { useContact } from "@/components/providers/useContact";

export function TrainingHero() {
    const router = useRouter();
    const { callHref } = useContact();
    const [formData, setFormData] = useState({
        petType: 'dog',
        name: '',
        phone: '',
        pincode: '',
        message: '',
        service: 'Dog Training'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const utmParams = useUtmParams();

    const handleSubmit = async () => {
        if (!formData.name || !formData.phone) {
            alert('Please fill in all mandatory fields (Name and Phone)');
            return;
        }

        if (formData.phone.replace(/\D/g, '').length < 10) {
            alert('Please enter a valid mobile number (at least 10 digits)');
            return;
        }

        if (!executeRecaptcha) {
            alert('reCAPTCHA not ready. Please try again.');
            return;
        }

        setIsSubmitting(true);
        try {
            const captchaToken = await executeRecaptcha('training_form');

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ...utmParams,
                    captchaToken,
                    source: 'Pet Training Page'
                }),
            });

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                const bookingId = resData.bookingId || resData.code || 'DEPWEB001';
                router.push(`/thank-you?bookingId=${encodeURIComponent(bookingId)}`);
            } else {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                alert(`Failed to send booking request: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            const message = error instanceof Error ? error.message : 'Please try again later.';
            alert(`An error occurred: ${message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-[calc(100vh-5.5rem)] flex items-center py-12 z-20 overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/heroimages/deepet.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {/* Trust Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/90 text-sm font-medium"
                        >
                            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                                <div className="flex -space-x-3 mr-3">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#133d39] overflow-hidden">
                                            <Image
                                                src={`/reviewsimages/unnamed (${i}).png`}
                                                alt={`User ${i}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                </div>
                                <span className="ml-1 font-semibold">(200) reviews | (300) reviews</span>
                            </div>
                        </motion.div>

                        {/* Headline & Subhead */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6">
                                Dog Training Services <br />
                                <span className="text-[#bfe37f]">Starting from ₹9,999</span>
                            </h1>
                            <p className="text-xl text-white/80 font-base max-w-lg mb-8 leading-relaxed">
                                Our professional training services are designed to help your dog develop good behavior, enhance their social skills, and strengthen the bond between you and your furry friend.
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-white font-medium mb-8 drop-shadow-md">
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div> Reliable</span>
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div> Safe</span>
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div> Loyalty</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="hidden sm:flex flex-wrap gap-4"
                        >
                            <a href={callHref} className="bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] px-8 py-3.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#bfe37f]/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                                <Phone className="w-5 h-5" /> Call Now
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Content: Reservation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full lg:w-1/3 ml-auto"
                    >
                        <div id="training-form" className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-[500px] ml-auto border border-white/20">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-2xl font-serif text-white font-bold text-center mb-1">Make A Reservation</h3>
                                <p className="text-zinc-300 text-center text-sm font-medium">Expert At-Home Dog Training</p>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="space-y-4">
                                    {/* Pet Type */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Select Pet Type</label>
                                        <div className="flex gap-4">
                                            {['dog', 'cat'].map((pet) => (
                                                <label key={pet} className="flex-1 cursor-pointer group relative">
                                                    <input
                                                        type="radio"
                                                        name="pet"
                                                        value={pet}
                                                        className="peer sr-only"
                                                        checked={formData.petType === pet}
                                                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                                                    />
                                                    <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-black/20 border border-white/10 peer-checked:bg-[#218dcc]/20 peer-checked:border-[#218dcc] transition-all">
                                                        {pet === 'dog' ? <Dog className="w-5 h-5 text-white peer-checked:text-[#218dcc]" /> : <Cat className="w-5 h-5 text-white peer-checked:text-[#218dcc]" />}
                                                        <span className="font-semibold text-sm text-white peer-checked:text-white capitalize transition-colors">{pet}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Your Name*</label>
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-sm placeholder:text-white/60"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    {/* Mobile No */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Your Mobile No*</label>
                                        <input
                                            type="tel"
                                            placeholder="Your Mobile No"
                                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-sm placeholder:text-white/60"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFormData({ ...formData, phone: value });
                                            }}
                                        />
                                    </div>

                                    {/* Pincode (Added) */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Pincode</label>
                                        <input
                                            type="text"
                                            placeholder="Pincode"
                                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-sm placeholder:text-white/60"
                                            value={formData.pincode}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Enter Your Message (Optional)</label>
                                        <textarea
                                            placeholder="Enter Your Message..."
                                            rows={2}
                                            className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-sm resize-none placeholder:text-white/60"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-[#bfe37f] to-[#bfe37f]/50 hover:from-[#bfe37f]/50 hover:to-[#bfe37f] text-[#133d39] rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

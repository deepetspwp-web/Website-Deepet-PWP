"use client";

import { useState } from "react";
import { Check, Dog, Cat, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";

export function BoardingHero() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        petType: 'dog',
        name: '',
        phone: '',
        pincode: '',
        message: '',
        service: 'Pet Boarding'
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
            const captchaToken = await executeRecaptcha('boarding_form');

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ...utmParams,
                    captchaToken,
                    source: 'Pet Boarding Page'
                }),
            });

            if (response.ok) {
                router.push('/thank-you');
            } else {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                alert(`Failed to send booking request: ${errorData.error}`);
            }
        } catch (error: unknown) {
            console.error('Error submitting form:', error);
            const message = error instanceof Error ? error.message : 'Please try again later.';
            alert(`An error occurred: ${message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-[calc(100vh-5.5rem)] flex items-center py-16 z-20 overflow-hidden">
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
                    <div className="w-full lg:w-1/2 space-y-8 text-white">
                        {/* Trust Strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center gap-6 text-sm font-medium"
                        >
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5">
                                <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#bfe37f]" /> Trustworthy</span>
                                <span className="flex items-center gap-1.5 ml-4"><Check className="w-4 h-4 text-[#bfe37f]" /> Safely</span>
                                <span className="flex items-center gap-1.5 ml-4"><Check className="w-4 h-4 text-[#bfe37f]" /> Loyalty</span>
                            </div>
                        </motion.div>

                        {/* Headline & Subhead */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-6">
                                Book Trusted <br />
                                <span className="text-[#bfe37f]">Pet Boarding Services ₹999</span>
                            </h1>
                            <p className="text-xl text-white/80 font-base max-w-lg mb-8 leading-relaxed">
                                Book Premium Pet Hostel for Your Dogs and Cats with Comfortable Stay, 24/7 Daycare, & Medical Facilities.
                            </p>

                            <div className="space-y-4 mb-8">
                                <p className="text-[#bfe37f] font-bold text-lg">Your Trusted Veterinary Dr. is Just a Call Away.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div>
                                        <span className="text-sm font-semibold">11k+ Home Visit Done</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div>
                                        <span className="text-sm font-semibold">22+ Years Experienced Doctor</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div>
                                        <span className="text-sm font-semibold">24/7 Care Available</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div>
                                        <span className="text-sm font-semibold">95% Positive Ratings</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-[#bfe37f] text-[#133d39] px-6 py-4 rounded-2xl flex items-center gap-4 w-fit shadow-xl"
                        >
                            <div className="flex text-yellow-600">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            </div>
                            <span className="font-bold">Trusted by Thousands of Pet Parents</span>
                        </motion.div>
                    </div>

                    {/* Right Content: Reservation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full lg:w-1/3 ml-auto"
                    >
                        <div id="boarding-form" className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-[500px] ml-auto border border-white/20">
                            <div className="p-6 border-b border-white/10 text-white">
                                <h3 className="text-2xl font-serif font-bold text-center mb-1">Make A Reservation</h3>
                                <p className="text-zinc-300 text-center text-sm font-medium">Premium Pet Hostel & Daycare</p>
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

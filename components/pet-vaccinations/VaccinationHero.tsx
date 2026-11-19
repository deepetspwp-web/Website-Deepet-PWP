"use client";

import { useState } from "react";
import { Check, Dog, Cat, Star, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";

export function VaccinationHero() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        petType: 'dog',
        name: '',
        phone: '',
        pincode: '',
        message: '',
        service: 'Pet Vaccination'
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

        setIsSubmitting(true);
        try {
            let captchaToken = 'dev-token';
            if (executeRecaptcha) {
                try {
                    captchaToken = await Promise.race([
                        executeRecaptcha('vaccination_form'),
                        new Promise<string>((_, reject) => setTimeout(() => reject(new Error('timeout')), 800))
                    ]);
                } catch (err) {
                    console.warn('reCAPTCHA fallback used:', err);
                }
            }

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ...utmParams,
                    captchaToken,
                    source: 'Pet Vaccination Page'
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
        <section className="relative min-h-[calc(100vh-5.5rem)] flex items-center py-16 z-20 overflow-hidden">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/heroimages/deepet.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent" />
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
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-[1.1] mb-6">
                                Book At-Home <br />
                                <span className="text-[#bfe37f]">Pet Vaccinations</span>
                            </h1>
                            <p className="text-xl text-white/80 font-base max-w-lg mb-8 leading-relaxed italic">
                                &quot;Be a Hero Today!&quot; - Protect your pets and help the community.
                            </p>

                            {/* Street Dog Campaign Card */}
                            <div className="relative group overflow-hidden bg-white text-[#003451] p-6 rounded-[2rem] mb-8 shadow-2xl border border-white/20">
                                <div className="absolute -top-4 -right-4 bg-[#bfe37f] p-8 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#bfe37f] rounded-2xl flex items-center justify-center shrink-0">
                                        <HeartHandshake className="w-8 h-8 text-[#003451]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black uppercase tracking-tight italic leading-tight mb-1">Impact Move 🐾</h3>
                                        <p className="text-sm font-bold text-gray-500 leading-snug">
                                            Book any of our service today & <span className="text-[#3893c5]">We&apos;ll Vaccinate a Street Dog Free</span> on Your Behalf!
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center gap-8 pt-4"
                        >
                            <div className="space-y-1">
                                <div className="flex text-[#bfe37f]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-sm font-bold text-white/60">Verified Vet Visit</span>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="space-y-1">
                                <div className="text-lg font-black text-white">FREE</div>
                                <span className="text-sm font-bold text-white/60">Health Checkup</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Reservation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full lg:w-1/3 ml-auto"
                    >
                        <div id="vaccination-form" className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-[500px] ml-auto border border-white/20">
                            <div className="p-6 border-b border-white/10 text-white">
                                <h3 className="text-2xl font-serif font-bold text-center mb-1">Make A Reservation</h3>
                                <p className="text-zinc-300 text-center text-sm font-medium">Doorstep Pet Vaccination Service</p>
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

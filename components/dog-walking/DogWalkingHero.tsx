"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Check, Phone, User } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";
import { useContact } from "@/components/providers/useContact";

export function DogWalkingHero() {
    const router = useRouter();
    const { callHref, whatsappHref: waHref } = useContact();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'male',
        city: '',
        pincode: '',
        message: '',
        service: 'Dog Walking'
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
            const captchaToken = await executeRecaptcha('dog_walking_form');

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    ...utmParams,
                    captchaToken,
                    source: 'Dog Walking Page'
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
        } catch (error: unknown) {
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
                                Dog Walking <br />
                                <span className="text-[#bfe37f]">Starting from ₹3500</span>
                            </h1>
                            <p className="text-xl text-white/80 font-base max-w-lg mb-8 leading-relaxed">
                                Walking the Walk, Wagging the Wag – We&apos;ve Got Your Pup&apos;s Back!
                            </p>

                            <div className="flex flex-wrap gap-4 text-sm text-white font-medium mb-8 drop-shadow-md">
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div> Trustworthy</span>
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-1 rounded-full"><Check className="w-3 h-3 text-[#133d39]" /></div> Safely</span>
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
                        <div id="reservation-form" className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-[500px] ml-auto border border-white/20">
                            <div className="p-6 border-b border-white/10">
                                <h3 className="text-2xl font-serif text-white font-bold text-center mb-1">Make A Reservation</h3>
                                <p className="text-zinc-300 text-center text-sm font-medium">Expert Dog Walkers Near You</p>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="space-y-4">
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

                                    {/* Gender (Male or Female) */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Male or Female</label>
                                        <div className="flex gap-4">
                                            {['male', 'female'].map((gender) => (
                                                <label key={gender} className="flex-1 cursor-pointer group relative">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value={gender}
                                                        className="peer sr-only"
                                                        checked={formData.gender === gender}
                                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                    />
                                                    <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-black/20 border border-white/10 peer-checked:bg-[#218dcc]/20 peer-checked:border-[#218dcc] transition-all">
                                                        <User className="w-5 h-5 text-white peer-checked:text-[#218dcc]" />
                                                        <span className="font-semibold text-sm text-white peer-checked:text-white capitalize transition-colors">{gender}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* City & Pincode (Added) */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">City</label>
                                            <input
                                                type="text"
                                                placeholder="City"
                                                className="w-full p-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-sm placeholder:text-white/60"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />
                                        </div>
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
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wider">Enter Your Message (Optional)</label>
                                        <textarea
                                            placeholder="Enter Your Message..."
                                            rows={3}
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

                                    {/* Mobile Only CTAs */}
                                    <div className="flex flex-row sm:hidden gap-3 mt-4">
                                        <a href={callHref} className="flex-1 bg-[#218dcc] hover:bg-[#1a76ab] text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg text-xs">
                                            <Phone className="w-4 h-4" /> Call Now
                                        </a>
                                        <a href={waHref} className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg text-xs">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.397-4.437 9.831-9.885 9.831m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

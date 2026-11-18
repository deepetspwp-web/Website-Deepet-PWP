"use client";

import { useState } from "react";
import { Dog, Cat, User, Phone, Mail, MessageSquare, PawPrint, Send, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";

export function ContactForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        petType: 'dog',
        breed: '',
        name: '',
        phone: '',
        email: '',
        message: '',
        source: 'Contact Us Page'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const utmParams = useUtmParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone) {
            alert('Please fill in your Name and Mobile Number');
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
                    captchaToken = await executeRecaptcha('contact_form');
                } catch (err) {
                    console.warn('reCAPTCHA execution fallback used:', err);
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
                    source: 'Contact Page Form'
                }),
            });

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                const bookingId = resData.bookingId || resData.code || 'DEPWEB001';
                router.push(`/thank-you?bookingId=${encodeURIComponent(bookingId)}`);
            } else {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                alert(`Failed to send request: ${errorData.error}`);
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
        <section className="py-10 lg:py-14 bg-slate-50/70 border-t border-slate-200/60 overflow-hidden" id="book-appointment">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 overflow-hidden border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 items-stretch">

                    {/* Left Form Sidebar (5 cols) */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-[#003451] via-[#0b3e5b] to-[#133d39] p-7 sm:p-9 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-[#bfe37f]/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#2894ba]/15 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative z-10 space-y-5">
                            <div className="p-3 bg-white/10 rounded-2xl w-fit backdrop-blur-md border border-white/10">
                                <PawPrint className="w-6 h-6 text-[#bfe37f]" />
                            </div>

                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#bfe37f]">Direct Booking</span>
                                <h2 className="text-2xl sm:text-3xl font-serif font-bold leading-tight mt-1 text-white">
                                    Send Us an Enquiry
                                </h2>
                                <p className="text-white/80 text-xs sm:text-sm mt-2 leading-relaxed">
                                    Fill out this quick form and our veterinary coordinator will get back to you within 15–30 minutes to confirm your visit.
                                </p>
                            </div>

                            <div className="space-y-3 pt-3 border-t border-white/10 text-xs sm:text-sm text-white/90">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#bfe37f] shrink-0" />
                                    <span>Same-Day Home Visits Available</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#bfe37f] shrink-0" />
                                    <span>Zero advance payment needed</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#bfe37f] shrink-0" />
                                    <span>Licensed Doctors with Mobile Kits</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-xs text-white/60">
                            Available 7 days a week • 8:00 AM to 10:00 PM
                        </div>
                    </div>

                    {/* Right Form Body (7 cols) */}
                    <div className="lg:col-span-7 p-6 sm:p-8 lg:p-9 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Pet Type Selector */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                    Select Pet Type
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, petType: 'dog' })}
                                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                                            formData.petType === 'dog'
                                                ? 'bg-[#003451] text-white border-[#003451] shadow-xs'
                                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    >
                                        <Dog className="w-4 h-4" />
                                        <span>Dog</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, petType: 'cat' })}
                                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                                            formData.petType === 'cat'
                                                ? 'bg-[#003451] text-white border-[#003451] shadow-xs'
                                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    >
                                        <Cat className="w-4 h-4" />
                                        <span>Cat</span>
                                    </button>
                                </div>
                            </div>

                            {/* Name & Phone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Your Name *
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#2894ba] focus:ring-2 focus:ring-[#2894ba]/20 text-xs sm:text-sm outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Mobile Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="9876543210"
                                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#2894ba] focus:ring-2 focus:ring-[#2894ba]/20 text-xs sm:text-sm outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email & Breed */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@email.com"
                                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#2894ba] focus:ring-2 focus:ring-[#2894ba]/20 text-xs sm:text-sm outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                        Pet Breed / Age
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.breed}
                                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                        placeholder="e.g. Golden Retriever, 2 yrs"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#2894ba] focus:ring-2 focus:ring-[#2894ba]/20 text-xs sm:text-sm outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Message / Symptoms */}
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Message or Symptoms (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Describe your pet's current health condition, required service, or preferred time..."
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#2894ba] focus:ring-2 focus:ring-[#2894ba]/20 text-xs sm:text-sm outline-none transition-all resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 px-6 rounded-xl bg-[#003451] hover:bg-[#133d39] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4 text-[#bfe37f]" />
                                    <span>{isSubmitting ? 'Submitting...' : 'Submit Booking Request'}</span>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

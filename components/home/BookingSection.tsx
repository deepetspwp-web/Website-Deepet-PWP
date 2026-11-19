"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Phone, MapPin, Calendar, Clock, Dog, Cat, Sparkles, CheckCircle2, ChevronRight, Star, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";
import { CITIES } from "@/lib/constants";

const benefits = [
    "Licensed & Background-Verified Veterinarians",
    "Comprehensive Physical Exam & Vitals Check",
    "Digital Prescription Sent to WhatsApp",
    "All Travel Charges Included in ₹199"
];

export function BookingSection() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        pincode: '',
        petType: 'dog',
        address: '',
        date: '',
        timeSlot: 'morning'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const utmParams = useUtmParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                        executeRecaptcha('booking_form'),
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
                    source: 'Booking Section'
                }),
            });

            if (response.ok) {
                const resData = await response.json().catch(() => ({}));
                const bookingId = resData.bookingId || resData.code || 'DEPWEB001';
                setFormData({
                    name: '',
                    phone: '',
                    city: '',
                    pincode: '',
                    petType: 'dog',
                    address: '',
                    date: '',
                    timeSlot: 'morning'
                });
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
        <section id="book" className="py-12 lg:py-16 relative overflow-hidden bg-slate-50/80">
            {/* Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2894ba]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#bfe37f]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 flex flex-col md:flex-row overflow-hidden items-stretch">

                        {/* Left Panel: High Trust Branding */}
                        <div className="md:w-[40%] bg-gradient-to-br from-[#003451] via-[#0b3e5b] to-[#133d39] relative overflow-hidden text-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
                            {/* Ambient Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#bfe37f]/15 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2894ba]/20 rounded-full blur-2xl pointer-events-none" />

                            <div className="relative z-10 space-y-5">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#bfe37f] text-xs font-bold uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Same-Day Home Visit</span>
                                </div>

                                <div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight mb-2">
                                        Schedule Your Pet&apos;s <span className="text-[#bfe37f]">Home Visit</span>
                                    </h3>
                                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                                        A licensed veterinary doctor arrives at your doorstep equipped with complete diagnostics.
                                    </p>
                                </div>

                                <div className="space-y-2.5 pt-1">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5 text-white/90 text-xs sm:text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-[#bfe37f] shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 mt-8 pt-5 border-t border-white/10 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#003451] overflow-hidden bg-slate-200">
                                            <Image
                                                src={`/reviewsimages/unnamed (${i}).png`}
                                                alt={`User ${i}`}
                                                fill
                                                sizes="32px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex text-amber-400 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-white/70 font-medium mt-0.5">5,000+ happy pets in Delhi NCR</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel: Re-imagined Booking Experience */}
                        <div className="md:w-[60%] p-6 sm:p-8 lg:p-9 bg-white flex flex-col justify-between">
                            <div>
                                {/* Header with Price Badge */}
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-100">
                                    <div>
                                        <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#003451]">Enter Pet & Slot Details</h4>
                                        <p className="text-slate-500 text-xs mt-0.5">Instant confirmation • No advance fee</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-slate-400 line-through mr-1.5">₹499</span>
                                        <span className="text-base sm:text-lg font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                            ₹199 Only
                                        </span>
                                    </div>
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {/* Pet Type Interactive Cards */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">Select Pet Type</label>
                                        <div className="grid grid-cols-3 gap-2.5">
                                            {[
                                                { type: 'dog', label: 'Dog', icon: Dog },
                                                { type: 'cat', label: 'Cat', icon: Cat },
                                                { type: 'other', label: 'Other', icon: Sparkles }
                                            ].map((pet) => {
                                                const Icon = pet.icon;
                                                const isSelected = formData.petType === pet.type;
                                                return (
                                                    <button
                                                        key={pet.type}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, petType: pet.type })}
                                                        className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                                            isSelected
                                                                ? "bg-[#003451] text-white border-[#003451] shadow-xs"
                                                                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                                        }`}
                                                    >
                                                        <Icon className="w-3.5 h-3.5" />
                                                        <span>{pet.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Name & Phone */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600">Your Full Name*</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Rahul Sharma"
                                                    className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium placeholder:text-slate-400"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                />
                                                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600">Phone Number*</label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    placeholder="10-digit mobile"
                                                    className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium placeholder:text-slate-400"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                                <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* City & Pincode */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600">City</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium text-slate-700 appearance-none"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                >
                                                    <option value="">Select City</option>
                                                    {CITIES.map(city => (
                                                        <option key={city.value} value={city.value}>{city.label}</option>
                                                    ))}
                                                </select>
                                                <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600">Pincode</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="6-digit pincode"
                                                    className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium placeholder:text-slate-400"
                                                    value={formData.pincode || ''}
                                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                />
                                                <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-600">Doorstep Address</label>
                                        <input
                                            type="text"
                                            placeholder="House No, Society / Street, Landmark..."
                                            className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium placeholder:text-slate-400"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>

                                    {/* Date & Time Slot */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600">Preferred Date</label>
                                            <div className="relative">
                                                <input
                                                    type="date"
                                                    className="w-full pl-8 pr-2.5 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium text-slate-700"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                />
                                                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-slate-600">Time Slot</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#003451] focus:bg-white outline-none transition-all font-medium text-slate-700 appearance-none"
                                                    value={formData.timeSlot}
                                                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                                                >
                                                    <option value="morning">Morning (9 AM - 12 PM)</option>
                                                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                                    <option value="evening">Evening (4 PM - 8 PM)</option>
                                                </select>
                                                <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit CTA */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#bfe37f] hover:bg-[#aee063] text-[#003451] text-xs sm:text-sm font-bold py-3 rounded-xl shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            <span>{isSubmitting ? 'Confirming...' : 'Confirm Doorstep Visit (₹199)'}</span>
                                            {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                                        </button>
                                        <p className="text-slate-400 text-[10px] mt-2 text-center font-medium">
                                            Pay after consultation • 100% money-back guarantee
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

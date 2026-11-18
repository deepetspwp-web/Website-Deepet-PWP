"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Check, Phone, Dog, Cat } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useUtmParams } from "@/lib/useUtmParams";
import { CITIES } from "@/lib/constants";
import { useContact } from "@/components/providers/useContact";

export function Hero() {

    const router = useRouter();
    const { callHref, whatsappHref: waHref } = useContact();
    const [formData, setFormData] = useState({
        petType: 'dog',
        service: 'General Consultation',
        name: '',
        phone: '',
        city: '',
        pincode: '',
        message: ''
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
                    captchaToken = await executeRecaptcha('hero_form');
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
                    source: 'Hero Section'
                }),
            });

            if (response.ok) {
                setFormData({
                    petType: 'dog',
                    service: 'General Consultation',
                    name: '',
                    phone: '',
                    city: '',
                    pincode: '',
                    message: ''
                });
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
        <section className="relative min-h-[calc(100dvh-4.5rem)] flex items-center py-6 lg:py-4 z-20 overflow-hidden">

            {/* Background with Overlay & Slideshow */}
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/heroimages/deepet.webp')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 z-10 w-full">
                <div className="grid grid-cols-1 gap-6 items-center lg:grid-cols-[1fr_400px] xl:grid-cols-[1.1fr_420px] lg:gap-x-8 lg:gap-y-2 xl:gap-y-4">

                    {/* Top: Trust strip + Heading */}
                    <div className="order-1 w-full space-y-3 lg:space-y-2.5 xl:space-y-3 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end">
                        {/* Trust Strip */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/90 text-xs sm:text-sm font-medium"
                        >
                            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">
                                <div className="flex -space-x-2 mr-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#133d39] overflow-hidden">
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
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />)}
                                </div>
                                <span className="ml-1 font-semibold text-xs sm:text-sm">5000+ Happy Pet Parents</span>
                            </div>
                        </motion.div>

                        {/* Heading */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-3xl sm:text-4xl lg:text-[2.25rem] xl:text-[2.85rem] font-serif text-white leading-[1.15]">
                                Professional Vet & <br />
                                <span className="text-[#bfe37f]">Pet Care at Your Home, <br />Just ₹199/-</span>
                            </h1>
                        </motion.div>
                    </div>

                    {/* Bottom: Subhead + CTAs */}
                    <div className="order-3 w-full space-y-3 lg:space-y-2.5 xl:space-y-3.5 lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start">
                        {/* Subhead */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="space-y-2 lg:space-y-2 xl:space-y-3"
                        >
                            <p className="text-sm sm:text-base xl:text-lg text-white/80 font-normal max-w-lg leading-relaxed">
                                No travel. No waiting. No stress for your pet.
                            </p>
                            {/* Price Anchor */}
                            <div className="flex flex-col items-start gap-1.5 sm:gap-2">
                                <div className="inline-flex items-center px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl bg-black/60 border border-[#bfe37f]/30 backdrop-blur-md shadow-lg">
                                    <span className="text-[#bfe37f] font-bold mr-2 text-xs sm:text-sm xl:text-base">Professional Home Consultation</span>
                                    <span className="text-white text-xs xl:text-sm border-l border-white/20 pl-2 ml-1">(All travel included)</span>
                                </div>
                                <div className="text-yellow-300 text-[11px] sm:text-xs font-bold bg-black/40 px-2.5 py-1 rounded-lg border border-yellow-300/20 tracking-wide uppercase flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    Services available only in Delhi NCR
                                </div>
                            </div>

                            {/* Trust Points */}
                            <div className="flex flex-wrap gap-2.5 sm:gap-3 xl:gap-4 text-xs xl:text-sm text-white font-medium drop-shadow-md pt-0.5">
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-0.5 rounded-full"><Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#133d39]" /></div> Licensed Vets</span>
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-0.5 rounded-full"><Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#133d39]" /></div> Insured</span>
                                <span className="flex items-center gap-1.5"><div className="bg-[#bfe37f] p-0.5 rounded-full"><Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#133d39]" /></div> Same-Day Visits</span>
                            </div>
                        </motion.div>

                        {/* Primary CTAs */}
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="hidden sm:flex flex-wrap gap-3 pt-0.5"
                        >

                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                                <a href={callHref} className="bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] px-6 py-2 xl:px-7 xl:py-2.5 rounded-full font-bold text-xs sm:text-sm xl:text-base transition-all transform hover:scale-105 shadow-lg shadow-[#bfe37f]/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <Phone className="w-4 h-4 xl:w-5 xl:h-5" /> Call Now
                                </a>
                                <a href={waHref} className="bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] px-6 py-2 xl:px-7 xl:py-2.5 rounded-full font-bold text-xs sm:text-sm xl:text-base transition-all transform hover:scale-105 shadow-lg shadow-[#bfe37f]/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <svg className="w-4 h-4 xl:w-5 xl:h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Booking Form */}
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="order-2 w-full lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center"
                    >
                        <div id="hero-book" className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl max-w-[420px] xl:max-w-[440px] ml-auto border border-white/20">
                            <div className="px-4 py-2.5 xl:px-5 xl:py-3 border-b border-white/10">
                                <h3 className="text-lg xl:text-xl font-serif text-white font-bold text-center mb-0.5">Book Appointment</h3>
                                <p className="text-zinc-300 text-center text-xs xl:text-sm font-medium">Professional Home Visits • Offers on Treatments</p>
                            </div>

                            <div className="p-3.5 xl:p-4 space-y-2.5 xl:space-y-3">
                                {/* Pet Type */}
                                <div>
                                    <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">Select Pet Type</label>
                                    <div className="flex gap-2.5">
                                        {['dog', 'cat'].map((pet) => (
                                            <label key={pet} className="flex-1 cursor-pointer group relative">
                                                <input
                                                    type="radio"
                                                    name="petType"
                                                    value={pet}
                                                    className="peer sr-only"
                                                    checked={formData.petType === pet}
                                                    onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                                                />
                                                <div className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-black/20 border border-white/10 peer-checked:bg-[#218dcc]/20 peer-checked:border-[#218dcc] transition-all">
                                                    {pet === 'dog' ? <Dog className="w-4 h-4 text-white peer-checked:text-[#218dcc]" /> : <Cat className="w-4 h-4 text-white peer-checked:text-[#218dcc]" />}
                                                    <span className="font-semibold text-xs xl:text-sm text-white peer-checked:text-white capitalize transition-colors">{pet}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 xl:space-y-2.5">
                                    {/* Service */}
                                    <div>
                                        <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">Service</label>
                                        <div className="relative">
                                            <select
                                                className="w-full py-1.5 px-3 xl:py-2 xl:px-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all appearance-none text-white text-xs xl:text-sm"
                                                value={formData.service}
                                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            >
                                                <option value="General Consultation" className="bg-zinc-900">General Consultation</option>
                                                <option value="Vaccination" className="bg-zinc-900">Vaccination</option>
                                                <option value="Boarding & Surgery" className="bg-zinc-900">Boarding & Surgery</option>
                                                <option value="Blood Test" className="bg-zinc-900">Blood Test</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name & Phone */}
                                    <div className="grid grid-cols-2 gap-2 xl:gap-2.5">
                                        <div>
                                            <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">Name*</label>
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full py-1.5 px-3 xl:py-2 xl:px-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-xs xl:text-sm placeholder:text-white/60"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">Phone*</label>
                                            <input
                                                type="tel"
                                                placeholder="Mobile"
                                                className="w-full py-1.5 px-3 xl:py-2 xl:px-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-xs xl:text-sm placeholder:text-white/60"
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormData({ ...formData, phone: value });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* City & Pincode */}
                                    <div className="grid grid-cols-2 gap-2 xl:gap-2.5">
                                        <div className="relative">
                                            <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">City</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full py-1.5 px-3 xl:py-2 xl:px-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all appearance-none text-white text-xs xl:text-sm"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                >
                                                    <option value="" className="bg-zinc-900">Select City</option>
                                                    {CITIES.map(city => (
                                                        <option key={city.value} value={city.value} className="bg-zinc-900">{city.label}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">Pincode</label>
                                            <input
                                                type="text"
                                                placeholder="Pincode"
                                                className="w-full py-1.5 px-3 xl:py-2 xl:px-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-xs xl:text-sm placeholder:text-white/60"
                                                value={formData.pincode}
                                                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-[11px] xl:text-xs font-semibold text-zinc-300 mb-1 uppercase tracking-wider">Message (Optional)</label>
                                        <textarea
                                            placeholder="Describe the problem..."
                                            rows={1}
                                            className="w-full py-1 px-3 xl:py-1.5 xl:px-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#218dcc]/50 focus:border-[#218dcc] transition-all text-white text-xs xl:text-sm resize-none placeholder:text-white/60"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full py-2.5 xl:py-3 px-4 bg-gradient-to-r from-[#bfe37f] to-[#bfe37f]/50 hover:from-[#bfe37f]/50 hover:to-[#bfe37f] text-[#133d39] rounded-xl font-bold text-xs xl:text-sm transition-all hover:scale-[1.01] active:scale-[0.99] mt-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isSubmitting ? 'Booking...' : 'Book Now & Get Up to 30% Discount'}
                                    </button>

                                    <div className="flex justify-center mt-1.5">
                                        <span className="animate-blink inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-0.5 text-[10px] xl:text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/30">
                                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                            Offer Closing Soon
                                        </span>
                                    </div>

                                    {/* Mobile Only CTAs */}
                                    <div className="flex flex-row sm:hidden gap-2.5 mt-2.5">
                                        <a href={callHref} className="flex-1 bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] px-3 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                                            <Phone className="w-3.5 h-3.5" /> Call Now
                                        </a>
                                        <a href={waHref} className="flex-1 bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] px-3 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                                            <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
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

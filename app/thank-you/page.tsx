'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Home, Copy, Check, MessageCircle, Phone, Calendar } from 'lucide-react';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get('bookingId') || searchParams.get('booking_id') || 'DEPWEB001';
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Track Lead event for Meta Pixel (Facebook Pixel) with the unique Booking ID
        if (typeof window !== 'undefined') {
            const win = window as unknown as { fbq?: (...args: unknown[]) => void; dataLayer?: unknown[] };
            if (typeof win.fbq === 'function') {
                win.fbq('track', 'Lead', {
                    content_name: 'Pet Consultation Booking',
                    booking_id: bookingId,
                    currency: 'INR',
                    value: 0,
                });
                console.log(`[Meta Pixel] Tracked Lead with Booking ID: ${bookingId}`);
            }

            // Google Tag Manager / Analytics dataLayer event
            if (Array.isArray(win.dataLayer)) {
                win.dataLayer.push({
                    event: 'lead_submission',
                    booking_id: bookingId,
                });
            }
        }
    }, [bookingId]);

    const handleCopy = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(bookingId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const whatsappMessage = encodeURIComponent(
        `Hi DeePets team! I just booked an in-home pet consultation. My Booking Reference is: ${bookingId}. Please confirm my slot!`
    );

    return (
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 max-w-lg w-full overflow-hidden text-center p-8 md:p-12 relative border border-slate-100">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-[#003451]/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#bfe37f]/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50/50">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bfe37f]/20 border border-[#bfe37f]/40 text-[#003451] text-xs font-bold uppercase tracking-wider mb-3">
                    <span>Booking Confirmed</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#003451] mb-2 tracking-tight">
                    Thank You!
                </h1>

                <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed">
                    Your pet consultation booking has been received. Our dedicated team will reach out to you shortly to confirm your visit.
                </p>

                {/* Unique Booking Code Badge */}
                <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 text-left">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Your Booking Reference
                            </span>
                            <p className="text-xl md:text-2xl font-mono font-extrabold text-[#003451] tracking-wide mt-0.5">
                                {bookingId}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                            title="Copy Booking ID"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-emerald-700">Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#95c93d]" />
                        <span>Save this code for faster support &amp; consultation tracking.</span>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 w-full">
                    <a
                        href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full group bg-[#25D366] hover:bg-[#20ba59] text-white text-sm md:text-base font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Chat on WhatsApp with Booking ID</span>
                    </a>

                    <Link
                        href="/"
                        className="w-full bg-[#003451] hover:bg-[#00283d] text-white text-sm md:text-base font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#003451]/15 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Phone className="w-3.5 h-3.5 text-[#003451]" />
                    <span>Need immediate help? Call us at <a href="tel:+919876543210" className="text-[#003451] font-bold hover:underline">+91 98765 43210</a></span>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
            <Suspense fallback={
                <div className="text-center text-slate-500 font-medium">
                    Loading confirmation...
                </div>
            }>
                <ThankYouContent />
            </Suspense>
        </div>
    );
}

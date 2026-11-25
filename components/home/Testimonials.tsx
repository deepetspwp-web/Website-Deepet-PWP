"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Star, Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoStory {
    id: number;
    src: string;
    poster: string;
    title: string;
    pet: string;
    location: string;
    rating: number;
}

// Compressed (~3-7 MB each). Cards show only the poster image; a video file
// is downloaded only when a visitor taps a card, to keep bandwidth low.
const VIDEO_TESTIMONIALS: VideoStory[] = [
    { id: 1, src: "/videos/img_1834.mp4", poster: "/videos/img_1834.jpg", title: "Home Vet Visit & Routine Checkup", pet: "Dog Care", location: "Gurgaon", rating: 4.9 },
    { id: 2, src: "/videos/img_1844.mp4", poster: "/videos/img_1844.jpg", title: "Friendly Vet at Our Home", pet: "Furry Friend", location: "Faridabad", rating: 4.8 },
    { id: 3, src: "/videos/img_1847.mp4", poster: "/videos/img_1847.jpg", title: "Professional Veterinary Service", pet: "Happy Dog", location: "Noida", rating: 4.7 },
    { id: 4, src: "/videos/img_1848.mp4", poster: "/videos/img_1848.jpg", title: "Safe & Relaxed Home Visit", pet: "Dog Care", location: "Delhi", rating: 4.8 },
];

export function Testimonials() {
    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const modalVideoRef = useRef<HTMLVideoElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = direction === "left" ? -460 : 460;
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Keyboard navigation in modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeVideoIndex === null) return;
            if (e.key === "Escape") {
                setActiveVideoIndex(null);
            } else if (e.key === "ArrowLeft") {
                setActiveVideoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : VIDEO_TESTIMONIALS.length - 1));
            } else if (e.key === "ArrowRight") {
                setActiveVideoIndex((prev) => (prev !== null && prev < VIDEO_TESTIMONIALS.length - 1 ? prev + 1 : 0));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeVideoIndex]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (activeVideoIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [activeVideoIndex]);

    return (
        <section id="reviews" className="py-12 lg:py-16 bg-slate-50/70 border-t border-slate-200/60 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                        <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>Real Video Stories</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#003451] tracking-tight">
                        Loved by Real Pet Parents Across Delhi NCR
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                        Watch real doorstep visit stories captured by pet parents during our home consultations and treatments.
                    </p>

                    {/* Google Rating Trust Badge */}
                    <div className="pt-1 flex justify-center">
                        <div className="inline-flex items-center gap-2.5 bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-xs">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-[#003451]">4.8 out of 5 Rating</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-500 font-medium">Verified Pet Parents</span>
                        </div>
                    </div>
                </div>

                {/* Carousel Navigation Bar */}
                <div className="flex items-center justify-between mb-5 px-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Swipe or click to watch ({VIDEO_TESTIMONIALS.length} Stories)</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => scroll("left")}
                            aria-label="Scroll left"
                            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 shadow-xs hover:bg-[#003451] hover:text-white hover:border-[#003451] transition-all flex items-center justify-center text-slate-700 cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scroll("right")}
                            aria-label="Scroll right"
                            className="w-9 h-9 rounded-full bg-white border border-slate-200/80 shadow-xs hover:bg-[#003451] hover:text-white hover:border-[#003451] transition-all flex items-center justify-center text-slate-700 cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* 9:16 Video Cards Scroll Strip */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {VIDEO_TESTIMONIALS.map((story, index) => (
                        <div
                            key={story.id}
                            onClick={() => setActiveVideoIndex(index)}
                            className="shrink-0 w-[155px] sm:w-[180px] md:w-[195px] aspect-[9/16] rounded-2xl overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 snap-center cursor-pointer group bg-slate-900 border border-slate-200/80"
                        >
                            {/* Native Video Element for 9:16 Preview */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={story.poster}
                                alt={story.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Top Gradient & Realistic Rating Badge in range 4.3 - 4.9 */}
                            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 via-black/30 to-transparent p-2.5 pointer-events-none flex items-start justify-between">
                                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/20">
                                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                                    <span>{story.rating.toFixed(1)}</span>
                                </span>

                                <span className="text-[10px] font-semibold text-white/80 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-full">
                                    #{story.id}
                                </span>
                            </div>

                            {/* Center Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center text-[#003451] group-hover:scale-110 group-hover:bg-[#bfe37f] transition-all duration-300">
                                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                                </div>
                            </div>

                            {/* Bottom Gradient & Info Details */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-10 pointer-events-none text-white">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-[#bfe37f] mb-0.5">
                                    <CheckCircle2 className="w-2.5 h-2.5" />
                                    <span>{story.pet}</span>
                                </div>
                                <h3 className="text-[11px] font-serif font-bold leading-tight line-clamp-2 text-white/95">
                                    {story.title}
                                </h3>
                                <p className="text-[10px] text-white/70 mt-1 flex items-center gap-1">
                                    <span>📍</span> {story.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-10">
                    <Link
                        href="/#hero-book"
                        className="inline-flex items-center gap-2 bg-[#003451] hover:bg-[#133d39] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        <span>Experience Doorstep Care for Your Pet</span>
                        <ArrowRight className="w-4 h-4 text-[#bfe37f]" />
                    </Link>
                </div>

            </div>

            {/* Immersive 9:16 Video Player Modal */}
            <AnimatePresence>
                {activeVideoIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                        onClick={() => setActiveVideoIndex(null)}
                    >
                        {/* Modal Box */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between"
                        >
                            {/* Video */}
                            <video
                                ref={modalVideoRef}
                                src={VIDEO_TESTIMONIALS[activeVideoIndex].src}
                                poster={VIDEO_TESTIMONIALS[activeVideoIndex].poster}
                                preload="auto"
                                autoPlay
                                playsInline
                                controls
                                muted={isMuted}
                                className="w-full h-full object-cover"
                            />

                            {/* Top Bar Overlay */}
                            <div className="absolute top-0 inset-x-0 p-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-20 pointer-events-none">
                                <div className="text-white">
                                    <p className="text-xs font-bold text-[#bfe37f] flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        {VIDEO_TESTIMONIALS[activeVideoIndex].pet}
                                        <span className="text-amber-400 font-bold ml-1">★ {VIDEO_TESTIMONIALS[activeVideoIndex].rating.toFixed(1)}</span>
                                    </p>
                                    <p className="text-[11px] text-white/80">
                                        {VIDEO_TESTIMONIALS[activeVideoIndex].location} • Story {activeVideoIndex + 1} of {VIDEO_TESTIMONIALS.length}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 pointer-events-auto">
                                    <button
                                        type="button"
                                        onClick={() => setIsMuted(!isMuted)}
                                        aria-label="Toggle mute"
                                        className="w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                                    >
                                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveVideoIndex(null)}
                                        aria-label="Close video"
                                        className="w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Arrows on Modal */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : VIDEO_TESTIMONIALS.length - 1));
                                }}
                                aria-label="Previous video"
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-colors z-20 cursor-pointer"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveVideoIndex((prev) => (prev !== null && prev < VIDEO_TESTIMONIALS.length - 1 ? prev + 1 : 0));
                                }}
                                aria-label="Next video"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-colors z-20 cursor-pointer"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import { useThemeOptions } from "@/components/providers/ThemeOptionsProvider";
import { findSocial } from "@/lib/cms/format";
import type { MediaImage } from "@/lib/cms/types";

export function InstagramGallery({ images }: { images: MediaImage[] }) {
    const theme = useThemeOptions();
    const instagram = findSocial(theme?.socialMedia, "Instagram");
    const instagramUrl = instagram?.url;
    const instagramHandle = instagramUrl
        ? `@${instagramUrl.replace(/\/$/, "").split("/").pop()}`
        : null;

    return (
        <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#003451]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#bfe37f]/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    {instagramHandle && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-sm font-bold mb-6 shadow-lg">
                            <Instagram className="w-4 h-4" />
                            <span>{instagramHandle}</span>
                        </div>
                    )}
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#003451] mb-4">
                        Our <span className="text-[#bfe37f]">Gallery</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Glimpses of happy pets and dedicated vet visits from the DeePet Services team.
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                {images.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No gallery images yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {images.map((img, idx) => (
                            <motion.div
                                key={`${img.mediaItemUrl}-${idx}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group shadow-sm hover:shadow-xl transition-shadow"
                            >
                                <Image
                                    src={img.mediaItemUrl}
                                    alt={img.altText || "DeePet Services gallery image"}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Follow CTA */}
                {instagramUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <Instagram className="w-5 h-5" />
                            Follow Us on Instagram
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

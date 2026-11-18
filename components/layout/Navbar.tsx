"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeOptions } from "@/components/providers/ThemeOptionsProvider";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
        label: "Services",
        href: "/#services",
        dropdown: [
            { label: "Vet Doctor", href: "/veterinary-doctor" },
            { label: "Pet Boarding", href: "/pet-boarding" },
            { label: "Pet Surgery", href: "/pet-surgery" },
            { label: "Online Vet Consultation", href: "/online-vet-consultation" },
            { label: "Pet Vaccinations", href: "/pet-vaccinations" },
            { label: "View All Services", href: "/services" },
        ]
    },
    {
        label: "Location",
        href: "/#locations",
        dropdown: [
            { label: "Delhi", href: "/deepet-services-delhi" },
            { label: "Noida", href: "/deepet-services-noida" },
            { label: "Gurgaon", href: "/deepet-services-gurgaon" },
            { label: "Ghaziabad", href: "/deepet-services-ghaziabad" },
        ]
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
    { label: "Our Blogs", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const theme = useThemeOptions();
    const siteTitle = theme?.company.siteTitle || "DeePet Services";
    const logoSrc = theme?.company.logoVar1 || "/deepetservices-logo.png";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <nav
                className={cn(
                    "sticky top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out border-b",
                    scrolled
                        ? "bg-white/95 backdrop-blur-md py-2 shadow-md border-gray-200/70"
                        : "bg-white py-2.5 lg:py-3 border-gray-100"
                )}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="relative z-50 flex items-center gap-2">
                            <div className="relative h-10 sm:h-11 lg:h-12 w-44 sm:w-48 lg:w-52">
                                <Image
                                    src={logoSrc}
                                    alt={siteTitle}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Link>

                        {/* Desktop nav links */}
                        <div className="hidden lg:flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <div
                                    key={link.label}
                                    className="relative group"
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-1 text-[15px] font-medium text-[#003451]/80 hover:text-[#003451] transition-colors py-2"
                                    >
                                        {link.label}
                                        {link.dropdown && (
                                            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", activeDropdown === link.label && "rotate-180")} />
                                        )}
                                    </Link>

                                    {/* Desktop Dropdown */}
                                    {link.dropdown && (
                                        <AnimatePresence>
                                            {activeDropdown === link.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl py-3 border border-gray-100 overflow-hidden"
                                                >
                                                    {link.dropdown.map((item) => (
                                                        <Link
                                                            key={item.label}
                                                            href={item.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#3893c5]/10 hover:text-[#003451] transition-colors"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Right CTA */}
                        <div className="hidden lg:flex items-center">
                            <Link
                                href="/#book"
                                className="bg-[#bfe37f] hover:bg-[#a9d663] text-[#133d39] px-6 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-lg shadow-[#bfe37f]/20"
                            >
                                Schedule a Visit
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "lg:hidden relative z-50 p-2 rounded-full transition-colors",
                                // The sticky nav stays white above the dark off-canvas, so the
                                // icon must stay dark in both states to remain visible.
                                "text-[#003451] hover:bg-[#003451]/5"
                            )}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Nav Overlay - Moved outside nav to fix positioning with backdrop-filter */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-[#003451] lg:hidden pt-24 pb-12 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-2">
                            {NAV_LINKS.map((link) => (
                                <div key={link.label} className="border-b border-white/10 last:border-0">
                                    <div
                                        className="flex items-center justify-between py-4"
                                        onClick={() => {
                                            if (link.dropdown) {
                                                setActiveDropdown(activeDropdown === link.label ? null : link.label);
                                            } else {
                                                setIsOpen(false);
                                            }
                                        }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-xl font-medium text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                        {link.dropdown && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveDropdown(activeDropdown === link.label ? null : link.label);
                                                }}
                                                className="p-2"
                                            >
                                                <ChevronDown className={cn("h-6 w-6 text-white/70 transition-transform", activeDropdown === link.label && "rotate-180")} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Mobile Dropdown */}
                                    {link.dropdown && (
                                        <motion.div
                                            initial={false}
                                            animate={{ height: activeDropdown === link.label ? "auto" : 0, opacity: activeDropdown === link.label ? 1 : 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-col gap-3 pb-4 pl-4">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-white/70 hover:text-white transition-colors py-1"
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                            <div className="mt-8">
                                <Link
                                    href="/#book"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full text-center rounded-full bg-[#bfe37f] px-6 py-4 text-lg font-bold text-[#133d39] shadow-xl"
                                >
                                    Schedule a Visit
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}


"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Option {
    value: string;
    label: string;
}

interface SearchableSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
}

export function SearchableSelect({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    className,
    icon
}: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(search.toLowerCase()) ||
        option.value.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 pl-3.5 pr-10 py-3.5 bg-gray-50 rounded-xl border-none ring-1 ring-gray-200 cursor-pointer hover:ring-[#003451]/30 transition-all font-medium text-gray-700"
            >
                {icon && <span className="text-gray-400">{icon}</span>}
                <span className={cn("truncate", !selectedOption && "text-gray-400")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-[100] w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        <div className="p-2 border-b border-gray-100 flex items-center gap-2 bg-white">
                            <Search className="w-4 h-4 text-[#003451] ml-2" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search pincode..."
                                className="w-full bg-transparent border-none outline-none py-2 text-sm font-semibold text-[#003451] placeholder:text-gray-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="max-h-[240px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent bg-white">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3 text-sm font-semibold cursor-pointer transition-colors border-b border-gray-50 last:border-0",
                                            value === option.value ? "bg-[#003451] text-white" : "text-[#003451] hover:bg-gray-50"
                                        )}
                                    >
                                        <span>{option.label}</span>
                                        {value === option.value && <Check className="w-4 h-4" />}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm italic">
                                    No results found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

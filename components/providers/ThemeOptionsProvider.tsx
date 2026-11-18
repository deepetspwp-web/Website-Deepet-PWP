"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ThemeOptions } from "@/lib/wp/types";

const ThemeOptionsContext = createContext<ThemeOptions | null>(null);

export function ThemeOptionsProvider({
    value,
    children,
}: {
    value: ThemeOptions | null;
    children: ReactNode;
}) {
    return (
        <ThemeOptionsContext.Provider value={value}>
            {children}
        </ThemeOptionsContext.Provider>
    );
}

export function useThemeOptions(): ThemeOptions | null {
    return useContext(ThemeOptionsContext);
}

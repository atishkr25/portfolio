"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { LenisProvider } from "@/providers/LenisProvider";

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <LenisProvider>
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
            >
                {children}
            </NextThemesProvider>
        </LenisProvider>
    );
}

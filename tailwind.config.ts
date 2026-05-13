import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        flyAround: "flyAround 4s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rotate: "rotate 10s linear infinite",
        "glass-flash": "glass-flash 3s infinite linear",
      },
      keyframes: {
        "glass-flash": {
          "0%": { left: "-100%" },
          "25%": { left: "100%" },
          "50%": { left: "100%" },
          "75%": { left: "100%" },
          "100%": { left: "100%" }, // Stay off screen for the rest
        },
        flyAround: {
          "0%": {
            transform: "translate(-50%, -50%) rotate(0deg)",
            top: "80%",
            left: "50%",
          },
          "25%": {
            top: "30%",
            left: "80%",
            transform: "rotate(45deg)",
          },
          "50%": {
            top: "10%",
            left: "50%",
            transform: "rotate(90deg)",
          },
          "75%": {
            top: "30%",
            left: "20%",
            transform: "rotate(135deg)",
          },
          "100%": {
            top: "80%",
            left: "50%",
            transform: "rotate(180deg)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10) translateZ(0)" },
          "100%": { transform: "rotate(-360deg) scale(10) translateZ(0)" },
        },
      },
    },
    screens: {
      // "mobile-s": "320px",
      // "mobile-m": "375px",
      // "mobile-l": "425px",
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

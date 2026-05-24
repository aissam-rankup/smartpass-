import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        coral: {
          DEFAULT: "var(--color-coral)",
          light: "var(--color-coral-light)",
          dark: "var(--color-coral-dark)",
        },
        teal: {
          DEFAULT: "var(--color-teal)",
          light: "var(--color-teal-light)",
          mid: "var(--color-teal-mid)",
        },
        sand: "var(--color-sand)",
        stone: "var(--color-stone)",
        charcoal: "var(--color-charcoal)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        "dark-bg": "var(--color-dark-bg)",
        "dark-surface": "var(--color-dark-surface)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        background: "var(--color-sand)",
        foreground: "var(--color-charcoal)",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive", "sans-serif"],
        headline: ["var(--font-display)", "cursive", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
      },
      fontSize: {
        hero: ["64px", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "4xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "3xl": ["36px", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "2xl": ["28px", { lineHeight: "1.2" }],
        xl: ["22px", { lineHeight: "1.3" }],
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

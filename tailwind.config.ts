import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#ffffff",
        foreground: "#1f2937",
        // New Premium Color Palette
        primary: {
          DEFAULT: "#8b5cf6", // vibrant purple
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#8b5cf6",
          600: "#7c3aed",
          900: "#581c87",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#10b981", // emerald green
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          900: "#064e3b",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#06b6d4", // cyan (kept for specific use cases)
          50: "#ecfeff",
          100: "#cffafe",
          500: "#06b6d4",
          600: "#0891b2",
          900: "#164e63",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#10b981", // emerald green
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          900: "#064e3b",
        },
        destructive: {
          DEFAULT: "#ef4444", // red
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          900: "#7f1d1d",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f8fafc", // very light gray
          foreground: "#64748b", // slate
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
        "gradient-success": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(139, 92, 246, 0.1)",
        "glass-hover": "0 12px 40px 0 rgba(139, 92, 246, 0.15)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

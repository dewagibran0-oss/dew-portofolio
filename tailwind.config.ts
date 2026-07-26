// tailwind.config.ts
import type { Config } from "tailwindcss";



const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0C0A09",
        navy: "#1C1917",
        primary: "#8C2F39", // Maroon
        secondary: "#C94F5D", // Maroon terang (dark mode)
        accent: "#6D2430", // Maroon dalam
        whiteSoft: "#F5F0EB",
        ivory: "#FAF7F2",
        maroon: "#8C2F39",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;
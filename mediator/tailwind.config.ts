import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./views/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        yellow: {
          100: "#FDF924",
          80: "rgba(253, 249, 36, 0.80)",
          72: "rgba(253, 249, 36, 0.72)",
          50: "rgba(253, 249, 36, 0.50)",
          32: "rgba(253, 249, 36, 0.32)",
          16: "rgba(253, 249, 36, 0.16)",
          12: "rgba(253, 249, 36, 0.12)",
          8: "rgba(253, 249, 36, 0.08)",
          4: "rgba(253, 249, 36, 0.04)",
        },

        white: {
          100: "#FAFCFF",
          80: "rgba(250, 252, 255, 0.80)",
          72: "rgba(250, 252, 255, 0.72)",
          50: "rgba(250, 252, 255, 0.50)",
          32: "rgba(250, 252, 255, 0.32)",
          16: "rgba(250, 252, 255, 0.16)",
          12: "rgba(250, 252, 255, 0.12)",
          8: "rgba(250, 252, 255, 0.08)",
          4: "rgba(250, 252, 255, 0.04)",
        },

        black: {
          100: "#0C0F18",
          80: "rgba(12, 15, 24, 0.80)",
          72: "rgba(12, 15, 24, 0.72)",
          50: "rgba(12, 15, 24, 0.50)",
          32: "rgba(12, 15, 24, 0.32)",
          16: "rgba(12, 15, 24, 0.16)",
          12: "rgba(12, 15, 24, 0.12)",
          8: "rgba(12, 15, 24, 0.08)",
          4: "rgba(12, 15, 24, 0.04)",
        },

        blue: {
          100: "#005fb5",
          80: "rgba(0, 95, 181, 0.80)",
          72: "rgba(0, 95, 181, 0.72)",
          50: "rgba(0, 95, 181, 0.50)",
          32: "rgba(0, 95, 181, 0.32)",
          16: "rgba(0, 95, 181, 0.16)",
          12: "rgba(0, 95, 181, 0.12)",
          8: "rgba(0, 95, 181, 0.08)",
          4: "rgba(0, 95, 181, 0.04)",
        },
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
} satisfies Config;

export default config;

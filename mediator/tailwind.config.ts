import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

export default config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

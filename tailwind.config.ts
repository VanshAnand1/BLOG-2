import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightgray: "#4D5061",
        zomp: "#619B8A",
        teagreen: "#C5E6A6",
        sunset: "#F2D0A4",
        periwinkle: "#A7ABDD",
        navy: "#2B3A42",
      },
    },
  },
} satisfies Config;

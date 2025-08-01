import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      main: ["main", "sans-serif"],
      "main-sans": ["main-sans", "sans-serif"],
      spray: ["spray", "sans-serif"],
    }, // 扩展尺寸主题
  },
  plugins: [],
} satisfies Config;

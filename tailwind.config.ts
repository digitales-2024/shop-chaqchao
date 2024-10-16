import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        commingSoon: ["var(--font-coming-soon)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "chaqchao-primary": "#70320C",
        "chaqchao-secondary": "#D78428",
        "chaqchao-gray": "#7E8A97",
        "chaqchao-white": "#FAFAFA",
      },
    },
  },
  plugins: [],
};
export default config;

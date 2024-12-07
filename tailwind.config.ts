import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        commingSoon: ["var(--font-coming-soon)"],
        nunito: ["var(--font-nunito-variable)"],
        pacifico: ["var(--font-pacifico)"],
      },
      colors: {
        textColor: "hsl(var(--text))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        izipay: {
          DEFAULT: "hsl(var(--izipay))",
          foreground: "hsl(var(--izipay-foreground))",
        },
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
        terciary: {
          DEFAULT: "hsl(var(--terciary))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        tada: "tada 1s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        gradient: "gradient 10s ease-in-out infinite",
        "background-position-spin":
          "background-position-spin 3000ms infinite alternate",
        meteor: "meteor 5s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-100vh)",
            opacity: "0",
          },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        tada: {
          "0%": {
            transform: "scale(1)",
          },
          "10%": {
            transform: "scale(0.9) rotate(-3deg)",
          },
          "20%": {
            transform: "scale(0.9) rotate(-3deg)",
          },
          "30%": {
            transform: "scale(1.1) rotate(3deg)",
          },
          "40%": {
            transform: "scale(1.1) rotate(-3deg)",
          },
          "50%": {
            transform: "scale(1.1) rotate(3deg)",
          },
          "60%": {
            transform: "scale(1.1) rotate(-3deg)",
          },
          "70%": {
            transform: "scale(1.1) rotate(3deg)",
          },
          "80%": {
            transform: "scale(1.1) rotate(-3deg)",
          },
          "90%": {
            transform: "scale(1.1) rotate(3deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0)",
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
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

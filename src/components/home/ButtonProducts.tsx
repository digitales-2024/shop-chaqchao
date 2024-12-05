"use client";

import {
  motion,
  type AnimationProps,
  type HTMLMotionProps,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ButtonProductsProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const ButtonProducts = React.forwardRef<HTMLDivElement, ButtonProductsProps>(
  ({ children, href, className, ...props }, ref) => {
    return (
      <Link
        href={href}
        className="group/products transition-all duration-300 hover:scale-105"
      >
        <motion.div
          ref={ref}
          {...animationProps}
          {...props}
          className={cn(
            "relative rounded-full px-10 py-6 backdrop-blur-xl transition-shadow duration-300 ease-in-out",
            className,
          )}
        >
          <span
            className="relative inline-flex size-full items-center justify-center gap-2 text-xl font-black uppercase tracking-wide text-primary dark:font-light"
            style={{
              maskImage:
                "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
            }}
          >
            {children}
            <span className="aspect-square shrink-0 -rotate-45 rounded-full bg-primary-foreground p-2 transition-all duration-300 group-hover/products:rotate-0">
              <ArrowRight className="size-4" strokeWidth={4} />
            </span>
          </span>
          <span
            style={{
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              maskComposite: "exclude",
            }}
            className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
          ></span>
        </motion.div>
      </Link>
    );
  },
);

ButtonProducts.displayName = "ButtonProducts";

export default ButtonProducts;

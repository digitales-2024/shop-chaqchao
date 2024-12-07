"use client";
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions,
} from "framer-motion";
import { ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

interface InViewProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  className?: string;
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  className,
  viewOptions,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

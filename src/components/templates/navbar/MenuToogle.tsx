"use client";
import { useOpenMenu } from "@/hooks/use-open-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const MenuToogle = () => {
  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const handleHoverButton = (index: number | null) => {
    setElementFocused(index);
  };
  const { open, onOpenChange } = useOpenMenu();

  return (
    <div
      className={cn("flex flex-row gap-2", {
        "flex-col-reverse": open,
      })}
      onMouseLeave={() => {
        handleHoverButton(null);
      }}
    >
      <div
        className="relative inline-flex aspect-square size-16 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full"
        key="menu-toggle"
        onMouseEnter={() => handleHoverButton(1)}
      >
        <button
          className="group inline-flex size-full items-center justify-center rounded-full"
          aria-pressed={open}
          onClick={onOpenChange}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="pointer-events-none h-6 w-6 fill-current"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="ease-[cubic-bezier(.5,.85,.25,1.1)] origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
              y="8"
              width="9"
              height="1"
              rx="1"
            ></rect>
            <rect
              className="ease-[cubic-bezier(.5,.85,.25,1.8)] origin-center transition-all duration-300 group-[[aria-pressed=true]]:rotate-45"
              y="7"
              width="16"
              height="1"
              rx="1"
            ></rect>
            <rect
              className="ease-[cubic-bezier(.5,.85,.25,1.1)] origin-center translate-y-[5px] transition-all duration-300 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[135deg]"
              y="7"
              width="9"
              height="1"
              rx="1"
            ></rect>
          </svg>
        </button>
        <AnimatePresence>
          {elementFocused === 1 && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-0 left-0 right-0 top-0 -z-10 rounded-full bg-neutral-200"
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.95 }}
              layout={true}
              layoutId="focused-element"
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

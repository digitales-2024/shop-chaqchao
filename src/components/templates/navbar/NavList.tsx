"use client";
import { useOpenMenu } from "@/hooks/use-open-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CartSheet } from "@/components/cart/CartSheet";

import { cn } from "@/lib/utils";

import { SearchBar } from "./SearchBar";
import { UserLogin } from "./UserLogin";

export function NavList() {
  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const dataButtons = [
    { label: "Search", component: <SearchBar /> },
    { label: "Login", component: <UserLogin /> },
    { label: "Cart", component: <CartSheet /> },
  ];
  const handleHoverButton = (index: number | null) => {
    setElementFocused(index);
  };

  const { open } = useOpenMenu();

  return (
    <div
      className={cn("flex flex-row gap-2", {
        "flex-col-reverse": open,
      })}
      onMouseLeave={() => {
        handleHoverButton(null);
      }}
    >
      {dataButtons.map((button, index) => (
        <div
          className="relative inline-flex aspect-square size-16 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full"
          key={button.label}
          onMouseEnter={() => handleHoverButton(index)}
        >
          {button.component}
          <AnimatePresence>
            {elementFocused === index && (
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
      ))}
    </div>
  );
}

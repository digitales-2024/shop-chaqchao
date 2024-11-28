"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { CartSheet } from "@/components/cart/CartSheet";

import { SearchBar } from "./SearchBar";
import { UserLogin } from "./UserLogin";

const dataButtons = [
  { label: "Search", component: <SearchBar /> },
  { label: "Login", component: <UserLogin /> },
  { label: "Cart", component: <CartSheet /> },
];
export function NavList() {
  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const handleHoverButton = (index: number | null) => {
    setElementFocused(index);
  };
  return (
    <div
      className="flex flex-col gap-2 sm:flex-row"
      onMouseLeave={() => {
        handleHoverButton(null);
      }}
    >
      {dataButtons.map((button, index) => (
        <div
          className="relative inline-flex w-fit whitespace-nowrap rounded text-sm font-medium"
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

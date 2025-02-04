"use client";

import { useOpenMenu } from "@/hooks/use-open-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const MenuList = () => {
  const t = useTranslations("navbar");

  const dataButtons = [
    { label: t("products"), href: "/categories" },
    { label: t("classes"), href: "/workshops" },
  ];
  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const handleHoverLink = (index: number | null) => {
    setElementFocused(index);
  };

  const { open } = useOpenMenu();
  return (
    <nav
      className={cn("flex flex-row items-center justify-center gap-x-9", {
        "flex-col items-end": open,
      })}
      onMouseLeave={() => {
        handleHoverLink(null);
      }}
    >
      {dataButtons.map((link, index) => (
        <Link
          href={link.href}
          className={cn(
            "relative inline-flex w-auto justify-center whitespace-nowrap rounded p-4 text-center text-2xl font-normal lowercase transition-all duration-300 hover:font-bold",
            {
              "text-end uppercase": open,
            },
          )}
          key={link.label}
          onMouseEnter={() => handleHoverLink(index)}
          type="button"
        >
          {link.label}
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
        </Link>
      ))}
    </nav>
  );
};

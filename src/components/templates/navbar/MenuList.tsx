"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

export const MenuList = () => {
  const t = useTranslations("navbar");

  const dataButtons = [
    { label: t("products"), href: "/categories" },
    { label: t("classes"), href: "/class-register" },
  ];
  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const handleHoverLink = (index: number | null) => {
    setElementFocused(index);
  };

  return (
    <nav
      className="flex flex-col items-center justify-center sm:flex-row"
      onMouseLeave={() => {
        handleHoverLink(null);
      }}
    >
      {dataButtons.map((link, index) => (
        <Link
          href={link.href}
          className="relative inline-flex w-fit whitespace-nowrap rounded px-2 py-1 text-sm font-medium"
          key={link.label}
          onMouseEnter={() => handleHoverLink(index)}
          type="button"
        >
          {link.label}
          <AnimatePresence>
            {elementFocused === index && (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="absolute bottom-0 left-0 right-0 top-0 -z-10 rounded-md bg-neutral-200 dark:bg-neutral-800"
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

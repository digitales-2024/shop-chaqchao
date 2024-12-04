"use client";
import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import useClickOutside from "@/hooks/use-click-outside";
import { useOpenMenu } from "@/hooks/use-open-menu";
import { useWindowScrollPosition } from "@/hooks/use-window-scroll-position";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CartSheet } from "@/components/cart/CartSheet";

import { cn } from "@/lib/utils";

import { MenuToogle } from "./MenuToogle";
import { SearchBar } from "./SearchBar";
import { UserLogin } from "./UserLogin";

export function Navbar() {
  const { y } = useWindowScrollPosition();

  const isScrolling = y > 1;

  const { open, onOpenChange } = useOpenMenu();
  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <header className="flex items-center justify-center">
      <nav
        className={cn(
          "container fixed top-0 z-50 mx-auto px-6 transition-all duration-500 sm:top-3 sm:rounded-[3rem]",
          {
            "w-full sm:h-auto": !isScrolling,
            "w-full bg-primary-foreground/80 backdrop-blur-md sm:h-auto sm:max-w-[60rem]":
              isScrolling,
          },
          {
            "bg-primary-foreground/80 pb-20 backdrop-blur-md": open,
          },
        )}
      >
        <AnimatePresence mode="wait">
          {!open ? (
            <div
              className={cn(
                "w-full grid-cols-2 items-center justify-between sm:grid",
                {
                  "p-0": !isScrolling,
                  "p-4": isScrolling,
                },
              )}
            >
              <div className="flex w-full">
                <Link
                  href="/"
                  prefetch={true}
                  className="flex w-full items-center justify-center md:w-auto lg:mr-6"
                >
                  <ChaqchaoCharacter
                    className={cn("transition-all duration-300", {
                      "h-16 sm:h-32": !isScrolling,
                      "h-10 sm:h-20": isScrolling,
                    })}
                  />
                </Link>
              </div>
              <div className="flex w-full flex-row items-center justify-end">
                <motion.div
                  key="closed"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                  className="flex w-full flex-row items-center justify-end"
                >
                  <MenuList />
                </motion.div>
                <MenuToogle />
              </div>
            </div>
          ) : (
            <div
              className={cn("flex flex-col justify-center", {
                "p-0": !isScrolling,
                "p-4": isScrolling,
              })}
            >
              <div className="flex w-full items-center justify-between">
                <Link
                  href="/"
                  prefetch={true}
                  className="flex w-full items-center justify-center md:w-auto lg:mr-6"
                >
                  <ChaqchaoCharacter
                    className={cn("transition-all duration-300", {
                      "h-32": !isScrolling,
                      "h-14": isScrolling,
                    })}
                  />
                </Link>
                <MenuToogle />
              </div>
              <motion.div
                key="open"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                transition={{ duration: 0.5 }}
                className="flex w-full flex-col-reverse items-end justify-center"
              >
                <MenuList />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </nav>
      <MenuDialog open={open} onToggle={onOpenChange} />
    </header>
  );
}

const MenuList = () => {
  const t = useTranslations("navbar");
  const dataButtons: {
    label: string;
    type: "link" | "component";
    href?: string;
    component?: JSX.Element;
  }[] = [
    { type: "link", label: t("products"), href: "/categories" },
    { type: "link", label: t("classes"), href: "/workshops" },
    { type: "component", label: "Search", component: <SearchBar /> },
    { type: "component", label: "Login", component: <UserLogin /> },
    { type: "component", label: "Cart", component: <CartSheet /> },
  ];

  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const handleHoverLink = (index: number | null) => {
    setElementFocused(index);
  };
  const { open } = useOpenMenu();
  return (
    <nav
      className={cn("flex flex-row items-center justify-center gap-x-2", {
        "flex-col-reverse items-end": open,
      })}
      onMouseLeave={() => {
        handleHoverLink(null);
      }}
    >
      {dataButtons.map((link, index) =>
        link.type === "link" ? (
          <Link
            href={link.href ?? "/"}
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
        ) : (
          <div
            className="relative inline-flex aspect-square size-16 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full"
            key={link.label}
            onMouseEnter={() => handleHoverLink(index)}
          >
            {link.component}
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
        ),
      )}
    </nav>
  );
};

const MenuDialog = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useClickOutside(containerRef, () => {
    console.log("click outside");
    if (open) {
      onToggle();
    }
  });
  if (!open) return null; // Si no está abierto, no renderizamos nada
  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/10 backdrop-blur-sm"
    ></div>,
    document.body,
  );
};

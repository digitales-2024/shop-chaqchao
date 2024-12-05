"use client";
import { ChaqchaoCharacter } from "@/assets/images/ChaqchaoCharacter";
import { useOpenMenu } from "@/hooks/use-open-menu";
import { useWindowScrollPosition } from "@/hooks/use-window-scroll-position";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CartSheet } from "@/components/cart/CartSheet";

import { cn } from "@/lib/utils";

import { MenuToogle } from "./MenuToogle";
import { UserLogin } from "./UserLogin";

export function Navbar() {
  const { y } = useWindowScrollPosition();

  const isScrolling = y > 1;

  const { open, onOpenChange } = useOpenMenu();

  const variants = {
    open: { height: "100%" },
    closed: { height: "96px" },
  };

  return (
    <header className="flex items-center justify-center">
      <motion.nav
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={variants}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 260,
          damping: 20,
          visualDuration: 0.3,
        }}
        className={cn(
          "container fixed top-0 z-50 mx-auto flex items-center justify-center transition-all duration-500 sm:top-3 sm:rounded-[3rem]",
          {
            "w-full": !isScrolling,
            "w-full bg-primary-foreground/80 backdrop-blur-sm sm:max-w-[60rem]":
              isScrolling,
          },
          {
            "bg-primary-foreground/80 backdrop-blur-sm": open,
          },
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-row items-start justify-between p-4",
            {
              "items-start": open,
            },
          )}
        >
          <div className="flex w-fit">
            <Link
              href="/"
              prefetch={true}
              className="flex w-full items-center justify-center"
            >
              <ChaqchaoCharacter className="h-16 transition-all duration-300" />
            </Link>
          </div>
          <div
            className={cn("flex w-full flex-row items-center justify-end", {
              "flex-col-reverse items-end": open,
            })}
          >
            <MenuList />
            <MenuToogle />
          </div>
        </div>
      </motion.nav>
      {open && <MenuDialog open={open} onToggle={onOpenChange} />}
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
    { type: "component", label: "Login", component: <UserLogin /> },
    { type: "component", label: "Cart", component: <CartSheet /> },
  ];

  const [elementFocused, setElementFocused] = useState<number | null>(null);

  const handleHoverLink = (index: number | null) => {
    setElementFocused(index);
  };

  const { open, onClose } = useOpenMenu();

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
              "relative hidden w-auto justify-center whitespace-nowrap rounded p-4 text-center text-2xl font-normal lowercase transition-all duration-300 hover:font-bold sm:inline-flex",
              {
                "inline-flex uppercase": open,
              },
            )}
            key={link.label}
            onMouseEnter={() => handleHoverLink(index)}
            type="button"
            onClick={onClose}
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
            className={cn(
              "relative inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full text-2xl transition-all duration-300 hover:font-bold",
              {
                uppercase: open,
                "aspect-square size-16 shrink-0": !open,
              },
            )}
            key={link.label}
            onMouseEnter={() => handleHoverLink(index)}
            onClick={onClose}
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

  if (!open) return null; // Si no está abierto, no renderizamos nada
  return createPortal(
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/10 backdrop-blur-sm"
      onClick={onToggle}
    ></div>,
    document.body,
  );
};

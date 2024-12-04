import "@/styles/button-hero.css";
import useCartStore from "@/redux/store/cart";
import { ShoppingBag } from "lucide-react";
import React, { forwardRef } from "react";
import type { ComponentProps } from "react";

export const ButtonCart = forwardRef<
  HTMLButtonElement,
  Readonly<{
    onClick?: () => void;
    className?: string;
  }> &
    ComponentProps<"button">
>(({ onClick }, ref) => {
  const { cartItems } = useCartStore();

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="group/cart group relative inline-flex size-full items-center justify-center rounded-full bg-transparent text-neutral-900"
    >
      <span className="sr-only">Abrir carrito de compras</span>
      <ShoppingBag
        className="size-7 group-hover/cart:animate-tada"
        strokeWidth={1}
      />
      <span className="absolute right-1 top-1 inline-flex size-5 shrink-0 items-center justify-center">
        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </button>
  );
});

// Establecer un nombre legible para debug
ButtonCart.displayName = "ButtonCart";

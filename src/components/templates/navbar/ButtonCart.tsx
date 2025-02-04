import "@/styles/button-hero.css";
import { useOpenMenu } from "@/hooks/use-open-menu";
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
  const { open } = useOpenMenu();

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="group/cart group relative inline-flex size-full items-center justify-center rounded-full bg-transparent"
    >
      {open ? (
        <span className="p-4 text-xl uppercase">
          Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </span>
      ) : (
        <div className="relative">
          <span className="sr-only">Abrir carrito de compras</span>
          <ShoppingBag
            className="size-7 group-hover/cart:animate-tada"
            strokeWidth={1}
          />
          <span className="absolute -bottom-2 -right-2 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-white">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </div>
      )}
    </button>
  );
});

// Establecer un nombre legible para debug
ButtonCart.displayName = "ButtonCart";

"use client";

import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/types";
import { X } from "lucide-react";

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { removeItemCard } = useCart();
  return (
    <form
      action={() => {
        removeItemCard(item.id);
      }}
    >
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full border border-primary bg-white"
      >
        <X className="mx-[1px] h-4 w-4 text-primary" />
      </button>
    </form>
  );
}

"use client";

import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/types";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

export type TypeUpdateItemQuantity = "PLUS" | "MIN";

function SubmitButton({ type }: { type: TypeUpdateItemQuantity }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "PLUS" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "MIN",
        },
      )}
    >
      {type === "PLUS" ? (
        <Plus className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <Minus className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export const EditItemQuantityButton = ({
  item,
  type,
}: {
  item: CartItem;
  type: TypeUpdateItemQuantity;
}) => {
  const { updateItemQuantity } = useCart();
  return (
    <form
      action={async () => {
        if (type === "PLUS") {
          updateItemQuantity(item.id, "PLUS");
        } else {
          updateItemQuantity(item.id, "MIN");
        }
      }}
    >
      <SubmitButton type={type} />
    </form>
  );
};

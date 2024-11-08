"use client";

import useCartStore from "@/redux/store/cart";
import { CartItem } from "@/types";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
        },
      )}
    >
      {type === "plus" ? (
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
  type: "plus" | "minus";
}) => {
  const { increaseQuantity, decreaseQuantity } = useCartStore();

  return (
    <form
      action={async () => {
        if (type === "plus") {
          increaseQuantity(item.id);
        } else {
          decreaseQuantity(item.id);
        }
      }}
    >
      <SubmitButton type={type} />
    </form>
  );
};

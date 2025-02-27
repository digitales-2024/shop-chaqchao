"use client";

import { useCart } from "@/hooks/use-cart";
import { useCatalog } from "@/hooks/use-catalog";
import { CartItem } from "@/types";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

export type TypeUpdateItemQuantity = "PLUS" | "MIN";

function SubmitButton({
  type,
  disabled,
}: {
  type: TypeUpdateItemQuantity;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      aria-label={
        type === "PLUS" ? "Increase item quantity" : "Reduce item quantity"
      }
      disabled={disabled}
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50",
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
  const { productById, isLoadingProductById } = useCatalog({
    id: item.id,
  });
  const disabled =
    type === "PLUS" &&
    item.quantity >= (productById?.maxStock ?? item.maxStock);

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
      <SubmitButton type={type} disabled={disabled || isLoadingProductById} />
    </form>
  );
};

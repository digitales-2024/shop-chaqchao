import useCartSheet from "@/hooks/use-cart-sheet";
import useCartStore from "@/redux/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../ui/button";

export const ButtonCheckout = () => {
  const { id } = useCartStore();
  const { onOpenChange } = useCartSheet();

  return (
    <Link
      href={`/cart/${id}`}
      className={cn("font-bold", buttonVariants({}))}
      onClick={onOpenChange}
    >
      <ShoppingCart />
      Realizar el pago
    </Link>
  );
};

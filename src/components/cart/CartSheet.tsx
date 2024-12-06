"use client";
import { ShoppingDelete } from "@/assets/icons";
import { useCart } from "@/hooks/use-cart";
import useCartSheet from "@/hooks/use-cart-sheet";
import useCartStore from "@/redux/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import { ButtonCart } from "../templates/navbar/ButtonCart";
import { ScrollArea } from "../ui/scroll-area";
import { AlertValidate } from "./AlertValidate";
import { ButtonCheckout } from "./ButtonCheckout";
import { CartEmpty } from "./CartEmpty";
import { DeleteItemButton } from "./DeleteItemButton";
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import Price from "./Price";

const springTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

export function CartSheet() {
  const { cartItems, amountTotal } = useCartStore();
  const t = useTranslations("cart");

  const { open, onOpenChange } = useCartSheet();
  const rounter = useRouter();

  const { validateCart, validateItem, isLoadingValidate, errorValidate } =
    useCart();

  const handleCheckout = async () => {
    const response = await validateCart(cartItems);
    if (response) {
      onOpenChange();
      rounter.push("/cart/checkout");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <ButtonCart />
      </SheetTrigger>
      <SheetContent className="m-2 rounded-3xl border border-secondary/10 sm:max-w-[30rem]">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold">{t("title")}</SheetTitle>
          <SheetDescription asChild>
            <div>
              {cartItems.length === 0 ? (
                <CartEmpty />
              ) : (
                <>
                  {t("description.pre")} {cartItems.length}{" "}
                  {t("description.product")}
                  {cartItems.length === 1 ? "" : "s"} {t("description.post")}
                </>
              )}
            </div>
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <AlertValidate errorValidate={errorValidate} />
          <ul>
            <ScrollArea className="h-full max-h-[70vh]">
              <AnimatePresence>
                {cartItems.length > 0 &&
                  cartItems.map((item, index) => {
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          transition: { duration: 0.2 },
                        }}
                        transition={{ ...springTransition, delay: index * 0.1 }}
                        className="flex w-full flex-col border-b border-neutral-300"
                      >
                        <div className="relative flex w-full flex-row justify-between px-1 py-4">
                          <div className="absolute z-40 -ml-1 -mt-2">
                            <DeleteItemButton item={item} />
                          </div>
                          <div className="flex flex-row">
                            <div
                              className={cn(
                                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white shadow",
                                {
                                  "border-rose-500": validateItem(item.id),
                                },
                              )}
                            >
                              {validateItem(item.id) && (
                                <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-rose-100/60 text-xs">
                                  <div className="rounded-full bg-white p-2">
                                    <ShoppingDelete className="size-4 text-rose-500" />
                                  </div>
                                </div>
                              )}
                              <Image
                                className="h-full w-full object-cover"
                                width={64}
                                height={64}
                                alt={item.name}
                                src={item.image}
                              />
                            </div>
                            <Link
                              href={"/"}
                              className="z-30 ml-2 flex flex-row space-x-4"
                            >
                              <div className="flex flex-1 flex-col text-base">
                                <span className="font-bold capitalize leading-tight">
                                  {item.name}
                                </span>
                                <p className="text-sm capitalize text-primary">
                                  {item.category.name}
                                </p>
                              </div>
                            </Link>
                          </div>
                          <div className="flex h-16 flex-col justify-between">
                            <Price
                              className="flex justify-end space-y-2 text-right text-sm"
                              amount={item.price}
                            />
                            <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                              <EditItemQuantityButton item={item} type="MIN" />
                              <p className="w-6 text-center">
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 1.5 }}
                                  animate={{ scale: 1 }}
                                  className="w-full text-sm"
                                >
                                  {item.quantity}
                                </motion.span>
                              </p>
                              <EditItemQuantityButton item={item} type="PLUS" />
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
              </AnimatePresence>
            </ScrollArea>
          </ul>
          {cartItems.length > 0 && (
            <div className="py-4 text-sm">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p className="text-lg font-bold">Total</p>
                <Price
                  className="text-right text-base font-black"
                  amount={amountTotal}
                />
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {cartItems.length > 0 && (
              <ButtonCheckout
                validate={handleCheckout}
                isLoading={isLoadingValidate}
              />
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

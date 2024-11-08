"use client";
import useCartSheet from "@/hooks/use-cart-sheet";
import useCartStore from "@/redux/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

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

import { Badge } from "../ui/badge";
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <div className="group/cart relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-background">
          <span className="sr-only">Abrir carrito de pedidos</span>
          <ShoppingBag className="flex-shrink-0 transition-transform duration-300 group-hover/cart:animate-tada" />
          <Badge
            variant="default"
            className="absolute -bottom-0 right-0 flex size-5 items-center justify-center p-2 text-xs text-black"
          >
            {cartItems.length}
          </Badge>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0 ? (
              <CartEmpty />
            ) : (
              <>
                {t("description.pre")} {cartItems.length}{" "}
                {t("description.product")}
                {cartItems.length === 1 ? "" : "s"} {t("description.post")}
              </>
            )}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ul>
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
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white shadow">
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
                            <EditItemQuantityButton item={item} type="minus" />
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
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
            </AnimatePresence>
          </ul>
          {cartItems.length > 0 && (
            <div className="py-4 text-sm">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                <p className="text-lg font-bold">Total</p>
                <Price className="text-right text-base" amount={amountTotal} />
              </div>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {cartItems.length > 0 && <ButtonCheckout />}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

"use client";
import useCartStore from "@/redux/store/cart";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DeleteItemButton } from "./DeleteItemButton";
import { EditItemQuantityButton } from "./EditItemQuantityButton";

export const TableCart = () => {
  const { cartItems } = useCartStore();
  const t = useTranslations("checkout.summary");

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-none">
          <TableHead className="font-bold text-black">{t("product")}</TableHead>
          <TableHead className="font-bold text-black">
            {t("quantity")}
          </TableHead>
          <TableHead className="font-bold text-black">{t("price")}</TableHead>
          <TableHead className="font-bold text-black">
            {t("subTotal")}
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((cartItem, index) => (
          <TableRow
            key={cartItem.id}
            className={cn("border-none hover:bg-transparent", {
              "bg-slate-50": index % 2 === 0,
            })}
          >
            <TableCell className="rounded-s-3xl">
              <div className="flex flex-row gap-4">
                <div className="flex h-24 w-20 items-center justify-center rounded-md bg-primary-foreground">
                  <Image
                    height={100}
                    width={100}
                    src={cartItem.image}
                    alt={cartItem.name}
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h3 className="font-bold capitalize">{cartItem.name}</h3>
                  <p className="text-xs font-bold capitalize text-terciary">
                    {cartItem.category.name}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex h-9 w-fit flex-row items-center justify-start rounded-full border border-neutral-200">
                <EditItemQuantityButton item={cartItem} type="minus" />
                <p className="w-6 text-center">
                  <motion.span
                    key={cartItem.quantity}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="w-full text-sm"
                  >
                    {cartItem.quantity}
                  </motion.span>
                </p>
                <EditItemQuantityButton item={cartItem} type="plus" />
              </div>
            </TableCell>
            <TableCell className="truncate">
              S/. {cartItem.price.toFixed(2)}
            </TableCell>
            <TableCell className="w-32 font-bold">
              S/. {(cartItem.price * cartItem.quantity).toFixed(2)}
            </TableCell>
            <TableCell className="w-16 rounded-e-3xl">
              <DeleteItemButton item={cartItem} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

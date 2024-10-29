"use client";
import { Product } from "@/types";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { AddToCartButton } from "./AddToCartButton";
import { ProductDialog } from "./ProductDialog";
interface CartItemProps {
  product: Product;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  ({ product }, ref) => {
    const t = useTranslations("cartItem");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () =>
      setQuantity((prev) => Math.min(prev + 1, 10));
    const decrementQuantity = () =>
      setQuantity((prev) => Math.max(prev - 1, 1));

    return (
      <div ref={ref} className="h-fit">
        <div className="m-0 aspect-[9/16] h-[37rem] bg-transparent p-0 hover:bg-transparent">
          <Card className="group/product bg-transparento grid h-full w-72 grid-rows-[1fr_60px] border border-secondary/10 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
            <CardContent className="flex flex-col items-center justify-center gap-4 px-2 pt-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    variant="outline"
                    className="mx-auto inline-flex h-full w-full items-center justify-center rounded-md border-none bg-primary-foreground py-4 transition-colors duration-300 hover:bg-primary/30"
                  >
                    <Image
                      className="aspect-square w-48 shrink-0 rounded object-cover transition-all duration-500 group-hover/product:scale-105"
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={50}
                      quality={100}
                    />
                  </Button>
                </DialogTrigger>

                <AnimatePresence>
                  <ProductDialog product={product} />
                </AnimatePresence>
              </Dialog>
              <div className="grid h-full grid-rows-[auto_1fr_30px] gap-4 text-center">
                <h2 className="text-balance text-center text-xs font-semibold capitalize text-secondary/50 [view-transition-name:_'product-name']">
                  {product.category.name}
                </h2>
                <h2 className="text-balance text-center text-lg font-bold capitalize">
                  {product.name}
                </h2>
                <p className="font-commingSoon text-3xl font-semibold">
                  S/ {product.price}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="mb-4 flex w-full items-center justify-between px-4">
                <span className="font-medium">{t("quantity")}:</span>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-gray-200 p-1"
                    onClick={decrementQuantity}
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </motion.button>
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-8 text-center text-lg font-semibold"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-gray-200 p-1"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex w-full flex-col items-center justify-center">
              <AddToCartButton quantity={quantity} />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  },
);
CartItem.displayName = "CartItem";

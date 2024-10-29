"use client";
import { Product } from "@/types";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AddToCartButton } from "./AddToCartButton";
import { ProductDialog } from "./ProductDialog";

interface CartItemProps {
  product: Product;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  ({ product }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
      <div ref={ref}>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="m-0 aspect-[9/16] h-[32rem] bg-transparent p-0 hover:bg-transparent"
              variant="ghost"
            >
              <span className="sr-only">{product.name}</span>
              <Card className="group/product bg-transparento grid h-full w-72 grid-rows-[1fr_60px] border border-secondary/10 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
                <CardContent className="flex flex-col items-center justify-center gap-4 px-2 pt-2">
                  <div className="mx-auto inline-flex h-full w-full items-center justify-center rounded-md bg-primary-foreground py-4">
                    <Image
                      className="aspect-square w-48 shrink-0 rounded object-cover transition-all duration-500 group-hover/product:scale-105"
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={50}
                      quality={100}
                    />
                  </div>
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
                </CardContent>
                <CardFooter className="flex h-full w-full items-center justify-center">
                  <AddToCartButton />
                </CardFooter>
              </Card>
            </Button>
          </DialogTrigger>

          <AnimatePresence>
            <ProductDialog product={product} />
          </AnimatePresence>
        </Dialog>
      </div>
    );
  },
);
CartItem.displayName = "CartItem";

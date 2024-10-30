"use client";
import { Product } from "@/types";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { ProductDialog } from "./ProductDialog";
interface CartItemProps {
  product: Product;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  ({ product }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
      <div ref={ref} className="h-fit">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="m-0 h-[40rem] w-[22rem] overflow-hidden rounded-3xl border border-secondary/10 bg-transparent p-0 transition-all duration-300 hover:bg-transparent hover:shadow-md"
            >
              <Card className="group/product bg-transparento grid h-full w-full grid-rows-[1fr_200px] border-none p-2 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
                <CardContent className="flex h-full w-full flex-col items-center justify-start gap-4 p-0">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-primary-foreground p-10">
                    <Image
                      className="rounded object-cover transition-all duration-500 group-hover/product:scale-105"
                      src={product.image}
                      alt={`chaqchao ${product.name}`}
                      width={400}
                      height={400}
                      quality={100}
                    />
                    <p className="absolute left-5 top-5 rounded-xl bg-white px-3 py-1 text-center text-sm font-bold capitalize text-terciary">
                      {product.category.name}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="grid h-full w-full grid-rows-[2fr_1fr] justify-items-start gap-4">
                  <h2 className="truncate text-balance text-start font-nunito text-2xl font-bold capitalize">
                    {product.name}
                  </h2>
                  <div className="flex w-full flex-row justify-between">
                    <p className="font-commingSoon text-3xl font-semibold">
                      S/. {product.price}
                    </p>
                    <div className="inline-flex size-14 items-center justify-center rounded-full bg-primary">
                      <ShoppingBag className="w-20 transition-all duration-300 group-hover/product:scale-150" />
                    </div>
                  </div>
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

"use client";
import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogImage,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from "../common/Dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { AddToCartButton } from "./AddToCartButton";
import { OutStock } from "./OutStock";
import { ProductDialog } from "./ProductDialog";
interface CartItemProps {
  product: Product;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  ({ product }, ref) => {
    return (
      <div ref={ref} className="h-fit">
        <Dialog
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 24,
          }}
        >
          <DialogTrigger>
            <Button
              className="group/item m-0 h-[40rem] w-[22rem] overflow-hidden rounded-3xl border border-secondary/10 bg-transparent p-0 transition-all duration-300 hover:bg-transparent hover:shadow-md"
              disabled={!product.isAvailable}
            >
              <Card className="group/product bg-transparento grid h-full w-full grid-rows-[1fr_200px] border-none p-2 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
                <CardContent className="flex h-full w-full flex-col items-center justify-start gap-4 p-0">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-primary-foreground p-10">
                    <DialogImage
                      src={product.image}
                      alt={`chaqchao ${product.name}`}
                      className="rounded object-cover transition-all duration-500 group-hover/product:scale-105"
                    />
                    <p className="absolute left-5 top-5 rounded-xl bg-white px-3 py-1 text-center text-sm font-bold capitalize text-terciary">
                      {product.category.name}
                    </p>
                    {!product.isAvailable && <OutStock />}
                  </div>
                </CardContent>
                <CardFooter className="grid h-full w-full grid-rows-[2fr_1fr] justify-items-start gap-4">
                  <DialogTitle>
                    <h2 className="truncate text-balance text-start font-nunito text-2xl font-bold capitalize">
                      {product.name}
                    </h2>
                  </DialogTitle>
                  <div className="flex w-full flex-row items-center justify-between">
                    <DialogSubtitle>
                      <p className="font-commingSoon text-3xl font-semibold">
                        S/. {product.price}
                      </p>
                    </DialogSubtitle>
                    <DialogDescription>
                      <AddToCartButton
                        product={product}
                        size="icon"
                        className="group/add scale-0 transition-all duration-300 group-hover/item:scale-105"
                      >
                        <ShoppingBag className="group-hover/add:animate-tada" />
                      </AddToCartButton>
                    </DialogDescription>
                  </div>
                </CardFooter>
              </Card>
            </Button>
          </DialogTrigger>
          <DialogContainer>
            <DialogContent className="h-full max-h-[90vh] overflow-hidden rounded-xl border bg-white sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px]">
              <ProductDialog product={product} />
              <DialogClose className="text-zinc-500" />
            </DialogContent>
          </DialogContainer>
        </Dialog>
      </div>
    );
  },
);
CartItem.displayName = "CartItem";

"use client";
import { Product } from "@/types";
import React from "react";

import {
  Dialog,
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
import { useTranslations } from "next-intl";

interface CartItemProps {
  product: Product;
}

export const CartItem = React.forwardRef<HTMLDivElement, CartItemProps>(
  ({ product }, ref) => {
    const t = useTranslations("cartItem");
    return (
      <div ref={ref} className="h-fit">
        <Dialog
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 24,
          }}
        >
          <Button
            className="group/item m-0 h-[40rem] w-[22rem] overflow-hidden rounded-sm border border-secondary/10 bg-transparent p-0 transition-all duration-300 hover:bg-transparent hover:shadow-md"
            disabled={!product.isAvailable}
          >
            <DialogTrigger className="h-full w-full">
              <Card className="group/product grid h-full w-full grid-rows-[1fr_200px] border-none bg-transparent p-2 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
                <CardContent className="flex h-full w-full flex-col items-center justify-start gap-4 border-none p-0">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-sm bg-secondary/5 p-10">
                    <DialogImage
                      src={product.image}
                      alt={`chaqchao ${product.name}`}
                      className="object-cover [filter:_drop-shadow(2px_10px_10px_#818182);]"
                    />
                    {!product.isAvailable && <OutStock />}
                  </div>
                </CardContent>
                <CardFooter className="grid h-full w-full grid-rows-[2fr_1fr] justify-items-start gap-4 p-2">
                  <DialogTitle>
                    <h2 className="truncate text-balance text-start font-nunito text-2xl font-bold capitalize">
                      {product.name}
                    </h2>
                    <p className="text-center text-sm capitalize text-primary">
                      {product.category.name}
                    </p>
                  </DialogTitle>
                  <div className="grid w-full grid-cols-2 items-center justify-items-start">
                    <DialogSubtitle>
                      <p className="text-3xl font-bold">
                        S/. {product.price.toFixed(2)}
                      </p>
                    </DialogSubtitle>
                    <DialogDescription className="w-full">
                      <AddToCartButton
                        product={product}
                        className="group/add h-16 w-full transition-all duration-300"
                      >
                        {t("addToCart")}
                      </AddToCartButton>
                    </DialogDescription>
                  </div>
                </CardFooter>
              </Card>
            </DialogTrigger>
          </Button>
          <DialogContainer>
            <DialogContent className="h-full max-h-[90vh] overflow-hidden rounded-xl border bg-white sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px]">
              <ProductDialog product={product} />
            </DialogContent>
          </DialogContainer>
        </Dialog>
      </div>
    );
  },
);
CartItem.displayName = "CartItem";

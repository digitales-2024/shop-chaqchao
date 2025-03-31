"use client";
import { Product } from "@/types";
import { useTranslations } from "next-intl";
import React, { memo } from "react";

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

interface CartItemProps {
  product: Product;
}

export const CartItem = memo(
  React.forwardRef<HTMLDivElement, CartItemProps>(({ product }, ref) => {
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
            className="group/item m-0 h-[40rem] w-[22rem] overflow-hidden rounded-sm border border-secondary/10 bg-transparent p-0 transition-all duration-300 hover:bg-transparent hover:shadow-sm"
            disabled={!product.isAvailable}
          >
            <DialogTrigger className="h-full w-full">
              <Card className="group/product grid h-full w-full grid-rows-[80%_20%] border-none bg-transparent p-2 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
                <CardContent className="flex h-full w-full flex-col items-center justify-start border-none p-0">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-sm">
                    {product.images && product.images.length > 0 && (
                      <DialogImage
                        src={product.images[0].url}
                        alt={`chaqchao ${product.name} - ${product.category.name}`}
                        className="h-auto max-h-full w-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 352px"
                      />
                    )}
                    {!product.isAvailable && <OutStock />}
                  </div>
                </CardContent>
                <CardFooter className="flex h-full w-full flex-col justify-between p-2">
                  <DialogTitle className="w-full">
                    <h2 className="line-clamp-2 text-start font-nunito text-xl font-bold capitalize">
                      {product.name}
                    </h2>
                    <p className="text-start text-sm capitalize text-primary">
                      {product.category.name}
                    </p>
                  </DialogTitle>
                  <div className="grid w-full grid-cols-2 items-center justify-items-start">
                    <DialogSubtitle>
                      <p className="text-2xl font-bold">
                        S/. {product.price.toFixed(2)}
                      </p>
                    </DialogSubtitle>
                    <DialogDescription className="w-full">
                      <AddToCartButton
                        product={product}
                        className="group/add h-12 w-full transition-all duration-300"
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
  }),
);
CartItem.displayName = "CartItem";

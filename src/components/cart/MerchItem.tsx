import { Product } from "@/types";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Badge } from "../ui/badge";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { AddToCartButton } from "./AddToCartButton";
import { ProductDialog } from "./ProductDialog";

interface MerchItemProps {
  product: Product;
}
export const MerchItem = React.forwardRef<HTMLDivElement, MerchItemProps>(
  ({ product }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
      <div ref={ref} className="h-fit">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            onClick={() => setIsDialogOpen(true)}
            disabled={!product.isAvailable}
          >
            <Card className="group/product bg-transparento grid h-auto w-96 grid-rows-[1fr_60px] border border-secondary/10 shadow-none transition-all duration-500 hover:bg-white hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center gap-4 px-2 py-10">
                <div className="relative flex h-56 w-full items-center justify-center">
                  <div className="absolute z-0 size-40 rounded-full bg-primary/10"></div>
                  <Image
                    className="relative z-10 w-48 rounded object-cover transition-all duration-500 group-hover/product:scale-105"
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={50}
                    quality={100}
                  />
                </div>
                <div className="grid h-full w-full grid-rows-[auto_1fr_30px] justify-items-start gap-4 px-6">
                  <Badge
                    className="border-primary capitalize"
                    variant="outline"
                  >
                    {product.category.name}
                  </Badge>
                  <h2 className="text-balance text-start text-lg font-bold capitalize">
                    {product.name}
                  </h2>
                </div>
              </CardContent>
              <CardFooter className="flex h-full w-full items-center justify-between">
                <p className="font-commingSoon text-3xl font-semibold">
                  S/ {product.price}
                </p>
                <AddToCartButton
                  product={product}
                  size="icon"
                  className="group/add transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag className="group-hover/add:animate-tada" />
                </AddToCartButton>
              </CardFooter>
            </Card>
          </DialogTrigger>

          {isDialogOpen && <ProductDialog product={product} />}
        </Dialog>
      </div>
    );
  },
);
MerchItem.displayName = "MerchItem";

import { Product } from "@/types";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { AddToCartButton } from "./AddToCartButton";

interface MerchItemProps {
  product: Product;
}
export const MerchItem = ({ product }: MerchItemProps) => {
  return (
    <Card className="group/product bg-transparento grid h-auto w-72 grid-rows-[1fr_60px] border border-secondary/10 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
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
        <div className="grid h-full w-full grid-rows-[auto_1fr_30px] gap-4 px-6 text-center">
          <h2 className="text-balance text-start text-xs font-semibold capitalize text-secondary/50">
            {product.category.name}
          </h2>
          <h2 className="text-balance text-start text-lg font-bold capitalize">
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
  );
};

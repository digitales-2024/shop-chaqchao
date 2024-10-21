import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface CartItemProps {
  product: Product;
}
export const CartItem = ({ product }: CartItemProps) => {
  return (
    <Card className="group/product h-aut bg-transparento grid w-60 grid-rows-[1fr_60px] border border-secondary/10 shadow-none transition-all duration-500 hover:bg-white hover:shadow-sm">
      <CardContent className="flex flex-col items-center justify-center gap-4 px-2 py-10">
        <div className="h-20">
          <Image
            className="w-48 -translate-y-28 rounded object-cover transition-all duration-500 group-hover/product:scale-105"
            src={product.image}
            alt={product.name}
            width={200}
            height={50}
            quality={100}
          />
        </div>
        <div className="grid h-full grid-rows-[auto_1fr_30px] gap-4 text-center">
          <h2 className="text-balance text-center text-xs font-semibold capitalize text-secondary/50">
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
        <Button
          variant="outline"
          className="group/add rounded-xl border-secondary text-secondary transition-colors duration-500 hover:bg-secondary hover:text-white"
        >
          <ShoppingCart className="size-6 transition-transform duration-500 group-hover/add:scale-150" />
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

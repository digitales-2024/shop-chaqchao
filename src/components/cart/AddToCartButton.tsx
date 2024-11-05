"use client";

import useCartStore from "@/redux/store/cart";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addItemToCart } = useCartStore();

  const handleAddToCart = async () => {
    if (isLoading || isAdded) return;
    // Simular una carga de 1 segundo
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsAdded(true);
    addItemToCart(product);

    // Reiniciar el estado después de 2 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart();
      }}
      className={cn(
        buttonVariants({ variant: "default", size: "icon" }),
        "relative inline-flex size-14 items-center justify-center overflow-hidden rounded-2xl transition-colors duration-300",
        {
          "border-none bg-green-600": isAdded,
        },
      )}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5 animate-bounce" />
          </motion.div>
        )}
        {isAdded && (
          <motion.div
            key="added"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <Check className="h-5 w-5" />
          </motion.div>
        )}
        {!isLoading && !isAdded && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

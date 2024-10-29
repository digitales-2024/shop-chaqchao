"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  quantity: number;
}

export function AddToCartButton({ quantity }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading || isAdded) return;

    setIsLoading(true);
    try {
      // Simular una llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsAdded(true);
      // toast({
      //   title: "Producto añadido",
      //   description: "El artículo se ha añadido a tu carrito.",
      // });

      // Resetear el estado después de 2 segundos
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "No se pudo añadir el producto al carrito.",
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const t = useTranslations("cartItem");

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading || isAdded}
      variant="outline"
      className={cn(
        "relative w-full overflow-hidden text-black transition-colors duration-300",
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
            className="absolute inset-0 flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5 animate-bounce" />
            Añadiendo al carrito...
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
            Añadido
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
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t("addToCart")} ({quantity})
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

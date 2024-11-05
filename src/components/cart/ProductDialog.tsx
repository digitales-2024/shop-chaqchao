import { Product } from "@/types";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { BusinessInfoCart } from "../business/BusinessInfoCart";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface ProductDialogProps {
  product: Product;
}

export const ProductDialog = ({ product }: ProductDialogProps) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const t = useTranslations("cartItem");

  return (
    <DialogContent className="h-full max-h-[90vh] overflow-hidden border sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[1000px]">
      <ScrollArea className="h-full max-h-[90vh]">
        <div className="grid h-full gap-x-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center rounded-md bg-primary-foreground"
          >
            <Image
              src={product.image}
              alt={`producto ${product.name}`}
              width={400}
              height={400}
              className="object-cover"
            />
          </motion.div>
          <div className="space-y-6 px-8 py-20">
            <DialogHeader>
              <DialogTitle className="font-nunito text-4xl font-black capitalize">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm font-bold capitalize text-terciary">
                {product.category.name}
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  S/. {product.price.toFixed(2)}
                </span>
              </div>{" "}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full bg-gray-200 p-1"
                  onClick={decrementQuantity}
                  disabled={!product.isAvailable}
                  aria-label="decrement quantity"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </motion.button>
                <motion.span
                  key={quantity}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-8 text-center text-lg font-semibold"
                >
                  {quantity}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="increment quantity"
                  className="rounded-full bg-gray-200 p-1"
                  onClick={incrementQuantity}
                  disabled={!product.isAvailable}
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </motion.button>
              </div>
              <div className="flex space-x-4">
                <Button className="flex-1 bg-primary text-black transition-colors duration-300 hover:bg-primary/80">
                  <ShoppingBag className="mr-2 h-4 w-4" /> {t("addToCart")} (
                  {quantity})
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="font-nunito font-semibold text-gray-800">
                {t("detail")}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </motion.div>
            <BusinessInfoCart />
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

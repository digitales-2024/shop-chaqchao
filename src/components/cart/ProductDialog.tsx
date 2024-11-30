import { Product } from "@/types";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { BusinessInfoCart } from "../business/BusinessInfoCart";
import {
  DialogDescription,
  DialogImage,
  DialogSubtitle,
  DialogTitle,
} from "../common/Dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { AddToCartButton } from "./AddToCartButton";

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
    <ScrollArea className="h-full max-h-[90vh]">
      <div className="grid h-full gap-x-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-md bg-primary-foreground">
          <DialogImage
            src={product.image}
            alt={`producto ${product.name}`}
            className="object-cover"
          />
        </div>
        <div className="space-y-6 px-8 py-20">
          <DialogTitle>
            <p className="font-nunito text-4xl font-black capitalize">
              {product.name}
            </p>
          </DialogTitle>
          <span className="text-sm font-bold capitalize text-terciary">
            {product.category.name}
          </span>
          <Separator />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <DialogSubtitle>
                <span className="text-3xl font-bold">
                  S/. {product.price.toFixed(2)}
                </span>
              </DialogSubtitle>
            </div>{" "}
            <div className="flex w-fit items-center space-x-2 rounded-full border border-neutral-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
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
                className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
                onClick={incrementQuantity}
                disabled={!product.isAvailable}
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </motion.button>
            </div>
            <div className="flex space-x-4">
              <DialogDescription className="w-full">
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  className="text-md w-full"
                >
                  <ShoppingBag />
                  {t("addToCart")} ({quantity})
                </AddToCartButton>
              </DialogDescription>
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
  );
};

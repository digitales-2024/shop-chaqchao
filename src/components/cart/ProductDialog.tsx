"use client";
import { useCatalog } from "@/hooks/use-catalog";
import { Product } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useMemo, useCallback, memo } from "react";

import { BusinessInfoCart } from "../business/BusinessInfoCart";
import {
  DialogClose,
  DialogDescription,
  DialogSubtitle,
  DialogTitle,
} from "../common/Dialog";
import Gallery from "../common/Gallery";
import PulsatingDots from "../common/PulsatingDots";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { AddToCartButton } from "./AddToCartButton";

interface ProductDialogProps {
  product: Product;
}

const QuantitySelector = memo(
  ({
    quantity,
    incrementQuantity,
    decrementQuantity,
    maxStock,
    isAvailable,
  }: {
    quantity: number;
    incrementQuantity: () => void;
    decrementQuantity: () => void;
    maxStock: number;
    isAvailable: boolean;
  }) => (
    <div className="flex w-fit items-center space-x-2 rounded-full border border-neutral-200">
      <button
        className="flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
        onClick={decrementQuantity}
        disabled={!isAvailable}
        aria-label="Reducir cantidad"
      >
        <Minus className="h-4 w-4 text-gray-600" />
      </button>
      <span className="w-8 text-center text-lg font-semibold">{quantity}</span>
      <button
        className="flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 disabled:opacity-50"
        onClick={incrementQuantity}
        disabled={!isAvailable || quantity >= maxStock}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  ),
);

QuantitySelector.displayName = "QuantitySelector";

const ProductDetailSection = memo(
  ({ product, t }: { product: Product; t: (key: string) => string }) => (
    <div className="space-y-3">
      <h3 className="font-nunito font-semibold text-gray-800">{t("detail")}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
    </div>
  ),
);

ProductDetailSection.displayName = "ProductDetailSection";

export const ProductDialog = memo(({ product }: ProductDialogProps) => {
  const [quantity, setQuantity] = useState(1);

  const { productById, isLoadingProductById, refetchProductById } = useCatalog({
    id: product.id,
  });

  const maxStock = useMemo(
    () => productById?.maxStock ?? product.maxStock,
    [productById?.maxStock, product.maxStock],
  );

  const incrementQuantity = useCallback(
    () => setQuantity((prev) => (prev < maxStock ? prev + 1 : prev)),
    [maxStock],
  );

  const decrementQuantity = useCallback(
    () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)),
    [],
  );

  const t = useTranslations("cartItem");

  useEffect(() => {
    if (product) {
      refetchProductById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  if (isLoadingProductById) {
    return (
      <div className="flex h-full items-center justify-center">
        <PulsatingDots />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full max-h-[95vh]">
      <div className="grid h-full gap-x-6 md:grid-cols-2">
        <div className="flex h-full w-full items-center justify-center p-4">
          {product.images && product.images.length > 0 && (
            <div className="h-full w-full max-w-[600px]">
              <Gallery images={product.images} label={product.name} />
            </div>
          )}
        </div>
        <div className="space-y-4 px-4 py-10 md:py-12 lg:px-6 lg:py-16">
          <DialogTitle>
            <p className="font-nunito text-3xl font-black capitalize md:text-4xl">
              {product.name}
            </p>
          </DialogTitle>
          <span className="text-sm font-bold capitalize text-terciary">
            {product.category.name}
          </span>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <DialogSubtitle>
                <span className="text-2xl font-bold md:text-3xl">
                  S/. {product.price.toFixed(2)}
                </span>
              </DialogSubtitle>
            </div>{" "}
            <QuantitySelector
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              maxStock={maxStock}
              isAvailable={product.isAvailable}
            />
            <div className="flex space-x-4">
              <DialogDescription className="w-full">
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  className="inline-flex h-12 w-full items-center justify-center text-base md:h-14 md:text-lg"
                >
                  {t("addToCart")} ({quantity})
                </AddToCartButton>
              </DialogDescription>
            </div>
          </div>
          <ProductDetailSection product={product} t={t} />
          <BusinessInfoCart />
        </div>
      </div>
      <DialogClose />
    </ScrollArea>
  );
});

ProductDialog.displayName = "ProductDialog";

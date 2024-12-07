"use client";
import { useCatalog } from "@/hooks/use-catalog";
import { useTranslations } from "next-intl";

import { CartItem } from "../cart/CartItem";
import { CartSkeleton } from "../cart/CartSkeleton";
import { LineTitle } from "../common/LineTitle";

interface FeaturedHeaderProps {
  children: React.ReactNode;
}

const FeaturedHeader: React.FC<FeaturedHeaderProps> = ({ children }) => {
  const t = useTranslations("features");

  return (
    <section className="container mx-auto flex flex-col gap-20 py-40">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <LineTitle className="hidden text-primary sm:flex" />
        <h2 className="flex-col gap-2 text-center text-3xl font-semibold">
          <span className="text-balance">
            {t("title")}{" "}
            <span className="font-black uppercase text-secondary">
              chaqchao
            </span>
          </span>
          <p className="text-balance text-lg">{t("subtitle")}</p>
        </h2>
        <LineTitle className="hidden rotate-180 text-primary sm:flex" />
      </div>
      <div className="grid justify-items-center gap-20 [grid-template-columns:_repeat(auto-fit,_minmax(300px,_1fr))]">
        {children}
      </div>
    </section>
  );
};

export const Featured = () => {
  const { productMerch, isLoadingProductMerch } = useCatalog();

  if (isLoadingProductMerch || !productMerch) {
    return (
      <FeaturedHeader>
        {[...Array(4)].map((_, index) => (
          <CartSkeleton key={index} />
        ))}
      </FeaturedHeader>
    );
  }

  return (
    <FeaturedHeader>
      {productMerch.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}
    </FeaturedHeader>
  );
};

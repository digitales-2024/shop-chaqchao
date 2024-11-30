"use client";
import { useCatalog } from "@/hooks/use-catalog";
import { useTranslations } from "next-intl";

import { CartItem } from "../cart/CartItem";
import { CartSkeleton } from "../cart/CartSkeleton";
import { LineTitle } from "../common/LineTitle";

interface RecommendHeaderProps {
  children: React.ReactNode;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ children }) => {
  const t = useTranslations("recommendations");

  return (
    <section className="relative flex w-full flex-col py-40">
      <div className="container mx-auto flex w-full flex-col gap-40">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
          <LineTitle className="hidden text-primary sm:flex" />
          <h2 className="text-center text-3xl font-semibold">
            <span className="text-balance">{t("title")}</span>
            <p className="text-lg text-secondary">{t("subtitle")}</p>
          </h2>
          <LineTitle className="hidden rotate-180 text-primary sm:flex" />
        </div>
        <div className="grid justify-items-center gap-6 [grid-template-columns:_repeat(auto-fit,_minmax(22rem,_1fr))]">
          {children}
        </div>
      </div>
    </section>
  );
};

export const Recommend = () => {
  const { productRecommend, isLoadingProductRecommend } = useCatalog();
  if (isLoadingProductRecommend || !productRecommend) {
    return (
      <RecommendHeader>
        {[...Array(4)].map((_, index) => (
          <CartSkeleton key={index} />
        ))}
      </RecommendHeader>
    );
  }

  return (
    <RecommendHeader>
      {productRecommend.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </RecommendHeader>
  );
};

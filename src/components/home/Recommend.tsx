"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartItem } from "../cart/CartItem";
import { CartSkeleton } from "../cart/CartSkeleton";

interface RecommendHeaderProps {
  children: React.ReactNode;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ children }) => {
  return (
    <section className="flex flex-col gap-20">
      <h2 className="text-center text-3xl font-semibold">
        Recomendados para ti
      </h2>
      <div className="flex gap-6">{children}</div>
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
      {productRecommend?.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </RecommendHeader>
  );
};

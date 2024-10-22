"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartItem } from "../cart/CartItem";
import { CartSkeleton } from "../cart/CartSkeleton";
import { BusinessSchedule } from "../common/Schedule";

interface RecommendHeaderProps {
  children: React.ReactNode;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ children }) => {
  return (
    <section className="flex flex-col gap-20">
      <div className="flex flex-col items-center">
        <BusinessSchedule />
        <h2 className="mb-10 text-center text-3xl font-semibold">
          <span className="text-balance">
            Explora nuestros productos recomendados
          </span>
          <p className="text-lg text-secondary">
            Nuestras opciones variadas de chocolates, cremas, lipbalm, entre
            otros.
          </p>
        </h2>
      </div>
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

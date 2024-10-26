"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartItem } from "../cart/CartItem";
import { CartSkeleton } from "../cart/CartSkeleton";
import { BusinessSchedule } from "../common/Schedule";
import { SeparateSection } from "../common/SeparateSection";

interface RecommendHeaderProps {
  children: React.ReactNode;
}

const RecommendHeader: React.FC<RecommendHeaderProps> = ({ children }) => {
  return (
    <section className="relative flex w-full flex-col bg-primary-foreground p-40">
      <div className="container mx-auto flex flex-col gap-40">
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
        <div className="grid gap-y-40 [grid-template-columns:_repeat(auto-fit,_minmax(300px,_1fr))]">
          {children}
        </div>
      </div>
      <SeparateSection className="absolute bottom-full left-0 rotate-180 text-primary-foreground" />
      <SeparateSection className="absolute left-0 top-full text-primary-foreground" />
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

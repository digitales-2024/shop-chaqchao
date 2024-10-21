"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartItem } from "../cart/CartItem";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

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
          <Card key={index} className="h-auto w-60">
            <div className="flex flex-col items-center justify-center gap-4 px-2 py-10">
              <Skeleton className="size-32 rounded"></Skeleton>
              <Skeleton className="h-20 w-48 rounded"></Skeleton>
            </div>
            <Skeleton className="m-4 h-10"></Skeleton>
          </Card>
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

"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartItem } from "../cart/CartItem";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const Recommend = () => {
  const { productRecommend, isLoadingProductRecommend } = useCatalog();
  if (isLoadingProductRecommend) {
    return (
      <section className="flex flex-col gap-20">
        <h2 className="text-center text-3xl font-semibold">
          Recomendados para ti
        </h2>
        <div className="flex gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="h-auto w-60">
              <div className="flex flex-col items-center justify-center gap-4 px-2 py-10">
                <Skeleton className="size-32 rounded"></Skeleton>
                <Skeleton className="h-20 w-48 rounded"></Skeleton>
              </div>
              <Skeleton className="m-4 h-10"></Skeleton>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!productRecommend) {
    return <div>No hay productos recomendados</div>;
  }

  return (
    <section className="flex flex-col gap-20">
      <h2 className="mb-20 text-center text-3xl font-semibold">
        Recomendados para ti
      </h2>
      <div className="flex gap-6">
        {productRecommend?.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

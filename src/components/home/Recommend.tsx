"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartItem } from "../cart/CartItem";

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
            <div
              key={index}
              className="h-auto w-60 animate-pulse border border-gray-300 shadow-none transition-all duration-500 hover:shadow-md"
            >
              <div className="flex flex-col items-center justify-center gap-4 px-2 py-10">
                <div className="h-20 w-48 rounded bg-gray-300"></div>
                <div className="grid h-full grid-rows-[auto,1fr,30px] gap-4 text-center">
                  <div className="h-4 w-full rounded bg-gray-300"></div>
                  <div className="h-6 w-3/4 self-center rounded bg-gray-300"></div>
                  <div className="h-6 w-1/2 self-center rounded bg-gray-300"></div>
                </div>
              </div>
              <div className="border-t border-gray-300 p-3">
                <div className="h-10 rounded bg-gray-300"></div>
              </div>
            </div>
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
      <h2 className="text-center text-3xl font-semibold">
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

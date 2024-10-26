"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartSkeleton } from "../cart/CartSkeleton";
import { MerchItem } from "../cart/MerchItem";
import { LineTitle } from "../common/LineTitle";

interface FeaturedHeaderProps {
  children: React.ReactNode;
}

const FeaturedHeader: React.FC<FeaturedHeaderProps> = ({ children }) => {
  return (
    <section className="container mx-auto flex flex-col gap-20 py-40">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <LineTitle className="hidden text-primary sm:flex" />
        <h2 className="flex-col gap-2 text-center text-3xl font-semibold">
          <span className="text-balance">
            Productos especiales de{" "}
            <span className="font-black uppercase text-secondary">
              chaqchao
            </span>
          </span>
          <p className="text-balance text-lg">
            ¡Vea nuestros productos especiales que puede obtener!
          </p>
        </h2>
        <LineTitle className="hidden rotate-180 text-primary sm:flex" />
      </div>
      <div className="grid gap-20 [grid-template-columns:_repeat(auto-fit,_minmax(300px,_1fr))]">
        {children}
      </div>
    </section>
  );
};

export const Featured = () => {
  const { productRecommend, isLoadingProductRecommend } = useCatalog();

  if (isLoadingProductRecommend || !productRecommend) {
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
      {productRecommend.map((product, index) => (
        <MerchItem key={index} product={product} />
      ))}
    </FeaturedHeader>
  );
};

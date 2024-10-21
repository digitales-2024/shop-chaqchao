"use client";
import { useCatalog } from "@/hooks/use-catalog";

import { CartSkeleton } from "../cart/CartSkeleton";
import { MerchItem } from "../cart/MerchItem";

interface FeaturedHeaderProps {
  children: React.ReactNode;
}

const FeaturedHeader: React.FC<FeaturedHeaderProps> = ({ children }) => {
  return (
    <section className="flex flex-col gap-20">
      <h2 className="flex flex-col gap-2 text-center text-3xl font-semibold">
        <span className="text-balance">
          Productos especiales de{" "}
          <span className="font-black uppercase text-secondary">chaqchao</span>
        </span>
        <p className="text-balance text-lg">
          ¡Vea nuestros productos especiales que puede obtener!
        </p>
      </h2>
      <div className="flex gap-6">{children}</div>
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

"use client";
import { useCatalog } from "@/hooks/use-catalog";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { CartItem } from "@/components/cart/CartItem";
import {
  FilterableProductList,
  Filters,
} from "@/components/categories/FilterableProductList";
import { SheetFiltersMobile } from "@/components/categories/SheetFiltersMobile";

import { SearchProducts } from "./SearchProduts";

const MotionCard = motion.create(CartItem);

export const ProductsFilters = () => {
  const [filters, setFilters] = useState<Filters>({});

  const { productFilters } = useCatalog({
    filters,
  });

  const t = useTranslations("categories");
  return (
    <>
      <div className="flex flex-col items-start sm:flex-row">
        <div className="mb-10 flex w-full flex-col">
          <h1 className="font-riddle text-[clamp(2.5rem,_4.5vw,_4.5rem)]">
            {t("title")}
          </h1>
          <p>{t("description")}</p>
        </div>
        <SheetFiltersMobile filters={filters} setFilters={setFilters} />
      </div>
      <SearchProducts filters={filters} setFilters={setFilters} />
      <div className="flex flex-col lg:flex-row">
        <aside className="sticky top-28 hidden max-h-screen self-start lg:block lg:w-1/4 lg:pr-8">
          <FilterableProductList filters={filters} setFilters={setFilters} />
        </aside>
        <main className="flex-1">
          <motion.div
            className="grid grid-cols-[repeat(auto-fill,_minmax(22rem,_1fr))] justify-items-center gap-6 gap-y-16"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence>
              {productFilters?.map((product) => (
                <MotionCard
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  product={product}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </>
  );
};

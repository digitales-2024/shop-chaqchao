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
import { LineTitle } from "@/components/common/LineTitle";

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
      <div className="mb-6 flex flex-col items-start sm:flex-row">
        <div className="mb-10 flex w-full flex-col gap-2">
          <motion.h1
            className="py-5 font-nunito text-6xl font-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("description")}
          </motion.p>
          <LineTitle className="w-full rotate-180 text-primary" />
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

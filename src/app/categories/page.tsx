"use client";
import { useCatalog } from "@/hooks/use-catalog";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { useState } from "react";

import { CartItem } from "@/components/cart/CartItem";
import {
  FilterableProductList,
  Filters,
} from "@/components/categories/FilterableProductList";
import { LineTitle } from "@/components/common/LineTitle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MotionCard = motion(CartItem);

export default function PageCategories() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const { productFilters } = useCatalog({
    filters,
  });

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="mb-10 flex w-full flex-col gap-2">
          <motion.h1
            className="py-5 font-nunito text-6xl font-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Todos nuestros productos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Elija entre nuestra amplia variedad de productos y disfrute de la
            mejor calidad.
          </motion.p>
          <LineTitle className="w-full rotate-180 text-primary" />
        </div>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="mt-8">
              <FilterableProductList
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col lg:flex-row">
        <aside className="sticky top-32 hidden max-h-screen self-start overflow-y-auto lg:block lg:w-1/4 lg:pr-8">
          <FilterableProductList filters={filters} setFilters={setFilters} />
        </aside>
        <main className="flex-1">
          <motion.div
            className="grid gap-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
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
    </div>
  );
}

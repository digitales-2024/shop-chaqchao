"use client";
import { useCategory } from "@/hooks/use-category";
import { motion } from "framer-motion";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

export interface Filters {
  name?: string;
  priceMax?: number;
  priceMin?: number;
  categoryName?: string;
}

interface FilterableProductListProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
}

export const FilterableProductList = ({
  setFilters,
  filters,
}: FilterableProductListProps) => {
  const handleFilterChange = (name: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const { dataCategories, isLoadingCategories, isErrorCategories } =
    useCategory();

  const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([
    "item-1",
    "item-2",
  ]);
  if (isLoadingCategories) return null;

  if (isErrorCategories) return <div>Error</div>;

  if (!dataCategories) return null;

  return (
    <Accordion
      type="multiple"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-nunito text-lg font-extrabold">
          Categorías
        </AccordionTrigger>
        <AccordionContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {Array.from(new Set(dataCategories.map((p) => p.name))).map(
              (category) => (
                <motion.div
                  key={category}
                  className="mb-2 flex items-center space-x-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categoryName === category}
                    onCheckedChange={
                      filters.categoryName === category
                        ? () => handleFilterChange("categoryName", "")
                        : () => handleFilterChange("categoryName", category)
                    }
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </motion.div>
              ),
            )}
          </motion.div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="font-nunito text-lg font-extrabold">
          Precio
        </AccordionTrigger>
        <AccordionContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="py-5"
          >
            <Slider
              min={0}
              max={100}
              step={0.5}
              className="text-primary"
              value={
                filters.priceMin === undefined || filters.priceMax === undefined
                  ? [0, 100]
                  : [filters.priceMin, filters.priceMax]
              }
              onValueChange={(value) => {
                handleFilterChange("priceMin", value[0]);
                handleFilterChange("priceMax", value[1]);
              }}
            />
            <div className="mt-2 flex justify-between text-sm">
              <span>
                S/.
                {filters.priceMin === undefined
                  ? 0
                  : filters.priceMin.toFixed(2)}
              </span>
              <span>
                S/.
                {filters.priceMax === undefined
                  ? 100
                  : filters.priceMax.toFixed(2)}
              </span>
            </div>
          </motion.div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

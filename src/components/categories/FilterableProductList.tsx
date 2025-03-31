"use client";

import { useCategory } from "@/hooks/use-category";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

export interface Filters {
  name?: string;
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
  const t = useTranslations("categories");

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

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({});
  };

  if (isLoadingCategories) return null;

  if (isErrorCategories) return <div>Error</div>;

  if (!dataCategories) return null;

  return (
    <>
      {/* Filtros por Categoría y Precio */}

      <ScrollArea className="h-[90vh]">
        <Accordion
          type="multiple"
          value={openAccordionItems}
          onValueChange={setOpenAccordionItems}
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-nunito text-lg font-extrabold">
              {t("filters.categories")}
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
                        aria-label={category}
                        onCheckedChange={
                          filters.categoryName === category
                            ? () => handleFilterChange("categoryName", "")
                            : () => handleFilterChange("categoryName", category)
                        }
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="capitalize"
                      >
                        {category}
                      </Label>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      {/* Botón para Limpiar Filtros */}
      {Object.keys(filters).length < 1 ? null : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 inline-flex w-full justify-end"
        >
          <Button
            onClick={handleClearFilters}
            className="inline-flex items-center justify-center gap-2"
            disabled={Object.keys(filters).length < 1}
          >
            <Settings2 />
            {t("filters.clearFilters")}
          </Button>
        </motion.div>
      )}
    </>
  );
};

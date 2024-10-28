"use client";
import { useCategory } from "@/hooks/use-category";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";

export interface Filters {
  name?: string;
  priceMax?: number;
  priceMin?: number;
  categoryName?: string;
}

const PRICES = {
  min: 0,
  max: 300,
};

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

  const [isPreciseInput, setIsPreciseInput] = useState(false);

  const handlePreciseInputToggle = (checked: boolean) => {
    setIsPreciseInput(checked);
    handleFilterChange("priceMin", PRICES.min);
    handleFilterChange("priceMax", PRICES.max);
  };
  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({});
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    // Elimina ceros iniciales
    if (value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }

    // Si el valor es una cadena vacía, actualiza el estado sin hacer validaciones numéricas
    if (value === "") {
      handleFilterChange("priceMin", "");
      return;
    }

    // Convierte a número y aplica validaciones de rango
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      if (numericValue < PRICES.min) {
        value = PRICES.min.toString();
      } else if (numericValue > PRICES.max) {
        value = PRICES.max.toString();
      }
    }

    handleFilterChange("priceMin", value);

    // Si el precio máximo es menor que el nuevo mínimo, ajusta el máximo
    if (
      filters.priceMax !== undefined &&
      parseInt(filters.priceMax.toString(), 10) < parseInt(value, 10)
    ) {
      handleFilterChange("priceMax", value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    // Elimina ceros iniciales
    if (value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }

    // Si el valor es una cadena vacía, actualiza el estado sin hacer validaciones numéricas
    if (value === "") {
      handleFilterChange("priceMax", "");
      return;
    }

    // Convierte a número y aplica validaciones de rango y relación con priceMin
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      if (numericValue < PRICES.min) {
        value = PRICES.min.toString();
      } else if (numericValue > PRICES.max) {
        value = PRICES.max.toString();
      }
    }

    handleFilterChange("priceMax", value);
  };

  if (isLoadingCategories) return null;

  if (isErrorCategories) return <div>Error</div>;

  if (!dataCategories) return null;

  return (
    <>
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
              className="flex flex-col gap-6 px-2 py-5"
            >
              {" "}
              <AnimatePresence mode="wait">
                {isPreciseInput ? (
                  <motion.div
                    key="precise-input"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="relative">
                      S/.
                      <Input
                        type="text"
                        className="pl-7"
                        value={filters.priceMin}
                        onChange={handleMinPriceChange}
                      />
                    </div>
                    <span>-</span>
                    <div className="relative">
                      S/.
                      <Input
                        type="text"
                        className="pl-7"
                        value={filters.priceMax}
                        onChange={handleMaxPriceChange}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="slider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Slider
                      min={0}
                      max={100}
                      step={0.5}
                      className="text-primary"
                      value={
                        filters.priceMin === undefined ||
                        filters.priceMax === undefined
                          ? [PRICES.min, PRICES.max]
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
                          ? PRICES.min
                          : filters.priceMin.toFixed(2)}
                      </span>
                      <span>
                        S/.
                        {filters.priceMax === undefined
                          ? PRICES.max
                          : filters.priceMax.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center justify-end space-x-2">
                <Label htmlFor="price-range-toggle" className="text-xs">
                  Entrada Precisa
                </Label>
                <Switch
                  id="price-range-toggle"
                  checked={isPreciseInput}
                  onCheckedChange={handlePreciseInputToggle}
                />
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
            Limpiar filtros
          </Button>
        </motion.div>
      )}
    </>
  );
};

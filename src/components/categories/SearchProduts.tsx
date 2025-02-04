"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Filters } from "./FilterableProductList";

interface SearchProductsProps {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
}

export const SearchProducts = ({
  filters,
  setFilters,
}: SearchProductsProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const t = useTranslations("categories");

  return (
    <div className="w-full py-4">
      <div
        className={cn(
          "relative flex w-full items-center justify-center rounded-full bg-primary-foreground transition-all duration-300",
        )}
      >
        <Search
          className={cn("absolute left-3 h-5 w-5 text-gray-400", {
            "text-primary": isFocused,
          })}
        />
        <input
          type="text"
          placeholder={t("search")}
          value={filters.name ? filters.name : isFocused ? "" : ""}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, name: e.target.value }));
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent py-4 pl-10 pr-4 outline-none"
        />
        <AnimatePresence>
          {filters.name && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setFilters((prev) => ({ ...prev, name: "" }));
              }}
              className="absolute right-3"
            >
              <X className="h-5 w-5 text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

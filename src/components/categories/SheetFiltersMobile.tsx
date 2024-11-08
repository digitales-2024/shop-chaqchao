import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  FilterableProductList,
  Filters,
} from "@/components/categories/FilterableProductList";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SheetFiltersMobileProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const SheetFiltersMobile = ({
  filters,
  setFilters,
}: SheetFiltersMobileProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations("categories");
  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="lg:hidden">
            <Filter className="mr-2 h-4 w-4" />
            {t("filters.button")}
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <ScrollArea className="h-screen px-2">
          <div className="">
            <FilterableProductList filters={filters} setFilters={setFilters} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

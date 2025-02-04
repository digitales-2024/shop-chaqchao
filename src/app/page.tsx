import { LayoutShop } from "@/components/templates/LayoutShop";
import { ProductsFilters } from "@/components/categories/ProductsFilters";

export default function Home() {
  return (
    <LayoutShop>
      <ProductsFilters />
    </LayoutShop>
  );
}

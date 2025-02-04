import LayoutShop from "./(shop)/layout";
import { ProductsFilters } from "@/components/categories/ProductsFilters";

export default function Home() {
  return (
    <LayoutShop>
      <ProductsFilters />
    </LayoutShop>
  );
}

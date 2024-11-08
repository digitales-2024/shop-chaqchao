import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProductsFilters } from "@/components/categories/ProductsFilters";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("categories.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PageCategories() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <ProductsFilters />
    </div>
  );
}

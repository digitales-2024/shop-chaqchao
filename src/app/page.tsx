"use client";
import {
  MensajeEmergente,
  ProductsFilters,
} from "@/components/categories/ProductsFilters";
import { LayoutShop } from "@/components/templates/LayoutShop";

export default function Home() {
  return (
    <LayoutShop>
      <ProductsFilters />
      <MensajeEmergente />
    </LayoutShop>
  );
}

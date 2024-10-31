"use client";

import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Función para redirigir a /products
  const redirectToProducts = () => {
    router.push("/categories");
  };

  // Función para manejar clic en el ícono de búsqueda
  const toggleSearch = () => {
    if (!isSearchVisible) {
      redirectToProducts();
    }
  };

  return (
    <div ref={searchRef} className="relative flex items-center gap-2">
      <button
        onClick={toggleSearch}
        aria-label="Buscar"
        className={cn(
          "relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:scale-105 hover:bg-background",
          {
            "bg-background hover:bg-background": isSearchVisible,
          },
        )}
      >
        <Search />
      </button>
    </div>
  );
}

import {
  useGetProductByIdQuery,
  useGetProductsFiltersQuery,
} from "@/redux/services/catalogApi";
import { socket } from "@/socket/socket";
import { useEffect } from "react";

import { Filters } from "@/components/categories/FilterableProductList";

interface CatalogProps {
  id?: string;
  filters?: Filters;
}

export const useCatalog = (
  { id, filters }: CatalogProps = { id: "", filters: {} },
) => {
  const {
    data: productFilters,
    isLoading: isLoadingProductFilters,
    isError: isErrorProductFilters,
    isSuccess: isSuccessProductFilters,
    error: errorProductFilters,
    refetch: refetchProductFilters,
  } = useGetProductsFiltersQuery(
    {
      filters: filters as Filters,
    },
    {
      skip: !filters,
    },
  );

  const {
    data: productById,
    isLoading: isLoadingProductById,
    refetch: refetchProductById,
  } = useGetProductByIdQuery(
    {
      id: id as string,
    },
    {
      skip: !id,
    },
  );

  // Manejo de eventos de socket
  useEffect(() => {
    const handleProducts = () => {
      if (productFilters) {
        refetchProductFilters();
      }

      if (productById) {
        refetchProductById();
      }
    };

    socket.on("product-availability-updated", handleProducts);

    return () => {
      socket.off("product-availability-updated", handleProducts);
    };
  }, [productFilters, refetchProductFilters, productById, refetchProductById]);

  return {
    productFilters,
    isLoadingProductFilters,
    isErrorProductFilters,
    isSuccessProductFilters,
    errorProductFilters,
    productById,
    isLoadingProductById,
    refetchProductById,
  };
};

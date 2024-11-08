import {
  useGetMerchQuery,
  useGetProductsFiltersQuery,
  useGetProductsRecommendByClientQuery,
  useGetProductsRecommendQuery,
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
    data: productRecommend,
    isLoading: isLoadingProductRecommend,
    refetch: refetchProductRecommend,
  } = useGetProductsRecommendQuery();

  const {
    data: productMerch,
    isLoading: isLoadingProductMerch,
    refetch: refetchProductMerch,
  } = useGetMerchQuery();

  const {
    data: productRecommendByClient,
    isLoading: isLoadingProductRecommendByClient,
    refetch: refetchProductRecommendByClient,
  } = useGetProductsRecommendByClientQuery(
    {
      id: id || "",
    },
    {
      skip: !id,
    },
  );

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

  // Manejo de eventos de socket

  useEffect(() => {
    const handleProducts = () => {
      if (productRecommend) {
        refetchProductRecommend();
      }
      if (productRecommendByClient) {
        refetchProductRecommendByClient();
      }

      if (productMerch) {
        refetchProductMerch();
      }

      if (productFilters) {
        refetchProductFilters();
      }
    };

    socket.on("product-availability-updated", handleProducts);

    return () => {
      socket.off("product-availability-updated", handleProducts);
    };
  }, [
    productRecommend,
    refetchProductRecommend,
    productRecommendByClient,
    refetchProductRecommendByClient,
    productMerch,
    refetchProductMerch,
    productFilters,
    refetchProductFilters,
  ]);

  return {
    productRecommend,
    isLoadingProductRecommend,
    productRecommendByClient,
    isLoadingProductRecommendByClient,
    productFilters,
    isLoadingProductFilters,
    isErrorProductFilters,
    isSuccessProductFilters,
    errorProductFilters,
    productMerch,
    isLoadingProductMerch,
  };
};

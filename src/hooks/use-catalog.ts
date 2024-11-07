import {
  useGetMerchQuery,
  useGetProductsFiltersQuery,
  useGetProductsRecommendByClientQuery,
  useGetProductsRecommendQuery,
} from "@/redux/services/catalogApi";

import { Filters } from "@/components/categories/FilterableProductList";

interface CatalogProps {
  id?: string;
  filters?: Filters;
}

export const useCatalog = (
  { id, filters }: CatalogProps = { id: "", filters: {} },
) => {
  const { data: productRecommend, isLoading: isLoadingProductRecommend } =
    useGetProductsRecommendQuery();

  const { data: productMerch, isLoading: isLoadingProductMerch } =
    useGetMerchQuery();

  const {
    data: productRecommendByClient,
    isLoading: isLoadingProductRecommendByClient,
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
  } = useGetProductsFiltersQuery(
    {
      filters: filters as Filters,
    },
    {
      skip: !filters,
    },
  );

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

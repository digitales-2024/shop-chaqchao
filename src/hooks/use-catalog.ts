import {
  useGetProductsRecommendByClientQuery,
  useGetProductsRecommendQuery,
} from "@/redux/services/catalogApi";

interface CatalogProps {
  id?: string;
}

export const useCatalog = ({ id }: CatalogProps = { id: "" }) => {
  const { data: productRecommend, isLoading: isLoadingProductRecommend } =
    useGetProductsRecommendQuery();

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

  return {
    productRecommend,
    isLoadingProductRecommend,
    productRecommendByClient,
    isLoadingProductRecommendByClient,
  };
};

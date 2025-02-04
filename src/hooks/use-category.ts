import {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
} from "@/redux/services/categoryApi";

interface CategoryProps {
  id?: string;
}

export const useCategory = ({ id }: CategoryProps = { id: "" }) => {
  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    isSuccess: isSuccessCategories,
    error: errorCategories,
  } = useGetCategoriesQuery();

  const {
    data: dataCategoryProducts,
    isLoading: isLoadingCategoryProducts,
    isError: isErrorCategoryProducts,
    isSuccess: isSuccessCategoryProducts,
    error: errorCategoryProducts,
  } = useGetCategoryProductsQuery(
    {
      id: id || "",
    },
    {
      skip: !id,
    },
  );

  return {
    dataCategories,
    isLoadingCategories,
    isErrorCategories,
    isSuccessCategories,
    errorCategories,
    dataCategoryProducts,
    isLoadingCategoryProducts,
    isErrorCategoryProducts,
    isSuccessCategoryProducts,
    errorCategoryProducts,
  };
};

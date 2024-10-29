import { useGetCategoriesQuery } from "@/redux/services/categoryApi";

export const useCategory = () => {
  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    isSuccess: isSuccessCategories,
    error: errorCategories,
  } = useGetCategoriesQuery();

  return {
    dataCategories,
    isLoadingCategories,
    isErrorCategories,
    isSuccessCategories,
    errorCategories,
  };
};

import { useGetCategoriesQuery } from "@/redux/services/categoryApi";

export const useCategory = () => {
  const {
    data: dataCagories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    isSuccess: isSuccessCategories,
    error: errorCategories,
  } = useGetCategoriesQuery();

  return {
    dataCagories,
    isLoadingCategories,
    isErrorCategories,
    isSuccessCategories,
    errorCategories,
  };
};

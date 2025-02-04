import { useClassByDateMutation } from "@/redux/services/classApi";

export const useClass = () => {
  const [
    findClassByDate,
    { isLoading: isLoadingFindClassByDate, data: dataFindClassByDate },
  ] = useClassByDateMutation();

  return {
    findClassByDate,
    dataFindClassByDate,
    isLoadingFindClassByDate,
  };
};

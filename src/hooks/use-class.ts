import { useGetClassesByClientQuery } from "@/redux/services/classApi";

export const useClass = () => {
  const { data, isLoading, refetch } = useGetClassesByClientQuery({
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

import { useProfileQuery } from "@/redux/services/clientApi";

export const useProfile = () => {
  const {
    data: clienteData,
    refetch,
    isLoading,
  } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return {
    clienteData,
    refetch,
    isLoading,
  };
};

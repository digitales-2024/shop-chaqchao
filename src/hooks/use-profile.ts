import { useProfileQuery } from "@/redux/services/clientApi";

export const useProfile = () => {
  const {
    data: clientData,
    refetch,
    isLoading,
  } = useProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return {
    clientData,
    refetch,
    isLoading,
  };
};

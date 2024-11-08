import { useGetBusinessQuery } from "@/redux/services/businessApi";
import { Business } from "@/types";
import { useMemo } from "react";

export const useBusiness = () => {
  const { data, isLoading } = useGetBusinessQuery();
  const business: Business = useMemo(() => {
    if (isLoading && data) {
      return data;
    }
    return data ?? ({} as Business);
  }, [isLoading, data]);

  return { business, isLoading };
};

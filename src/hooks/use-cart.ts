import { useValidateCartMutation } from "@/redux/services/cartApi";

export const useCart = () => {
  const [
    validate,
    { data: dataValidate, isLoading: isLoadingValidate, error: errorValidate },
  ] = useValidateCartMutation();

  return {
    validate,
    dataValidate,
    isLoadingValidate,
    errorValidate,
  };
};

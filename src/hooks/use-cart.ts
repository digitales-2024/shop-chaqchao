import { useValidateCartMutation } from "@/redux/services/cartApi";
import { CartItem } from "@/types";
import { ErrorData } from "@/types/error";

export const useCart = () => {
  const [
    validate,
    { data: dataValidate, isLoading: isLoadingValidate, error: errorValidate },
  ] = useValidateCartMutation();

  const validateCart = async (cartItems: CartItem[]) => {
    try {
      if (cartItems.length > 0) {
        const response = await validate({
          cartItems: cartItems.map((item) => item.id),
        });

        return response;
      }
    } catch (error) {}
  };

  const validateItem = (item: string) => {
    if (errorValidate) {
      const errorData = (
        errorValidate as ErrorData<ErrorData<{ id: string }[]>>
      ).data;
      if (errorData) {
        const isAvailable = errorData.data.some((error) => error.id === item);
        return isAvailable;
      }
      return false;
    }
    return false;
  };

  return {
    validateCart,
    validateItem,
    dataValidate,
    isLoadingValidate,
    errorValidate,
  };
};

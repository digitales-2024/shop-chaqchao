import {
  useCreateCartMutation,
  useValidateCartMutation,
} from "@/redux/services/cartApi";
import { CartItem, CreateCart } from "@/types";
import { ErrorData } from "@/types/error";

export const useCart = () => {
  const [
    validate,
    { data: dataValidate, isLoading: isLoadingValidate, error: errorValidate },
  ] = useValidateCartMutation();

  const [create, { data: dataCreateCart, isLoading: isLoadingCreateCart }] =
    useCreateCartMutation();

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

  /**
   * Crear un carrito con los productos seleccionados
   * @param cart Carrito a crear
   * @returns Respuesta de la petición
   */
  const createCart = async (cart: CreateCart) => {
    try {
      const response = await create(cart);
      return response;
    } catch (error) {}
  };

  return {
    validateCart,
    validateItem,
    dataValidate,
    isLoadingValidate,
    errorValidate,
    createCart,
    isLoadingCreateCart,
    dataCreateCart,
  };
};

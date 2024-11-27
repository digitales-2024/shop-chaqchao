import { ShoppingDelete } from "@/assets/icons";
import {
  useAddItemToCartMutation,
  useCreateCartMutation,
  useMergeCartsMutation,
  useRemoveItemFromCartMutation,
  useUpdateItemQuantityMutation,
  useValidateActiveCartQuery,
  useValidateCartMutation,
} from "@/redux/services/cartApi";
import useCartStore from "@/redux/store/cart";
import { CartItem, Product } from "@/types";
import { ErrorData } from "@/types/error";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { createElement, useCallback, useMemo } from "react";
import { toast } from "sonner";

import { TypeUpdateItemQuantity } from "@/components/cart/EditItemQuantityButton";

import { useProfile } from "./use-profile";

export const useCart = () => {
  const t = useTranslations("errors.cart");
  const {
    addItemToCart,
    cartItems,
    id: cartIdFromStore,
    removeItemFromCart,
    decreaseQuantity,
    increaseQuantity,
    createCart,
  } = useCartStore();

  const [
    validate,
    { data: dataValidate, isLoading: isLoadingValidate, error: errorValidate },
  ] = useValidateCartMutation();

  const { clientData } = useProfile();

  const clientId = useMemo(() => clientData?.id, [clientData]);

  const [createCartMutation] = useCreateCartMutation();
  const [addItemToCartMutation] = useAddItemToCartMutation();
  const [mergeCartsMutation] = useMergeCartsMutation();
  const [removeItemToCartMutation] = useRemoveItemFromCartMutation();
  const [updateItemQuantityMutation] = useUpdateItemQuantityMutation();
  const { data: isActiveCartClient } = useValidateActiveCartQuery();

  /**
   * Validar los productos seleccionados
   * @param cartItems Productos a validar
   * @returns Respuesta de la petición
   */
  const validateCart = async (cartItems: CartItem[]): Promise<boolean> => {
    try {
      if (cartItems.length > 0) {
        const response = await validate({
          cartItems: cartItems.map((item) => item.id),
        });

        return response.data ? true : false;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  /**
   * Validar si un producto tiene un error
   * @param item Producto a validar
   * @returns Si el producto tiene un error
   */
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
   * Agregar un producto al carrito
   * @param item Producto a agregar
   * @returns Si el producto fue agregado
   */
  const addItemCard = useCallback(
    async (item: Product, quantity?: number) => {
      const itemCart = cartItems.find((item) => item.id === item.id);
      try {
        addItemToCart(item, quantity);
        let cartId = cartIdFromStore;

        if (!cartId) {
          cartId = createCart();
          await createCartMutation({ tempId: cartId, clientId }).unwrap();
        }

        await addItemToCartMutation({
          cartId,
          productId: item.id,
          quantity,
          clientId,
        }).unwrap();
      } catch (error) {
        if (itemCart && itemCart?.quantity > 0) {
          decreaseQuantity(item.id, quantity);
        }

        toast(t("title"), {
          description: t("addItemCart"),
          closeButton: true,
          className: "text-rose-500",
          icon: createElement(ShoppingBag),
        });
      }
    },
    [
      addItemToCart,
      cartIdFromStore,
      createCart,
      createCartMutation,
      addItemToCartMutation,
      decreaseQuantity,
      cartItems,
      t,
      clientId,
    ],
  );

  /**
   * Eliminar un producto del carrito
   * @param productId ID del producto a eliminar
   * @returns Si el producto fue eliminado
   */
  const removeItemCard = useCallback(
    async (productId: string) => {
      const item = cartItems.find((item) => item.id === productId) as Product;
      try {
        removeItemFromCart(productId);
        // Obtiene el ID del carrito activo desde el estado o localStorage
        const cartId = cartIdFromStore; // Asume una función que obtiene el ID actual

        if (!cartId) return;
        await removeItemToCartMutation({
          cartId,
          productId,
          clientId,
        }).unwrap();
      } catch (error) {
        addItemToCart(item);
        toast(t("title"), {
          description: t("removeItemCart"),
          closeButton: true,
          className: "text-rose-500",
          icon: createElement(ShoppingDelete),
        });
      }
    },
    [
      removeItemFromCart,
      cartItems,
      cartIdFromStore,
      removeItemToCartMutation,
      addItemToCart,
      t,
      clientId,
    ],
  );

  /**
   * Fusionar carritos
   * @param anonCartId ID del carrito anónimo
   * @returns Si los carritos fueron fusionados
   */
  const mergeCart = async (anonCartId: string) => {
    try {
      await mergeCartsMutation({ anonCartId }).unwrap();
    } catch (error) {
      toast(t("cart.title"), {
        description:
          "No pudimos fusionar los carritos. Por favor, inténtalo de nuevo.",
        closeButton: true,
        className: "text-rose-500",
        icon: createElement(ShoppingBag),
      });
    }
  };

  /**
   * Actualizar la cantidad de un producto en el carrito
   * @param productId ID del producto a actualizar
   * @param quantity Cantidad a actualizar
   * @returns Si la cantidad fue actualizada
   */
  const updateItemQuantity = useCallback(
    async (productId: string, type: TypeUpdateItemQuantity = "PLUS") => {
      const item = cartItems.find((item) => item.id === productId);
      try {
        // Obtiene el producto del carrito
        if (!item) return;
        // Si la cantidad es 1 y se intenta decrementar, se elimina el producto
        if (item.quantity === 1 && type === "MIN") {
          removeItemCard(productId);
          return;
        }

        // Incrementamos la cantidad
        if (type === "PLUS") {
          increaseQuantity(productId);
        }
        // Decrementamos la cantidad
        else if (type === "MIN") {
          decreaseQuantity(productId);
        }

        // Obtiene el ID del carrito activo desde el estado o localStorage
        const cartId = cartIdFromStore; // Asume una función que obtiene el ID actual

        if (!cartId) return;

        await updateItemQuantityMutation({
          cartId,
          productId,
          quantity: item.quantity,
          clientId,
        }).unwrap();
      } catch (error) {
        // Si hay un error, se restaura la cantidad del producto
        if (type === "PLUS") {
          decreaseQuantity(productId);
        } else if (type === "MIN") {
          increaseQuantity(productId);
        }

        toast(t("title"), {
          description: t("updateItemQuantity"),
          closeButton: true,
          className: "text-rose-500",
          icon: createElement(ShoppingBag),
        });
      }
    },
    [
      cartIdFromStore,
      cartItems,
      decreaseQuantity,
      increaseQuantity,
      removeItemCard,
      updateItemQuantityMutation,
      t,
      clientId,
    ],
  );

  /**
   * Eliminar carrito del estado
   * @returns Si el carrito fue eliminado
   */
  const clearCart = () => {
    return useCartStore.getState().clearCart();
  };

  return {
    validateCart,
    validateItem,
    dataValidate,
    isLoadingValidate,
    errorValidate,
    addItemCard,
    removeItemCard,
    mergeCart,
    updateItemQuantity,
    clearCart,
    isActiveCartClient,
  };
};

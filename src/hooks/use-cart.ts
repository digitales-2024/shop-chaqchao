import { ShoppingDelete } from "@/assets/icons";
import {
  useAddItemToCartMutation,
  useCartByTempIdMutation,
  useCheckoutCartMutation,
  useCompleteCartMutation,
  useCreateCartMutation,
  useRemoveItemFromCartMutation,
  useUpdateItemQuantityMutation,
  useValidateCartMutation,
} from "@/redux/services/cartApi";
import useCartStore from "@/redux/store/cart";
import { CartItem, InvoiceCreate, Product } from "@/types";
import { ErrorData } from "@/types/error";
import { PaymentStatus } from "@/types/invoice";
import { getCodeCountry } from "@/utils/getCodeCountry";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { createElement, useCallback, useMemo } from "react";
import { toast } from "sonner";

import { TypeUpdateItemQuantity } from "@/components/cart/EditItemQuantityButton";

import useCartDetail from "./use-cart-detail";
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
  const { contact, dateOrder, someonePickup, invoice, shippingToAnotherCity } =
    useCartDetail();
  const clientId = useMemo(() => clientData?.id, [clientData]);

  const [createCartMutation] = useCreateCartMutation();
  const [addItemToCartMutation] = useAddItemToCartMutation();
  const [removeItemToCartMutation] = useRemoveItemFromCartMutation();
  const [updateItemQuantityMutation] = useUpdateItemQuantityMutation();
  const [cartByTempIdMutation] = useCartByTempIdMutation();
  const [completeCartMutation] = useCompleteCartMutation();
  const [checkoutCartMutation] = useCheckoutCartMutation();

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
        let cartId = cartIdFromStore;
        addItemToCart(item, quantity);

        if (!cartId) {
          cartId = createCart();
          await createCartMutation({ tempId: cartId, clientId }).unwrap();
        } else {
          const cartDB = await cartByTempIdMutation(cartId).unwrap();
          // Si el carrito no existe en la base de datos, se crea
          if (!cartDB) {
            clearCart();
            cartId = createCart();
            addItemToCart(item, quantity);
            await createCartMutation({ tempId: cartId, clientId }).unwrap();
          }
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
      cartByTempIdMutation,
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

  /**
   * Completar el pago y crear una orden
   * @returns Si el pago fue completado
   */
  const completeCart = async () => {
    await validateCart(cartItems);
    if (cartItems.length === 0)
      throw new Error("No hay productos en el carrito");

    const cartId = cartIdFromStore;
    if (!cartId) throw new Error("No se ha seleccionado un carrito");

    if (dateOrder.fullDate === undefined)
      throw new Error("No se ha seleccionado una fecha de entrega");

    try {
      await completeCartMutation({
        cartId,
        data: {
          customerName: contact.name,
          customerLastName: contact.lastName,
          customerEmail: contact.email,
          customerPhone: contact.phone,
          someonePickup: someonePickup,
          shippingToAnotherCity: shippingToAnotherCity,
          pickupTime: new Date(dateOrder.fullDate),
          clientId,
        },
      }).unwrap();
    } catch (error) {
      throw error;
    }
  };

  /**
   * Realizar el pago y actualizar el estado de la orden
   */
  const checkoutCart = async (status: string) => {
    try {
      const cartId = cartIdFromStore;
      if (!cartId) {
        return;
      }

      const invoiceCreate: InvoiceCreate = {
        billingDocumentType: invoice.typeInvoice,
        typeDocument: invoice.documentType,
        documentNumber: invoice.number,
        address: invoice.address,
        city: invoice.city,
        state: invoice.state,
        country: getCodeCountry(invoice.country),
        businessName: invoice.nameBusiness ?? "",
        paymentStatus: status as PaymentStatus,
      };

      await checkoutCartMutation({
        cartId,
        invoice: invoiceCreate,
      });
    } catch (error) {
      toast.error(t("errors.checkout"), { position: "top-center" });
    }
  };

  return {
    validateCart,
    validateItem,
    dataValidate,
    isLoadingValidate,
    errorValidate,
    addItemCard,
    removeItemCard,
    updateItemQuantity,
    clearCart,
    completeCart,
    checkoutCart,
  };
};

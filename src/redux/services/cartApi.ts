import { CartItem, CreateCart } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    // Validar la disponibilidad de los productos de un carrito
    validateCart: build.mutation<void, { cartItems: string[] }>({
      query: (cartItems) => ({
        url: "/cart/validate",
        method: "POST",
        body: cartItems,
        credentials: "include",
      }),

      invalidatesTags: ["Cart"],
    }),

    // Crear un carrito
    createCart: build.mutation<
      { id: string; cartItems: CartItem[]; amountTotal: number },
      CreateCart
    >({
      query: (cart) => ({
        url: "/cart",
        method: "POST",
        body: cart,
      }),

      invalidatesTags: ["Cart"],
    }),

    // Agregar un producto al carrito
    addItemToCart: build.mutation<
      void,
      {
        cartId: string;
        productId: string;
        quantity?: number;
        clientId?: string;
      }
    >({
      query: ({ cartId, productId, quantity, clientId }) => ({
        url: `/cart/${cartId}/items`,
        method: "POST",
        body: { productId, quantity, clientId },
      }),

      invalidatesTags: ["Cart"],
    }),

    // Actualizar la cantidad de un producto en el carrito
    updateItemQuantity: build.mutation<
      void,
      { cartId: string; productId: string; quantity: number; clientId?: string }
    >({
      query: ({ cartId, productId, quantity, clientId }) => ({
        url: `/cart/${cartId}/items/${productId}`,
        method: "PATCH",
        body: { quantity, clientId },
      }),

      invalidatesTags: ["Cart"],
    }),

    // Eliminar un producto del carrito
    removeItemFromCart: build.mutation<
      void,
      { cartId: string; productId: string; clientId?: string }
    >({
      query: ({ cartId, productId, clientId }) => ({
        url: `/cart/${cartId}/items/${productId}/delete`,
        method: "DELETE",
        body: { clientId },
      }),

      invalidatesTags: ["Cart"],
    }),

    // Completar la compra del carrito y crear una orden
    checkout: build.mutation<void, { cartId: string }>({
      query: ({ cartId }) => ({
        url: `/cart/${cartId}/checkout`,
        method: "POST",
        credentials: "include",
      }),

      invalidatesTags: ["Cart"],
    }),

    // Validar si el cliente tiene un carrito activo
    validateActiveCart: build.query<{ id: string }, void>({
      query: () => ({
        url: "/cart/check",
        credentials: "include",
      }),

      providesTags: ["Cart"],
    }),

    // Carrito por su tempId
    cartByTempId: build.mutation<
      { id: string; cartItems: CartItem[]; amountTotal: number },
      string
    >({
      query: (tempId) => ({
        url: `/cart/temp/${tempId}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useValidateCartMutation,
  useCreateCartMutation,
  useAddItemToCartMutation,
  useUpdateItemQuantityMutation,
  useRemoveItemFromCartMutation,
  useValidateActiveCartQuery,
  useCartByTempIdMutation,
} = cartApi;

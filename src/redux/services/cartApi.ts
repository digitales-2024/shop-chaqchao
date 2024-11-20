import { CreateCart } from "@/types";
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
    createCart: build.mutation<{ id: string }, CreateCart>({
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

    // Fusionar carritos
    mergeCarts: build.mutation<void, { anonCartId: string }>({
      query: ({ anonCartId }) => ({
        url: `/cart/${anonCartId}/merge`,
        method: "POST",
        body: { anonCartId },
        credentials: "include",
      }),

      invalidatesTags: ["Cart"],
    }),

    // Actualizar la cantidad de un producto en el carrito
    updateItemQuantity: build.mutation<
      void,
      { cartId: string; productId: string; quantity: number }
    >({
      query: ({ cartId, productId, quantity }) => ({
        url: `/cart/${cartId}/items/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),

      invalidatesTags: ["Cart"],
    }),

    // Eliminar un producto del carrito
    removeItemFromCart: build.mutation<
      void,
      { cartId: string; productId: string }
    >({
      query: ({ cartId, productId }) => ({
        url: `/cart/${cartId}/items/${productId}`,
        method: "DELETE",
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
    }),
  }),
});

export const {
  useValidateCartMutation,
  useCreateCartMutation,
  useAddItemToCartMutation,
  useMergeCartsMutation,
  useUpdateItemQuantityMutation,
  useRemoveItemFromCartMutation,
  useValidateActiveCartQuery,
} = cartApi;

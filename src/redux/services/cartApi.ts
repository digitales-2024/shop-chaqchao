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
  }),
});

export const { useValidateCartMutation } = cartApi;

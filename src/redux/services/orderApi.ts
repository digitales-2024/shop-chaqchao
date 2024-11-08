import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    // Obtener todos los pedidos
    getOrders: build.query({
      query: () => ({
        url: "/order/orders",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;

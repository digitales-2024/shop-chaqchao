import { OrderDetails } from "@/types";
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

    // Obtener un pedido por id
    getOrder: build.query<OrderDetails, string>({
      query: (id) => ({
        url: `/order/details/${id}`,
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),

    // Descargar pedido en PDF
    downloadOrderPdf: build.mutation<Blob, { id: string }>({
      query: ({ id }) => ({
        url: `/order/export/pdf/${id}`,
        method: "POST",
        responseHandler: (response: Response) => response.blob(),
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useDownloadOrderPdfMutation,
} = orderApi;

// src/redux/services/orderApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQuery";
import { OrderClient } from "@/types/order";

export const orderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    getOrderClientById: build.query<OrderClient[], { id: string }>({
      query: ({ id }) => ({
        url: `/order/client/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Orders"],
    }),
    // Download order in PDF
    downloadOrderPdf: build.mutation<Blob, { id: string; display?: string }>({
      query: ({ id, display = "inline" }) => ({
        url: `/order/export/pdf/${id}?display=${display}`,
        method: "POST",
        responseHandler: async (response) => {
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error fetching PDF: ${errorText}`);
          }
          return response.blob();
        },
        credentials: "include",
      }),
    }),
    // Update status de un pedido
    updateOrderStatus: build.mutation<
      OrderClient,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        credentials: "include",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrderClientByIdQuery,
  useDownloadOrderPdfMutation,
  useUpdateOrderStatusMutation,
} = orderApi;

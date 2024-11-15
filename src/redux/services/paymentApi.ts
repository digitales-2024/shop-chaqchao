import { CreatePayment, ResponsePayment } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payment"],
  endpoints: (build) => ({
    // Generar token de pago
    generatePaymentToken: build.mutation<ResponsePayment, CreatePayment>({
      query: ({ body, transaction }) => ({
        url: `/payment/${transaction}`,
        method: "POST",
        body: body,
      }),

      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useGeneratePaymentTokenMutation } = paymentApi;

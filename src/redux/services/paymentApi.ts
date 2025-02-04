import { CreatePayment } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payment"],
  endpoints: (build) => ({
    // Generar token de pago
    generatePaymentToken: build.mutation<{ token: string }, CreatePayment>({
      query: (body) => ({
        url: `/payment`,
        method: "POST",
        body: body,
      }),

      invalidatesTags: ["Payment"],
    }),

    // Validate payment datos del pago
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validatePayment: build.mutation<{ isValid: boolean }, any>({
      query: (body) => ({
        url: `/payment/validate`,
        method: "POST",
        body: body,
      }),

      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useGeneratePaymentTokenMutation, useValidatePaymentMutation } =
  paymentApi;

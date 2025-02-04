import {
  CreateClassSchema,
  RegisterClassResponse,
} from "@/schemas/classRegisterSchema";
import { ClassesDataAdmin } from "@/types";
import { PaypalTransactionData } from "@/types/paypal";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class"],
  endpoints: (build) => ({
    // Endpoint para crear una nueva clase (registro de reserva)
    registerClass: build.mutation<RegisterClassResponse, CreateClassSchema>({
      query: (body) => ({
        url: "/classes/",
        method: "POST",
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["Class"],
    }),

    // Endpoint para confirmar el pago de una clase
    confirmPayment: build.mutation<
      void,
      { id: string; paypalData: PaypalTransactionData }
    >({
      query: ({ id, paypalData }) => ({
        url: `/classes/${id}`,
        method: "PATCH",
        body: {
          paypalOrderId: String(paypalData.paypalOrderId),
          paypalOrderStatus: String(paypalData.paypalOrderStatus),
          paypalAmount: paypalData.paypalAmount,
          paypalCurrency: String(paypalData.paypalCurrency),
          paypalDate: String(paypalData.paypalDate),
        },
        credentials: "include",
      }),
      invalidatesTags: ["Class"],
    }),

    // Endpoint para obtener horarios
    schedules: build.query<{ id: string; startTime: string }[], void>({
      query: () => ({
        url: "/classes",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Class"],
    }),

    // Endpoint para obtener los lenguajes
    languages: build.query<{ id: string; languageName: string }[], void>({
      query: () => ({
        url: "/classes/languages",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Class"],
    }),

    // Endpoint para obtener los precios
    prices: build.query<
      {
        id: string;
        classTypeUser: string;
        price: number;
        typeCurrency: string;
      }[],
      void
    >({
      query: () => ({
        url: "/classes/prices/dolar",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Class"],
    }),

    // Endpoint para obtener las clases registradas de un cliente
    getClassesByClient: build.query({
      query: () => ({
        url: "/classes/client",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Class"],
    }),

    // Ver si hay una clase registrada para una fecha y hora específica
    classByDate: build.mutation<
      ClassesDataAdmin,
      { date: string; schedule: string }
    >({
      query: ({ date, schedule }) => ({
        url: `/classes/check?schedule=${schedule}&date=${date}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Class"],
    }),
  }),
});

// Exportación de los hooks generados para los endpoints
export const {
  useRegisterClassMutation,
  useConfirmPaymentMutation,
  useLanguagesQuery,
  useSchedulesQuery,
  usePricesQuery,
  useGetClassesByClientQuery,
  useClassByDateMutation,
} = classApi;

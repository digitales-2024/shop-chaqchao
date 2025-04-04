import { RegisterClassResponse } from "@/schemas/classRegisterSchema";
import { ClassesDataAdmin, WorkshopRegistrationData } from "@/types";
import { TypeClass } from "@/types/classes";
import { TransactionData } from "@/types/paypal";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

interface Schedule {
  GROUP: ScheduleType[];
  NORMAL: ScheduleType[];
  PRIVATE: ScheduleType[];
}

interface ScheduleType {
  id: string;
  startTime: string;
  typeClass: string;
}

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class"],
  endpoints: (build) => ({
    // Endpoint para crear una nueva clase (registro de reserva)
    registerClass: build.mutation<
      RegisterClassResponse,
      WorkshopRegistrationData
    >({
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
      { id: string; paymentData?: TransactionData }
    >({
      query: ({ id, paymentData }) => ({
        url: `/classes/${id}`,
        method: "PATCH",
        body: {
          paypalOrderId: String(paymentData?.paypalOrderId),
          paypalOrderStatus: String(paymentData?.paypalOrderStatus),
          paypalAmount: paymentData?.paypalAmount,
          paypalCurrency: String(paymentData?.paypalCurrency),
          paypalDate: String(paymentData?.paypalDate),
          izipayOrderId: String(paymentData?.izipayOrderId),
          izipayOrderStatus: String(paymentData?.izipayOrderStatus),
          izipayAmount: paymentData?.izipayAmount,
          izipayCurrency: String(paymentData?.izipayCurrency),
          izipayDate: String(paymentData?.izipayDate),
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

    // Endpoint para obtener horarios
    schedulesAdmin: build.query<Schedule, void>({
      query: () => ({
        url: "/classes/schedule",
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
      { typeCurrency?: string; typeClass: "NORMAL" | "GROUP" | "PRIVATE" }
    >({
      query: (args) => ({
        url: "/classes/prices",
        method: "GET",
        params: {
          typeCurrency: args.typeCurrency || "DOLAR",
          typeClass: args.typeClass,
        },
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
      { date: string; schedule: string; typeClass: TypeClass }
    >({
      query: ({ date, schedule, typeClass = "NORMAL" }) => ({
        url: `/classes/check?schedule=${schedule}&date=${date}&typeClass=${typeClass}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Class"],
    }),

    // Obtener las clases futuras
    getClassesFutures: build.query<
      ClassesDataAdmin[],
      { typeClass?: TypeClass; schedule?: string }
    >({
      query: ({ typeClass, schedule }) => ({
        url: "/classes/futures",
        method: "GET",
        params: { typeClass, schedule },
        credentials: "include",
      }),
      providesTags: ["Class"],
    }),

    // Obtener capacidad de las clases
    getClassesCapacity: build.query<
      {
        id: string;
        typeClass: TypeClass;
        minCapacity: number;
        maxCapacity: number;
      },
      { typeClass?: TypeClass }
    >({
      query: ({ typeClass }) => ({
        url: "/classes/capacity",
        method: "GET",
        params: { typeClass },
        credentials: "include",
      }),
      providesTags: ["Class"],
    }),

    deleteClass: build.mutation({
      query: (id: string) => ({
        url: `/classes/${id}/delete`,
        method: "DELETE",
      }),
    }),

    //Obtener los tiempos de cierre de las clases
    closeTime: build.query<
      {
        closeBeforeStartInterval: number;
        finalRegistrationCloseInterval: number;
      },
      void
    >({
      query: () => ({
        url: "/classes/close-time",
        method: "GET",
        credentials: "include",
      }),

      providesTags: ["Class"],
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
  useSchedulesAdminQuery,
  useGetClassesFuturesQuery,
  useGetClassesCapacityQuery,
  useDeleteClassMutation,
  useCloseTimeQuery,
} = classApi;

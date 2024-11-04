import { CreateClassSchema } from "@/schemas/classRegisterSchema";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const classApi = createApi({
  reducerPath: "classApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Class"],
  endpoints: (build) => ({
    // Endpoint para crear una nueva clase
    createClassRegistration: build.mutation<
      CreateClassSchema,
      CreateClassSchema
    >({
      query: (body) => ({
        url: "/classes",
        method: "POST",
        body,
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
  }),
});

// Exportación de los hooks generados para los endpoints
export const {
  useCreateClassRegistrationMutation,
  useLanguagesQuery,
  useSchedulesQuery,
  usePricesQuery,
  useGetClassesByClientQuery,
} = classApi;

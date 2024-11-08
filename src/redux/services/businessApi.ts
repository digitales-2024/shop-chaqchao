import { Business } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const businessApi = createApi({
  reducerPath: "business",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Business"],
  endpoints: (build) => ({
    // Obtener la informacion de la empresa
    getBusiness: build.query<Business, void>({
      query: () => ({
        url: "/business",
      }),
      providesTags: ["Business"],
    }),
  }),
});

export const { useGetBusinessQuery } = businessApi;

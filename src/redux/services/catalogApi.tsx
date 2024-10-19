import { Product } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Catalog"],
  endpoints: (build) => ({
    getProductsRecommendByClient: build.query<Product[], { id: string }>({
      query: ({ id }) => `/catalog/recommend/${id}`,
      providesTags: ["Catalog"],
    }),
    getProductsRecommend: build.query<Product[], void>({
      query: () => "/catalog/recommend",
      providesTags: ["Catalog"],
    }),
  }),
});

export const {
  useGetProductsRecommendQuery,
  useGetProductsRecommendByClientQuery,
} = catalogApi;

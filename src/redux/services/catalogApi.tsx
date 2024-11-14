import { Product } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import { Filters } from "@/components/categories/FilterableProductList";

import baseQueryWithReauth from "./baseQuery";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Catalog"],
  endpoints: (build) => ({
    // Obtener productos recomendados por el cliente
    getProductsRecommendByClient: build.query<Product[], { id: string }>({
      query: ({ id }) => `/catalog/recommend/${id}`,
      providesTags: ["Catalog"],
    }),

    // Obtener productos recomendados
    getProductsRecommend: build.query<Product[], void>({
      query: () => "/catalog/recommend",
      providesTags: ["Catalog"],
    }),

    // Obtener productos filtrados
    getProductsFilters: build.query<Product[], { filters: Filters }>({
      query: ({ filters }) =>
        `/catalog/products?${new URLSearchParams(filters as string)}`,
      providesTags: ["Catalog"],
    }),

    // Obtener merchandising
    getMerch: build.query<Product[], void>({
      query: () => "/catalog/merch",
      providesTags: ["Catalog"],
    }),

    // Obtener producto por id
    getProductById: build.query<Product, { id: string }>({
      query: ({ id }) => `/catalog/products/${id}`,
      providesTags: ["Catalog"],
    }),
  }),
});

export const {
  useGetProductsRecommendQuery,
  useGetProductsRecommendByClientQuery,
  useGetProductsFiltersQuery,
  useGetMerchQuery,
  useGetProductByIdQuery,
} = catalogApi;

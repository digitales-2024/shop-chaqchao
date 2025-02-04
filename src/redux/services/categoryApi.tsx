import { Category, Product } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategories: build.query<Category[], void>({
      query: () => "/catalog/categories",
      providesTags: ["Category"],
    }),
    getCategory: build.query<Category, string>({
      query: (id) => `categories/${id}`,
      providesTags: ["Category"],
    }),
    getCategoryProducts: build.query<Product[], { id: string }>({
      query: ({ id }) => `/catalog/products-category/${id}`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryProductsQuery,
} = categoryApi;

import { Category } from "@/types";
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
    getCategory: build.query<Category, number>({
      query: (id) => `categories/${id}`,
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoryApi;

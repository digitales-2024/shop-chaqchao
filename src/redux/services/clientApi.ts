import { ForgotPasswordSchema } from "@/schemas/forgotPassword";
import { ClientData, ResetPassword } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const clientApi = createApi({
  reducerPath: "clientProfileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth Client"],
  endpoints: (build) => ({
    profile: build.query<ClientData, void>({
      query: () => ({
        url: "/auth/client/profile",
        credentials: "include",
      }),

      providesTags: ["Auth Client"],
    }),
    forgotPassword: build.mutation<ForgotPasswordSchema, ForgotPasswordSchema>({
      query: (data) => ({
        url: "/auth/client/forgot-password",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    resetPassword: build.mutation<void, ResetPassword>({
      query: ({ token, ...data }) => ({
        url: "/auth/client/reset-password",
        method: "POST",
        credentials: "include",
        params: { token },
        body: data,
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = clientApi;

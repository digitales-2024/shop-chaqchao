import { UpdateClientsSchema } from "@/schemas/client/updateClientSchema";
import { ForgotPasswordSchema } from "@/schemas/forgotPassword";
import { ClientData, ClientDataUpdate, ResetPassword } from "@/types";
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
    // Obtener todos los cliente by id
    getClients: build.query({
      query: (id) => ({
        url: `/shop/client/${id}`,
        credentials: "include",
      }),
      providesTags: ["Auth Client"],
    }),
    // Actualizar un cliente por id
    updateClient: build.mutation<
      ClientDataUpdate,
      UpdateClientsSchema & { id: string }
    >({
      query: ({ id, ...body }) => ({
        url: `/shop/client/${id}`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Auth Client"],
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

    // Buscar cliente por email
    findClientByEmail: build.mutation({
      query: (email) => ({
        url: `/shop/client`,
        method: "POST",
        body: email,
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useGetClientsQuery,
  useUpdateClientMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useFindClientByEmailMutation,
} = clientApi;

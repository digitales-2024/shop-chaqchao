import { CreateClientInputSchema } from "@/schemas/client/createClientsSchema";
import { ClientLogin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";
import { clientApi } from "./clientApi";

export const authApi = createApi({
  reducerPath: "authClientApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth Client"],
  endpoints: (build) => ({
    // Login endpoint
    login: build.mutation<ClientLogin, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/client/login",
        method: "POST",
        body,
        credentials: "include",
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            clientApi.endpoints.profile.initiate(undefined, {
              forceRefetch: true,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["Auth Client"],
    }),
    // Google login endpoint
    googleLogin: build.query<void, void>({
      query: () => ({
        url: "/auth/client/google/login",
        method: "POST",
        credentials: "include",
      }),
    }),
    // Crear un nuevo cliente
    createClient: build.mutation<
      CreateClientInputSchema,
      CreateClientInputSchema
    >({
      query: (body) => ({
        url: "/auth/client/register",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Auth Client"],
    }),
    // Logout endpoint
    logout: build.mutation<{ message: string; statusCode: number }, void>({
      query: () => ({
        url: "/auth/client/logout",
        method: "GET",
        credentials: "include",
      }),
      invalidatesTags: ["Auth Client"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginQuery,
  useLogoutMutation,
  useCreateClientMutation,
} = authApi;

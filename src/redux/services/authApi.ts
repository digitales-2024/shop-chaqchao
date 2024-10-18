import { ClientLogin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";
import { clientApi } from "./clientApi";

export const authApi = createApi({
  reducerPath: "authClientApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth Client"],
  endpoints: (build) => ({
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
    googleLogin: build.query<void, void>({
      query: () => ({
        url: "/auth/client/google/login",
        method: "POST",
        credentials: "include",
      }),
    }),
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

export const { useLoginMutation, useGoogleLoginQuery, useLogoutMutation } =
  authApi;

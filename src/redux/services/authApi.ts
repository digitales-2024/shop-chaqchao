import { ClientLogin } from "@/types";
import { createApi } from "@reduxjs/toolkit/query/react";

import { adminApi } from "./adminApi";
import baseQueryWithReauth from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
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
            adminApi.endpoints.profile.initiate(undefined, {
              forceRefetch: true,
            }),
          );
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["Auth Client"],
    }),
  }),
});

export const { useLoginMutation } = authApi;

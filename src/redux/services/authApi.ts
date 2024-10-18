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
  }),
});

export const { useLoginMutation } = authApi;

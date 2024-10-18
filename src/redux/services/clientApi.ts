import { ClientData } from "@/types";
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
  }),
});

export const { useProfileQuery } = clientApi;

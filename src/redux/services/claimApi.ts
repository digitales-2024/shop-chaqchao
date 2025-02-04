import { RegisterClaimPayload } from "@/schemas/claimsSchema";
import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithReauth from "./baseQuery";

export const claimApi = createApi({
  reducerPath: "claimApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Claim"],
  endpoints: (build) => ({
    registerClaim: build.mutation<void, RegisterClaimPayload>({
      query: (body) => ({
        url: "/claims/",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Claim"],
    }),
  }),
});

export const { useRegisterClaimMutation } = claimApi;

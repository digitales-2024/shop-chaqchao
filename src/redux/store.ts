import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "./services/authApi";
import { clientApi } from "./services/clientApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(clientApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

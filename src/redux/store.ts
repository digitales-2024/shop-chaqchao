import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "./services/authApi";
import { businessApi } from "./services/businessApi";
import { cartApi } from "./services/cartApi";
import { catalogApi } from "./services/catalogApi";
import { categoryApi } from "./services/categoryApi";
import { classApi } from "./services/classApi";
import { clientApi } from "./services/clientApi";
import { orderApi } from "./services/orderApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(clientApi.middleware)
      .concat(categoryApi.middleware)
      .concat(catalogApi.middleware)
      .concat(orderApi.middleware)
      .concat(classApi.middleware)
      .concat(businessApi.middleware)
      .concat(cartApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

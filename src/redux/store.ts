import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi } from "./services/authApi";
import { businessApi } from "./services/businessApi";
import { cartApi } from "./services/cartApi";
import { catalogApi } from "./services/catalogApi";
import { categoryApi } from "./services/categoryApi";
import { claimApi } from "./services/claimApi";
import { classApi } from "./services/classApi";
import { clientApi } from "./services/clientApi";
import { orderApi } from "./services/orderApi";
import { paymentApi } from "./services/paymentApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [claimApi.reducerPath]: claimApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(clientApi.middleware)
      .concat(categoryApi.middleware)
      .concat(catalogApi.middleware)
      .concat(orderApi.middleware)
      .concat(classApi.middleware)
      .concat(claimApi.middleware)
      .concat(businessApi.middleware)
      .concat(cartApi.middleware)
      .concat(paymentApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

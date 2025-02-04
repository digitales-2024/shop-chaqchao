"use client";
import { OrderUpdateProvider } from "@/contexts/OrderUpdateContext";
import { Provider } from "react-redux";

import { TooltipProvider } from "@/components/ui/tooltip";

import { store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OrderUpdateProvider>
      <Provider store={store}>
        <TooltipProvider>{children}</TooltipProvider>
      </Provider>
    </OrderUpdateProvider>
  );
}

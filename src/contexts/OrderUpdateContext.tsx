"use client";

import { socket } from "@/socket/socket"; // Asegúrate de que la ruta es correcta
import React, { createContext, useState, useEffect, useCallback } from "react";

interface OrderUpdateContextProps {
  hasOrderUpdates: boolean;
  setHasOrderUpdates: (value: boolean) => void;
}

export const OrderUpdateContext = createContext<
  OrderUpdateContextProps | undefined
>(undefined);

export const OrderUpdateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasOrderUpdates, setHasOrderUpdates] = useState(false);

  const handleOrderStatusUpdated = useCallback(() => {
    setHasOrderUpdates(true);
  }, []);

  useEffect(() => {
    socket.on("order-status-updated", handleOrderStatusUpdated);

    return () => {
      socket.off("order-status-updated", handleOrderStatusUpdated);
    };
  }, [handleOrderStatusUpdated]);

  return (
    <OrderUpdateContext.Provider
      value={{ hasOrderUpdates, setHasOrderUpdates }}
    >
      {children}
    </OrderUpdateContext.Provider>
  );
};

import { useGetOrdersQuery } from "@/redux/services/orderApi";
import { socket } from "@/socket/socket";
import { useEffect } from "react";

export const useOrders = (clientId?: string) => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetOrdersQuery({
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // Manejo de eventos del socket
  useEffect(() => {
    const handleNewOrder = () => {
      // Si ya tenemos data cargada, permitimos el refetch
      if (orders) {
        refetch();
      }
    };

    const handleOrderStatusUpdated = () => {
      // Si ya tenemos data cargada, permitimos el refetch
      if (orders) {
        refetch();
        if (clientId) {
          refetch();
        }
      }
    };

    socket.on("new-order", handleNewOrder);
    socket.on("order-status-updated", handleOrderStatusUpdated);

    // Limpieza de los listeners del socket
    return () => {
      socket.off("new-order", handleNewOrder);
      socket.off("order-status-updated", handleOrderStatusUpdated);
    };
  }, [orders, refetch, clientId]);

  return {
    orders,
    isLoading,
    refetch,
  };
};

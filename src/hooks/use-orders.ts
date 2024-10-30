// src/hooks/use-orders.ts

import {
  useGetOrderClientByIdQuery,
  useDownloadOrderPdfMutation,
  useUpdateOrderStatusMutation,
} from "@/redux/services/orderApi";
import { toast } from "sonner";

import { socket } from "@/socket/socket";
import { useEffect } from "react";

type StatusTranslations = {
  [key: string]: string;
};

const OrderStatusEs = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  READY: "Listo",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export const useOrders = (clientId?: string) => {
  const {
    data: orders,
    error,
    isLoading,
    refetch: refetchOrders,
  } = useGetOrderClientByIdQuery(
    { id: clientId as string },
    { skip: !clientId },
  );

  const [onDownload, { isLoading: isLoadingPdf, error: errorPdf }] =
    useDownloadOrderPdfMutation();

  const onDownloadPdf = async (id: string, display = "inline") => {
    try {
      const response = await onDownload({ id, display }).unwrap();
      return response; // This should be a Blob representing the PDF
    } catch (error) {
      toast.error("Error al descargar el PDF del pedido");
      throw error;
    }
  };

  const [
    updateOrderStatus,
    { isLoading: isLoadingUpdateOrderStatus, error: errorUpdateOrderStatus },
  ] = useUpdateOrderStatusMutation();

  // Manejo de eventos del socket
  useEffect(() => {
    const handleNewOrder = () => {
      // Si ya tenemos data cargada, permitimos el refetch
      if (orders) {
        refetchOrders();
      }
    };

    const handleOrderStatusUpdated = () => {
      // Si ya tenemos data cargada, permitimos el refetch
      if (orders) {
        refetchOrders();
        if (clientId) {
          refetchOrders();
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
  }, [orders, refetchOrders, clientId]);

  const onOrderStatusUpdate = (id: string, status: string) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateOrderStatus({ id, status });
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = result.error.data.message;
            reject(new Error(error));
          }
          if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    function translateStatus(status: string) {
      const translations: StatusTranslations = OrderStatusEs;
      return translations[status] || status;
    }
    return toast.promise(promise(), {
      loading: "Actualizando estado del pedido...",
      success: `Estado de pedido a ${translateStatus(status).toUpperCase()} actualizado`,
      error: (err) => err.message,
    });
  };

  return {
    orders,
    error,
    isLoading,
    onDownloadPdf,
    isLoadingPdf,
    errorPdf,
    refetchOrders,
    onOrderStatusUpdate,
    isLoadingUpdateOrderStatus,
    errorUpdateOrderStatus,
  };
};

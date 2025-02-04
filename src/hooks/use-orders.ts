import {
  useDownloadOrderPdfMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
} from "@/redux/services/orderApi";
import { socket } from "@/socket/socket";
import { useEffect } from "react";
import { toast } from "sonner";

export const useOrders = (clientId?: string) => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetOrdersQuery({
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [onDownload, { isLoading: isLoadingPdf, error: errorPdf }] =
    useDownloadOrderPdfMutation();

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

  const {
    data: order,
    isLoading: isLoadingOrder,
    error: errorOrder,
  } = useGetOrderQuery(clientId || "", {
    skip: !clientId,
  });

  const onDownloadPdf = async (id: string, code: string) => {
    try {
      const response = await onDownload({ id }).unwrap();
      // Crear el enlace de descarga
      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `pedido-${code}.pdf`);

      // Añadir el enlace al DOM y disparar la descarga
      document.body.appendChild(link);
      link.click();

      // Eliminar el enlace temporal del DOM
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Limpiar el objeto URL
    } catch (error) {
      toast.error("Error al descargar el PDF del pedido");
    }
  };

  return {
    orders,
    isLoading,
    refetch,
    order,
    isLoadingOrder,
    errorOrder,
    onDownloadPdf,
    isLoadingPdf,
    errorPdf,
  };
};

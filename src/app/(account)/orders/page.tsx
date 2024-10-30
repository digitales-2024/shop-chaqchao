"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/SideBarClient";
import { useOrders } from "@/hooks/use-orders";
import { MoreVertical, UserRound } from "lucide-react";
import { useClients } from "@/hooks/use-client";
import { socket } from "@/socket/socket";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderUpdateContext } from "@/contexts/OrderUpdateContext";

const statusBackgroundColors = {
  PENDING: "bg-yellow-100",
  CONFIRMED: "bg-blue-100",
  READY: "bg-green-100",
  COMPLETED: "bg-green-100",
  CANCELLED: "bg-red-100",
};

const statusTextColors = {
  PENDING: "text-yellow-600",
  CONFIRMED: "text-blue-600",
  READY: "text-green-600",
  COMPLETED: "text-green-600",
  CANCELLED: "text-red-600",
};

// Mapeo de estados en inglés a español para mostrar al usuario
const OrderStatusEs = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  READY: "Listo",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export default function OrderList() {
  const { clientData, isLoading: isLoadingClient } = useClients();
  const {
    orders,
    error,
    isLoading: isLoadingOrders,
    refetchOrders,
    onDownloadPdf,
    isLoadingPdf,
  } = useOrders(clientData?.id);

  const { setHasOrderUpdates } = useContext(OrderUpdateContext);

  // Reiniciamos el estado al montar el componente
  useEffect(() => {
    setHasOrderUpdates(false);
  }, [setHasOrderUpdates]);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [updatedOrderIds, setUpdatedOrderIds] = useState<string[]>([]);

  const handleOrderStatusUpdated = useCallback(
    (data: { orderId: string; status: string }) => {
      const { orderId, status } = data;
      refetchOrders();
      setUpdatedOrderIds((prevIds) => [...prevIds, orderId]);
      toast.success(
        `El estado de tu pedido ha sido actualizado a ${OrderStatusEs[status as keyof typeof OrderStatusEs]}.`,
      );
    },
    [refetchOrders],
  );

  useEffect(() => {
    socket.on("order-status-updated", handleOrderStatusUpdated);
    return () => {
      socket.off("order-status-updated", handleOrderStatusUpdated);
    };
  }, [handleOrderStatusUpdated]);

  // Ajustar el tiempo de resalte de la fila (ejemplo: 5 segundos)
  useEffect(() => {
    if (updatedOrderIds.length > 0) {
      const timer = setTimeout(() => {
        setUpdatedOrderIds([]);
      }, 5000); // Resalte dura 5 segundos
      return () => clearTimeout(timer);
    }
  }, [updatedOrderIds]);

  const handleViewOrder = async (order: OrderDetails) => {
    setSelectedOrder(order);
    setIsSheetOpen(true);
    // Reiniciamos el estado al abrir un pedido
    setHasOrderUpdates(false);
  };

  const handleDownloadPdf = async () => {
    if (selectedOrder) {
      try {
        const blob = await onDownloadPdf(selectedOrder.id);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Pedido-${selectedOrder.pickupCode}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
        toast.error("Error al descargar el PDF");
      }
    }
  };

  if (isLoadingClient || isLoadingOrders) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar las órdenes: {error.message}</p>;
  }

  if (!clientData) {
    return (
      <div className="flex items-center">
        <UserRound className="h-10 w-10" />
        <p>No se encontraron datos del cliente.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white p-8">
        <h1 className="mb-4 text-2xl font-bold">Mis Pedidos</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PEDIDO</TableHead>
              <TableHead>FECHA</TableHead>
              <TableHead>ESTADO</TableHead>
              <TableHead>MONTO TOTAL</TableHead>
              <TableHead>ACCIONES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow
                  key={order.id}
                  className={`${
                    updatedOrderIds.includes(order.id)
                      ? `${
                          statusBackgroundColors[
                            order.orderStatus as keyof typeof statusBackgroundColors
                          ]
                        } animate-pulse`
                      : "hover:bg-gray-50"
                  }`}
                >
                  <TableCell>{order.pickupCode}</TableCell>
                  <TableCell>
                    {new Date(order.pickupTime).toLocaleString("es-PE")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        statusTextColors[
                          order.orderStatus as keyof typeof statusTextColors
                        ]
                      }`}
                    >
                      {
                        OrderStatusEs[
                          order.orderStatus as keyof typeof OrderStatusEs
                        ]
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    {order.totalAmount !== null
                      ? `S/. ${order.totalAmount.toFixed(2)}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      disabled={isLoadingPdf}
                    >
                      Ver detalles
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tienes órdenes.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <div className="mt-8 flex items-center justify-between">
              <SheetTitle>PEDIDO# {selectedOrder?.pickupCode}</SheetTitle>
              <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">Mas</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onSelect={() => selectedOrder?.id && handleDownloadPdf()}
                    >
                      Exportar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Fecha:{" "}
              {selectedOrder?.pickupTime &&
                new Date(selectedOrder.pickupTime).toLocaleString("es-PE")}
            </p>
          </SheetHeader>

          {/* ...resto del código del Sheet... */}
        </SheetContent>
      </Sheet>
    </div>
  );
}

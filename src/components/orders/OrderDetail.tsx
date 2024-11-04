"use client";
import { OrderClient } from "@/types/order";
import { Download, MoreVertical } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

interface OrderDisplayProps {
  order: OrderClient | null;
}

export const statusColors: Record<OrderClient["orderStatus"], string> = {
  CONFIRMED: "border-slate-300 text-slate-300",
  READY: "border-cyan-500 text-cyan-500",
  COMPLETED: "border-green-500 text-green-500",
  CANCELLED: "border-rose-500 text-rose-500",
};

export const translateStatus: Record<OrderClient["orderStatus"], string> = {
  CONFIRMED: "Pendiente",
  READY: "Listo",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

export const OrderDetail = ({ order }: OrderDisplayProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-between p-2">
        <div>
          <span className="font-bold">
            {order?.pickupCode} -{" "}
            <span
              className={cn(
                statusColors[order?.orderStatus ?? ""] ?? "",
                "uppercase",
              )}
            >
              {translateStatus[order?.orderStatus ?? ""]}
            </span>
          </span>
        </div>
        <div className="inline-flex items-center justify-center gap-1">
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!order}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      {order ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <div className="grid gap-1">
                <div className="font-semibold">asdasd</div>
                <div className="line-clamp-1 text-xs">asdasd</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span>
                </div>
              </div>
            </div>
            {/* {order.date && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(order.date), "PPpp")}
              </div>
            )} */}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">asdasd</div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
};

"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOrders } from "@/hooks/use-orders";
import { OrderClient as Order } from "@/types/order";
import { useState } from "react";

import { OrderDetail } from "@/components/orders/OrderDetail";
import { OrdersList } from "@/components/orders/OrderList";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Separator } from "../ui/separator";

interface OrderClientProps {
  defaultLayout: number[] | undefined;
}

export const OrderClient = ({ defaultLayout = [30, 50] }: OrderClientProps) => {
  const { orders } = useOrders();
  const [orderSelect, setOrderSelect] = useState<Order | null>(null);
  const isDesktop = useMediaQuery("(min-width: 624px)");

  if (isDesktop) {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:orders=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="w-full items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <OrdersList
            items={orders}
            orderSelect={orderSelect}
            setOrderSelect={setOrderSelect}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <OrderDetail order={orderSelect} />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <OrdersList
        items={orders}
        orderSelect={orderSelect}
        setOrderSelect={setOrderSelect}
      />
      <Separator />
      <OrderDetail order={orderSelect} />
    </div>
  );
};

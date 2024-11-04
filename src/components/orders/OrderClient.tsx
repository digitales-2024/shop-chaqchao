"use client";
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

interface OrderClientProps {
  defaultLayout: number[] | undefined;
}

export const OrderClient = ({ defaultLayout = [30, 50] }: OrderClientProps) => {
  const { orders } = useOrders();
  const [orderSelect, setOrderSelect] = useState<Order | null>(null);
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
};

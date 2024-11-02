"use client";
import { useOrders } from "@/hooks/use-orders";

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

export const OrderClient = ({ defaultLayout = [32, 48] }: OrderClientProps) => {
  const { orders } = useOrders();
  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full max-h-[800px] items-stretch"
    >
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <OrdersList items={orders} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
        <OrderDetail order={null} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

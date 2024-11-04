import { cookies } from "next/headers";

import { OrderClient } from "@/components/orders/OrderClient";

export default function PageOrders() {
  const layout = cookies().get("react-resizable-panels:layout:orders");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return <OrderClient defaultLayout={defaultLayout} />;
}

import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

import { OrderClient } from "@/components/orders/OrderClient";
import { Separator } from "@/components/ui/separator";

export default function PageOrders() {
  const layout = cookies().get("react-resizable-panels:layout:orders");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const t = useTranslations("account.orders");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
      <Separator />
      <OrderClient defaultLayout={defaultLayout} />
    </div>
  );
}

import { OrderClient } from "@/types/order";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { statusColors } from "./OrderDetail";

interface OrdersListProps {
  items: OrderClient[];
  orderSelect: OrderClient | null;
  setOrderSelect: (order: OrderClient | null) => void;
}

export function OrdersList({
  items,
  orderSelect,
  setOrderSelect,
}: OrdersListProps) {
  const t = useTranslations("account.orders");
  const lang = useLocale();

  return (
    <ScrollArea className="h-full">
      <div className="flex gap-2 p-4 pt-0 sm:flex-col">
        {items?.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              orderSelect?.id === item.id && "bg-muted",
            )}
            onClick={() => setOrderSelect(item)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="truncate font-bold">{item.pickupCode}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    orderSelect?.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <Badge
                    variant="outline"
                    className={cn(statusColors[item.orderStatus] ?? "")}
                  >
                    <span className="uppercase">
                      {t(`status.${item.orderStatus ?? "CONFIRMED"}`)}
                    </span>
                  </Badge>
                </div>
              </div>
              <div className="text-xs font-medium">{}</div>
            </div>
            <div className="inline-flex gap-1 text-xs font-bold">
              Total
              <span className="font-black">
                S/. {item.totalAmount ?? "0.00"}
              </span>
            </div>
            <div className="inline-flex items-center justify-center gap-2">
              <Calendar
                className="size-4 shrink-0 text-slate-400"
                strokeWidth={1}
              />
              <span>
                {format(item.pickupTime, "PPPp", {
                  locale: lang === "es" ? es : undefined,
                })}
              </span>
            </div>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

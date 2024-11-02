"use client";
import { OrderClient } from "@/types/order";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

interface OrdersListProps {
  items: OrderClient[];
}

export function OrdersList({ items }: OrdersListProps) {
  // const [orders, setOrders] = useState();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items?.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              // orders.selected === item.id && "bg-muted",
            )}
            // onClick={() =>
            //   setOrders({
            //     ...orders,
            //     selected: item.id,
            //   })
            // }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">
                    {format(item.pickupTime, "PPPp", { locale: es })}
                  </div>
                  {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    // orders.selected === item.id
                    //   ? "text-foreground"
                    //   : "text-muted-foreground",
                  )}
                >
                  <Badge variant="outline">{item.orderStatus}</Badge>
                </div>
              </div>
              <div className="text-xs font-medium">{}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {/* {item.text.substring(0, 300)} */}
            </div>
            {/* {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null} */}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

// function getBadgeVariantFromLabel(
//   label: string,
// ): ComponentProps<typeof Badge>["variant"] {
//   if (["work"].includes(label.toLowerCase())) {
//     return "default";
//   }

//   if (["personal"].includes(label.toLowerCase())) {
//     return "outline";
//   }

//   return "secondary";
// }

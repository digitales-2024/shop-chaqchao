import { ClassClient } from "@/types";
import { format } from "date-fns";
import { Calendar, Clock, Languages, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface ClassesListProps {
  items: ClassClient[];
  classSelect: ClassClient | null;
  setClassSelect: (order: ClassClient | null) => void;
}

export function ClassesList({
  items,
  classSelect,
  setClassSelect,
}: ClassesListProps) {
  const t = useTranslations("account.classes");

  return (
    <ScrollArea className="h-full sm:h-screen">
      <div className="flex gap-2 p-4 pt-0 sm:flex-col">
        {items?.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              classSelect?.id === item.id && "bg-muted",
            )}
            onClick={() => setClassSelect(item)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="inline-flex gap-2 truncate font-bold">
                    <Calendar
                      className="size-4 shrink-0 text-slate-400"
                      strokeWidth={1}
                    />
                    {format(item.dateClass, "dd/MM/yyyy")}
                  </div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    classSelect?.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <Badge
                    className="border-emerald-400 capitalize"
                    variant="outline"
                  >
                    {item.typeCurrency === "DOLAR" ? "$" : "S/"}{" "}
                    {item.totalPrice}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="inline-flex gap-1 text-xs font-bold">
              <Users
                className="size-4 shrink-0 text-slate-400"
                strokeWidth={1}
              />
              {item.totalParticipants} {t("participant")}
              {item.totalParticipants > 1 ? "s" : ""}
            </div>
            <div className="inline-flex items-center justify-center gap-2">
              <Clock
                className="size-4 shrink-0 text-slate-400"
                strokeWidth={1}
              />
              {item.scheduleClass}
            </div>
            <div className="inline-flex items-center justify-center gap-2 capitalize">
              <Languages
                className="size-4 shrink-0 text-slate-400"
                strokeWidth={1}
              />
              {item.languageClass}
            </div>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

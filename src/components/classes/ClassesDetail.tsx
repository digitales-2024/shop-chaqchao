"use client";
import { ClassClient } from "@/types";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Download,
  Languages,
  MoreVertical,
  User,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

interface ClassesDisplayProps {
  classClient: ClassClient | null;
}

export const ClassesDetail = ({ classClient }: ClassesDisplayProps) => {
  const t = useTranslations("account.classes");

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-between p-2">
        <div>
          {classClient && (
            <span className="inline-flex items-center justify-center gap-2 font-bold">
              <Calendar className="h-4 w-4" />
              {format(classClient.dateClass, "dd/MM/yyyy")}
            </span>
          )}
        </div>
        <div className="inline-flex items-center justify-center gap-1">
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!classClient}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                {t("download")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      {classClient ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex w-full items-start gap-4 text-sm">
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4" />
                    {t("schedule")}:{" "}
                    <span className="font-bold">
                      {classClient.scheduleClass}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 font-semibold">
                    <Languages className="h-4 w-4" />
                    {t("language")}:{" "}
                    <span className="font-bold capitalize">
                      {classClient.languageClass}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 font-semibold">
                    <Users className="h-4 w-4" />
                    {t("participant")}
                    {classClient.totalParticipants > 1 ? "s" : ""}:{" "}
                    <span className="font-bold capitalize">
                      {classClient.totalParticipants}
                    </span>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 font-semibold">
                      <User className="h-4 w-4" />
                      {t("adults")}:{" "}
                      <span className="font-bold capitalize">
                        {classClient.totalAdults}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 font-semibold">
                      <User className="h-4 w-4" />
                      {t("children")}:{" "}
                      <span className="font-bold capitalize">
                        {classClient.totalChildren}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 font-semibold">
                    <span className="font-bold capitalize">
                      Total:{" "}
                      <span className="size-4 shrink-0 font-bold">
                        {classClient.typeCurrency === "DOLAR" ? "$" : "S/"}{" "}
                      </span>
                      {classClient.totalPrice}
                    </span>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 font-semibold">
                      <span className="font-bold capitalize">
                        {t("adults")}:{" "}
                        <span className="size-4 shrink-0 font-bold">
                          {classClient.typeCurrency === "DOLAR" ? "$" : "S/"}{" "}
                        </span>
                        {classClient.totalPriceAdults}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 font-semibold">
                      <span className="font-bold capitalize">
                        {t("children")}:{" "}
                        <span className="size-4 shrink-0 font-bold">
                          {classClient.typeCurrency === "DOLAR" ? "$" : "S/"}{" "}
                        </span>
                        {classClient.totalPriceChildren}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {classClient.comments}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          {t("empty")}
        </div>
      )}
    </div>
  );
};

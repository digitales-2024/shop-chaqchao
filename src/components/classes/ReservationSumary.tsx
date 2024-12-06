import { useReservation } from "@/hooks/use-reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Clock,
  User,
  Languages,
  CalendarDays,
  Users,
  UserRound,
  Baby,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

import { Separator } from "../ui/separator";

export const ReservationSummary: React.FC = () => {
  const t = useTranslations("class");
  const locale = useLocale();

  const { reservation } = useReservation();

  return (
    <div className="relative z-10 h-full bg-transparent p-6 sm:p-8">
      {/* Encabezado */}
      <div className="mb-6 text-start">
        <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          {t("reservationSumary.abstract.title")}
        </h3>
      </div>

      {/* Información de la reserva */}
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="grid w-full grid-cols-[auto_1fr] justify-center gap-3">
          <span className="inline-flex aspect-square size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/10 p-2">
            <User className="size-6 text-primary" />
          </span>
          <div className="inline-flex h-full w-full items-center">
            <h4 className="font-bold">{t("step1.title")}</h4>
          </div>
          <div />
          <ul>
            <li className="font-bold capitalize text-gray-600">
              {reservation.userName ?? ""}
            </li>
            <li className="font-semibold text-gray-500">
              {reservation.userEmail ?? ""}
            </li>
            <li className="font-semibold text-gray-500">
              {reservation.userPhone ?? ""}
            </li>
          </ul>
        </div>
        <Separator />
        <div className="grid w-full grid-cols-[auto_1fr] justify-center gap-3">
          <span className="inline-flex aspect-square size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/10 p-2">
            <CalendarDays className="size-6 text-primary" />
          </span>
          <div className="inline-flex h-full w-full items-center">
            <h4 className="font-bold">{t("step2.title")}</h4>
          </div>
          <div />
          <ul>
            <li className="font-bold text-gray-600">
              {(reservation.date &&
                format(reservation.date, "PPP", {
                  locale: locale === "es" ? es : undefined,
                })) ??
                ""}
            </li>
            <li className="font-bold text-gray-600">
              <span className="inline-flex items-center justify-center gap-2 font-medium text-gray-500">
                <Clock className="size-4" />
                {reservation.time ?? ""}
              </span>
            </li>
          </ul>
        </div>
        <Separator />
        <div className="grid w-full grid-cols-[auto_1fr] justify-center gap-3">
          <span className="inline-flex aspect-square size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/10 p-2">
            <Users className="size-6 text-primary" />
          </span>
          <div className="inline-flex h-full w-full items-center">
            <h4 className="font-bold">{t("step3.title")}</h4>
          </div>
          <div />
          <ul className="flex flex-col items-start justify-center gap-4">
            <li className="inline-flex items-center justify-center gap-2 font-bold text-gray-600">
              <UserRound className="size-4 text-cyan-500" />
              {t("step3.adults")}: {reservation.adults ?? ""}
            </li>
            <li className="inline-flex items-center justify-center gap-2 font-bold text-gray-600">
              <Baby className="size-4 text-emerald-500" />
              {t("step3.children")}: {reservation.children ?? ""}
            </li>
          </ul>
        </div>
        <Separator />
        <div className="grid w-full grid-cols-[auto_1fr] justify-center gap-3">
          <span className="inline-flex aspect-square size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/10 p-2">
            <Languages className="size-6 text-primary" />
          </span>
          <div className="inline-flex h-full w-full items-center">
            <h4 className="font-bold">{t("step4.title")}</h4>
          </div>
          <div />
          <ul>
            <li className="font-bold capitalize text-gray-600">
              {reservation.language &&
                t(`step4.languages.${reservation.language}`)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

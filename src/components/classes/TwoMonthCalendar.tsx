"use client";

import { ClassesDataAdmin } from "@/types";
import {
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isToday,
  isBefore,
  startOfMonth,
  endOfMonth,
  startOfDay,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

// Se añade la nueva prop disabledDates
interface TwoMonthCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  classes?: ClassesDataAdmin[];
  disabledDates?: string[]; // nueva prop: array de fechas en formato "yyyy-MM-dd"
}

export function TwoMonthCalendar({
  value,
  onChange,
  classes = [],
  disabledDates = [],
}: TwoMonthCalendarProps) {
  const [monthStart, setMonthStart] = React.useState(startOfMonth(new Date()));
  const today = startOfDay(new Date());
  const t = useTranslations("class.schedule.calendar.tooltip");
  const isDateBlocked = React.useCallback(
    (date: Date) => {
      // Bloquear fechas anteriores a hoy
      if (isBefore(startOfDay(date), today)) {
        return true;
      }

      // Obtener todas las clases para esta fecha
      const classesForThisDate = classes.filter(
        (c) =>
          new Date(c.dateClass).getDate() === date.getDate() &&
          new Date(c.dateClass).getMonth() === date.getMonth() &&
          new Date(c.dateClass).getFullYear() === date.getFullYear(),
      );

      // Si hay clases para esta fecha, verificar si todas están cerradas
      if (classesForThisDate.length > 0) {
        return classesForThisDate.every((c) => c.isClosed);
      }

      return false;
    },
    [classes, today],
  );

  const isDateCreated = React.useCallback(
    (date: Date) => {
      // Retornar true si hay al menos una clase abierta para esta fecha
      return classes.some(
        (c) =>
          new Date(c.dateClass).getDate() === date.getDate() &&
          new Date(c.dateClass).getMonth() === date.getMonth() &&
          new Date(c.dateClass).getFullYear() === date.getFullYear() &&
          !c.isClosed,
      );
    },
    [classes],
  );

  const handleDateSelect = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
  };

  const renderMonth = (month: Date) => {
    const daysInMonth = endOfMonth(month).getDate();
    const firstDayOfMonth = month.getDay();
    const weeks = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const date = new Date(
            month.getFullYear(),
            month.getMonth(),
            index - firstDayOfMonth + 1,
          );
          const isCurrentMonth = isSameMonth(date, month);
          const isSelected =
            value &&
            isSameMonth(date, value) &&
            date.getDate() === value.getDate();
          const isBlocked = isDateBlocked(date);
          const isCreated = isDateCreated(date);
          // Nueva validación: si la fecha se encuentra en disabledDates
          const dateKey = format(date, "yyyy-MM-dd");
          const isCalendarDateDisabled = disabledDates.includes(dateKey);

          // Nuevo: determinar si el día está parcialmente ocupado
          const classesForDate = classes.filter(
            (c) =>
              new Date(c.dateClass).getDate() === date.getDate() &&
              new Date(c.dateClass).getMonth() === date.getMonth() &&
              new Date(c.dateClass).getFullYear() === date.getFullYear(),
          );
          const isPartiallyOccupied =
            classesForDate.length > 0 &&
            classesForDate.some((c) => !c.isClosed);

          return (
            <Button
              type="button"
              key={index}
              variant="ghost"
              className={cn(
                "relative flex h-9 w-9 flex-col p-0 font-normal disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
                !isCurrentMonth && "text-gray-400",
                isSelected && "bg-primary text-primary-foreground",
                isBlocked && "cursor-not-allowed bg-gray-100 text-gray-400",
                isToday(date) && "bg-accent text-accent-foreground",
                isCreated &&
                  "border bg-white font-black text-emerald-700 hover:bg-emerald-100",
                isSelected &&
                  isToday(date) &&
                  "bg-primary text-primary-foreground",
              )}
              disabled={
                !isCurrentMonth ||
                isBlocked ||
                isCalendarDateDisabled ||
                isBefore(date, startOfMonth(new Date()))
              }
              onClick={() => handleDateSelect(date)}
            >
              {/* Nuevo: envolver el ícono con Tooltip de shadcn */}
              {isPartiallyOccupied && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="absolute bottom-0 h-full w-full"></TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-2">
                        <p className="border-b pb-1 font-medium">
                          {t("title")}
                        </p>
                        {classesForDate.map((classInfo, idx) => (
                          <div
                            key={idx}
                            className="space-y-0.5 text-start text-sm"
                          >
                            <p className="space-x-2">
                              <strong>{t("schedule")}:</strong>
                              <span className="font-normal">
                                {classInfo.scheduleClass}
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-normal",
                                  classInfo.isClosed
                                    ? "text-rose-500"
                                    : "text-emerald-500",
                                )}
                              >
                                {classInfo.isClosed
                                  ? t("closed")
                                  : t("available")}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {isBlocked && (
                <Minus
                  className="absolute top-1/2 size-9 -translate-y-1/2"
                  strokeWidth={0.5}
                />
              )}
              {isCurrentMonth ? date.getDate() : ""}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setMonthStart(subMonths(monthStart, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-balance text-sm font-medium capitalize">
          {format(monthStart, "MMMM yyyy", { locale: es })} -{" "}
          {format(addMonths(monthStart, 1), "MMMM yyyy", { locale: es })}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setMonthStart(addMonths(monthStart, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {renderMonth(monthStart)}
        <Separator orientation="vertical" className="hidden sm:flex" />
        {renderMonth(addMonths(monthStart, 1))}
      </div>
    </div>
  );
}

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
import { CalendarCheck, ChevronLeft, ChevronRight, Minus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

interface TwoMonthCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  classes?: ClassesDataAdmin[];
}

export function TwoMonthCalendar({
  value,
  onChange,
  classes = [],
}: TwoMonthCalendarProps) {
  const [monthStart, setMonthStart] = React.useState(startOfMonth(new Date()));
  const today = startOfDay(new Date());

  const blockedDays = React.useMemo(() => {
    return classes.filter((c) => c.isClosed);
  }, [classes]);

  const classesDays = React.useMemo(() => {
    return classes.filter((c) => !c.isClosed);
  }, [classes]);

  const isDateBlocked = React.useCallback(
    (date: Date) => {
      // Bloquear fechas anteriores a hoy
      if (isBefore(startOfDay(date), today)) {
        return true;
      }

      return blockedDays.some(
        (blockedDate) =>
          new Date(blockedDate.dateClass).getDate() === date.getDate() &&
          new Date(blockedDate.dateClass).getMonth() === date.getMonth() &&
          new Date(blockedDate.dateClass).getFullYear() === date.getFullYear(),
      );
    },
    [blockedDays, today],
  );

  const isDateCreated = React.useCallback(
    (date: Date) => {
      return classesDays.some(
        (createdDate) =>
          new Date(createdDate.dateClass).getDate() === date.getDate() &&
          new Date(createdDate.dateClass).getMonth() === date.getMonth() &&
          new Date(createdDate.dateClass).getFullYear() === date.getFullYear(),
      );
    },
    [classesDays],
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

          return (
            <Button
              type="button"
              key={index}
              variant="ghost"
              className={cn(
                "relative h-9 w-9 p-0 font-normal",
                !isCurrentMonth && "text-gray-400",
                isSelected && "bg-primary text-primary-foreground",
                isBlocked && "cursor-not-allowed bg-rose-100 text-rose-400",
                isToday(date) && "bg-accent text-accent-foreground",
                isCreated && "bg-emerald-100 text-emerald-700",
                isSelected &&
                  isToday(date) &&
                  "bg-primary text-primary-foreground",
              )}
              disabled={
                !isCurrentMonth ||
                isBlocked ||
                isBefore(date, startOfMonth(new Date()))
              }
              onClick={() => handleDateSelect(date)}
            >
              {isCreated && (
                <CalendarCheck className="absolute left-0 top-0 size-3 text-emerald-500" />
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

"use client";

import * as React from "react";
import { addYears, format, subYears } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export default function DatePickerWithYearNavigation({
  className,
}: {
  className?: string;
}) {
  const [date, setDate] = React.useState<Date>();
  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date());

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleYearChange = (year: string) => {
    setCalendarDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(parseInt(year));
      return newDate;
    });
  };

  const handleMonthChange = (month: string) => {
    setCalendarDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(months.indexOf(month));
      return newDate;
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex w-[260px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex items-center justify-between space-x-2 p-3">
          <Select
            onValueChange={handleMonthChange}
            defaultValue={months[calendarDate.getMonth()]}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            defaultValue={calendarDate.getFullYear().toString()}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => setCalendarDate((prevDate) => subYears(prevDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Año anterior</span>
          </Button>
          <div className="font-semibold">
            {format(calendarDate, "yyyy", { locale: es })}
          </div>
          <Button
            variant="outline"
            className="h-7 w-7 p-0"
            onClick={() => setCalendarDate((prevDate) => addYears(prevDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Año siguiente</span>
          </Button>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>
  );
}
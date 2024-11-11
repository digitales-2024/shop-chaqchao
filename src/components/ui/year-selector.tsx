"use client";

import { Locale } from "@/i18n/config";
import { addYears, format, subYears } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";

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

interface DatePickerWithYearNavigationProps {
  className?: string;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  lang?: Locale;
}

export default function DatePickerWithYearNavigation({
  className,
  selectedDate,
  onDateChange,
  lang,
}: DatePickerWithYearNavigationProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);

  const [calendarDate, setCalendarDate] = React.useState<Date>(
    selectedDate || new Date(),
  );

  React.useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
      setCalendarDate(selectedDate);
    }
  }, [selectedDate]);

  const t = useTranslations("register");
  const locale = useLocale();

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  const monthsEs = [
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

  const monthsEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const months = React.useMemo(() => {
    return locale === "es" ? monthsEs : monthsEn;
  }, [locale]);

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
      newDate.setMonth(
        lang === "es" ? months.indexOf(month) : monthsEn.indexOf(month),
      );
      return newDate;
    });
  };

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected);
    if (selected && onDateChange) {
      onDateChange(selected);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "flex w-[280px] justify-start overflow-hidden text-left font-normal",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: locale === "es" ? es : undefined })
          ) : (
            <span className="truncate">{t("placeholderBirthDate")}</span>
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
            {format(calendarDate, "yyyy", {
              locale: locale === "es" ? es : undefined,
            })}
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
          selected={date}
          onSelect={handleDateSelect}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          initialFocus
          locale={locale === "es" ? es : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}

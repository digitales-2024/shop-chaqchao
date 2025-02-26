import { useReservation } from "@/hooks/use-reservation";
import { useSchedules } from "@/hooks/use-schedules";
import { addDays, format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import PulsatingDots from "../common/PulsatingDots";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

export const StepDateReservation = () => {
  const t = useTranslations("class.step2");

  const today = new Date();
  const nextDays = Array.from({ length: 4 }, (_, i) => addDays(today, i));
  const { schedules, isLoading, error } = useSchedules();

  const { reservation, setReservation } = useReservation();
  const locale = useLocale();

  const disabledHours = useCallback(
    (time: string): boolean => {
      if (!reservation.date) return true;
      const now = new Date();
      const inputDate = new Date(reservation.date);
      const [inputHours, inputMinutes] = time.split(":").map(Number);

      if (isNaN(inputHours) || isNaN(inputMinutes)) {
        throw new Error("La hora proporcionada no es válida");
      }
      inputDate.setHours(inputHours, inputMinutes, 0, 0);

      const isToday =
        now.getFullYear() === inputDate.getFullYear() &&
        now.getMonth() === inputDate.getMonth() &&
        now.getDate() === inputDate.getDate();

      if (isToday) {
        return inputDate < now;
      }

      return false;
    },
    [reservation.date],
  );

  useEffect(() => {
    if (reservation.date) {
      setReservation({
        ...reservation,
        time: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation.date]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-4">
        {nextDays.map((day, index) => (
          <div
            key={day.getTime()}
            className="mx-3 flex flex-col items-center justify-center"
          >
            <span className="text-base font-bold sm:text-lg">
              {index === 0
                ? t("days.today")
                : t(`days.${format(day, "EEE").toLowerCase()}`)}
            </span>
            <div
              className={`group/day flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14 ${
                reservation.date && isSameDay(reservation.date, day)
                  ? "bg-primary text-white"
                  : "bg-primary-foreground hover:bg-primary hover:text-white"
              } h-14 w-14 rounded sm:h-16 sm:w-16`}
              onClick={() =>
                setReservation({
                  ...reservation,
                  date: day,
                })
              }
            >
              <span
                className={cn(
                  "font-bold group-hover/day:text-white sm:text-xl",
                  reservation.date &&
                    isSameDay(reservation.date, day) &&
                    "text-white",
                )}
              >
                {format(day, "d", { locale: es })}
              </span>
            </div>
            <span className="text-sm font-medium sm:text-base">
              {format(day, "MMM", { locale: es }).toUpperCase()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Popover>
          <PopoverTrigger asChild>
            <button className="mb-4 mt-8 flex items-center rounded-full border-2 border-primary px-6 py-2 text-primary transition-all hover:bg-primary/50 hover:text-white">
              <span>
                {reservation.date
                  ? format(reservation.date, "PPP", {
                      locale: locale === "es" ? es : undefined,
                    })
                  : t("moreDates")}
              </span>
              <CalendarDays className="ml-2 h-5 w-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-auto p-0">
            <Calendar
              selected={reservation.date ?? undefined}
              onSelect={(date: Date | undefined) => {
                setReservation({
                  ...reservation,
                  date: date,
                });
              }}
              disabled={(date: Date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-6">
        <h4 className="text-center font-bold">{t("description")}</h4>
        {isLoading ? (
          <PulsatingDots />
        ) : error ? (
          <p>{t("schedule.loadingError")}</p>
        ) : schedules && schedules.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {schedules.map((schedule, index) => (
              <Button
                key={index}
                className={`rounded-full border bg-white px-6 py-2 text-primary transition-all sm:text-lg ${
                  reservation.time === schedule.startTime
                    ? "bg-primary text-white"
                    : "border-primary text-primary hover:text-white"
                } `}
                onClick={() =>
                  setReservation({
                    ...reservation,
                    time: schedule.startTime,
                  })
                }
                disabled={disabledHours(schedule.startTime)}
              >
                {schedule.startTime}
              </Button>
            ))}
          </div>
        ) : (
          <p>{t("schedule.notAvailable")}</p>
        )}
      </div>
    </div>
  );
};

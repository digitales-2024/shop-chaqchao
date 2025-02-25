"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { useBusiness } from "@/hooks/useBusiness";
import { getDayOfWeek } from "@/types/business";
import { format, setHours, setMinutes } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

export const StepDateOrder = () => {
  const {
    dateOrder,
    setDateOrder,
    handleStepComplete,
    setActiveStep,
    setSomeonePickup,
    someonePickup,
  } = useCartDetail();

  const memoizedDateOrder = useMemo(() => dateOrder, [dateOrder]);

  const { date, hour, fullDate } = memoizedDateOrder;

  const { business } = useBusiness();

  const [openingTime, setOpeningTime] = useState<string>("");
  const [closingTime, setClosingTime] = useState<string>("");
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);

  // Función para deshabilitar fechas pasadas
  const deshabilitarFechasPasadas = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of today
    return date < today;
  };

  // Actualizar fechaHoraCompleta cuando cambie la fecha o la hora
  useEffect(() => {
    if (date && hour) {
      const [hours, minutes] = hour.split(":").map(Number);
      const nuevaFechaHora = setMinutes(setHours(date, hours), minutes);
      setDateOrder({
        ...dateOrder,
        fullDate: nuevaFechaHora,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, hour]);

  useEffect(() => {
    if (business && date) {
      const dayOfWeek = getDayOfWeek(date.getDay());

      business.businessHours.forEach((horario) => {
        if (horario.dayOfWeek === dayOfWeek) {
          setOpeningTime(horario.openingTime);
          setClosingTime(horario.closingTime);
        }
      });
    }
  }, [business, date]);

  const t = useTranslations("checkout.dateOrder");
  const lang = useLocale();

  useEffect(() => {
    if (openingTime && closingTime && date) {
      const [openingHour, openingMinutes] = openingTime.split(":").map(Number);
      const [closingHour, closingMinutes] = closingTime.split(":").map(Number);

      const horas = [];
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();

      let startHour = openingHour;
      let startMinutes = openingMinutes;
      let endHour = closingHour;
      let endMinutes = closingMinutes;

      if (isToday) {
        startHour = now.getHours();
        startMinutes = now.getMinutes();

        // Redondear los minutos actuales al siguiente múltiplo de 5
        startMinutes = Math.ceil(startMinutes / 15) * 15;

        // Si los minutos resultantes son 60, incrementar la hora
        if (startMinutes === 60) {
          startMinutes = 0;
          startHour += 1;
        }

        // Calcular la hora de finalización como 30 minutos después de la hora actual
        const adjustedTime = new Date(now.getTime() + 30 * 60000);
        endHour = adjustedTime.getHours();
        endMinutes = adjustedTime.getMinutes();

        // Redondear los minutos de finalización al siguiente múltiplo de 5
        endMinutes = Math.ceil(endMinutes / 15) * 15;

        // Si los minutos resultantes son 60, incrementar la hora
        if (endMinutes === 60) {
          endMinutes = 0;
          endHour += 1;
        }
      }

      for (let i = startHour; i <= endHour; i++) {
        for (let j = i === startHour ? startMinutes : 0; j < 60; j += 15) {
          if (i === openingHour && j < openingMinutes) continue;
          if (i === endHour && j >= endMinutes) break;
          horas.push(`${i}:${j.toString().padStart(2, "0")}`);
        }
      }

      setHorasDisponibles(horas);
    }
  }, [openingTime, closingTime, date]);

  const handleConfirmDate = async () => {
    if (date && hour) {
      setDateOrder({
        ...dateOrder,
      });
      setSomeonePickup(someonePickup);
      handleStepComplete(2);
      setActiveStep(-1);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold">{t("title")}</h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", {
                    locale: lang === "es" ? es : undefined,
                  })
                ) : (
                  <span>{t("date")}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                selected={date}
                onSelect={(date) => {
                  setDateOrder({
                    ...dateOrder,
                    date: date,
                  });
                }}
                disabled={deshabilitarFechasPasadas}
                initialFocus
                locale={lang === "es" ? es : undefined}
              />
            </PopoverContent>
          </Popover>
          <Select
            value={hour}
            onValueChange={(value) => {
              setDateOrder({
                ...dateOrder,
                hour: value,
              });
            }}
            disabled={!date}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("hour")}>
                {hour ? (
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {hour}
                  </div>
                ) : (
                  <span>{t("hour")}</span>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {horasDisponibles.map((horaOpcion) => (
                <SelectItem key={horaOpcion} value={horaOpcion}>
                  {horaOpcion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {fullDate && (
          <p className="text-sm text-muted-foreground">
            {t("label")}{" "}
            {format(fullDate, "PPPp", {
              locale: lang === "es" ? es : undefined,
            })}
          </p>
        )}
        <Card className="mx-auto w-full">
          <CardContent>
            <div className="flex items-center justify-between space-x-2 py-4">
              <Label
                htmlFor="recoge-otra-persona"
                className="flex flex-col space-y-1"
              >
                <span>{t("quest")}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {someonePickup ? t("yes") : t("no")}
                </span>
              </Label>
              <Switch
                id="recoge-otra-persona"
                checked={someonePickup}
                onCheckedChange={setSomeonePickup}
              />
            </div>
          </CardContent>
        </Card>
        <div>
          <Button onClick={handleConfirmDate} disabled={!date || !hour}>
            {t("button")}
          </Button>
        </div>
      </div>
    </div>
  );
};

"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { useBusiness } from "@/hooks/useBusiness";
import { getDayOfWeek } from "@/types/business";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import LocationSelector from "../ui/location-input";
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
    setshippingToAnotherCity,
    shippingToAnotherCity,
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
    today.setHours(0, 0, 0, 0); // Establecer a inicio del día
    return date < today;
  };

  // Actualizar fechaHoraCompleta cuando cambie la fecha o la hora
  useEffect(() => {
    if (date && hour) {
      const [hours, minutes] = hour.split(":").map(Number);

      // Crear una nueva fecha exactamente como la seleccionó el usuario
      const fechaSeleccionada = new Date(date);
      // Establecer la hora exacta que seleccionó el usuario sin conversiones de zona horaria
      fechaSeleccionada.setHours(hours, minutes, 0, 0);

      setDateOrder({
        ...dateOrder,
        fullDate: fechaSeleccionada,
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
      const endHour = closingHour;
      const endMinutes = closingMinutes;

      if (isToday) {
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes() + 30; // Agregamos 30 minutos

        let adjustedHour = currentHour;
        let adjustedMinutes = currentMinutes;

        if (adjustedMinutes >= 60) {
          adjustedMinutes -= 60;
          adjustedHour += 1;
        }

        // cambios en la hora +30 min de la hora actual (today) o +30 min hora de apertura
        if (
          adjustedHour < openingHour ||
          (adjustedHour === openingHour && adjustedMinutes < openingMinutes)
        ) {
          startHour = openingHour;
          startMinutes = openingMinutes + 30;
        } else {
          startHour = adjustedHour;
          startMinutes = adjustedMinutes;
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
      setshippingToAnotherCity(shippingToAnotherCity);
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
                    hour: undefined, // Resetea la hora cuando se cambia la fecha
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
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-2 py-4">
            <Label
              htmlFor="envio-otra-ciudad"
              className="flex flex-col space-y-1"
            >
              <span>{t("questShipping")}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {shippingToAnotherCity ? t("yesShipping") : t("noShipping")}
              </span>
            </Label>
            <Checkbox
              id="envio-otra-ciudad"
              checked={shippingToAnotherCity}
              onCheckedChange={setshippingToAnotherCity}
            />
          </div>
          {/* Sección de detalles de envío */}
          {shippingToAnotherCity && (
            <div className="rounded-lg border bg-gray-100 p-4 transition-all duration-300">
              <h3 className="text-lg font-medium">{t("shippingDetails")}</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <LocationSelector />
                <Input placeholder={t("postalCode")} />
              </div>
              {t("labelShipping")}{" "}
              {dateOrder.location && (
                <p className="text-sm text-muted-foreground">
                  {t("addressLabel")}{" "}
                  {dateOrder.location.cityInt &&
                  dateOrder.location.stateInt &&
                  dateOrder.location.countryInt
                    ? `${dateOrder.location.cityInt}, ${dateOrder.location.stateInt}, ${dateOrder.location.countryInt} - ${dateOrder.location.codPostalInt}`
                    : t("addressNotAvailable")}
                </p>
              )}
            </div>
          )}
        </div>
        <Button onClick={handleConfirmDate} disabled={!date || !hour}>
          {t("button")}
        </Button>
      </div>
    </div>
  );
};

"use client";
import { useReservation } from "@/hooks/use-reservation";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function WorkshopConfirmationPage() {
  const { reservation, resetReservation } = useReservation();
  const t = useTranslations("class.confirmation");
  const router = useRouter();

  useEffect(() => {
    // Si no hay reserva o no está confirmada, redirigir a workshops
    if (
      !reservation.confirmed ||
      !reservation.paymentStatus ||
      !reservation.date
    ) {
      router.push("/workshops");
    }
    // Limpiar la reserva cuando se desmonte el componente
    return () => {
      resetReservation();
    };
  }, [reservation, router, resetReservation]);

  const handleBackToWorkshops = () => {
    router.push("/workshops");
  };

  const locale = useLocale();

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg text-center">
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-500" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-emerald-500">
            {t("title")}
          </h1>
          <p className="mb-4 text-muted-foreground">{t("description")}</p>

          <div className="mt-6 space-y-2 text-left">
            <p>
              <span className="font-semibold">{t("details.name")}:</span>{" "}
              {reservation.userName}
            </p>
            <p>
              <span className="font-semibold">{t("details.email")}:</span>{" "}
              {reservation.userEmail}
            </p>
            <p>
              <span className="font-semibold">{t("details.date")}:</span>{" "}
              {format(reservation.date || new Date(), "PPP", {
                locale: locale === "es" ? es : undefined,
              })}
            </p>
            <p>
              <span className="font-semibold">{t("details.schedule")}:</span>{" "}
              {reservation.schedule}
            </p>
            {reservation.transactionId && (
              <p>
                <span className="font-semibold">
                  {t("details.transaction")}:
                </span>{" "}
                {reservation.transactionId}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleBackToWorkshops}>{t("backButton")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

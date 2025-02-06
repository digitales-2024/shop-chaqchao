import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { useReservation } from "@/hooks/use-reservation";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { es } from "date-fns/locale";
import { usePricesQuery } from "@/redux/services/classApi";

const calculateTotal = (
  adults: number,
  children: number,
  prices: { classTypeUser: string; price: number }[],
) => {
  const adultPrice =
    prices.find((p) => p.classTypeUser === "ADULT")?.price ?? 0;
  const childPrice =
    prices.find((p) => p.classTypeUser === "CHILD")?.price ?? 0;
  return adults * adultPrice + children * childPrice;
};

export default function WorkshopSummary() {
  const t = useTranslations("class.summary");
  const locale = useLocale();
  const { reservation } = useReservation();
  const { data: prices, isLoading } = usePricesQuery({
    typeCurrency: "DOLAR",
    typeClass: "NORMAL",
  });

  if (!reservation?.date) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-balance text-3xl font-black text-terciary">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 rounded bg-gray-200"></div>
            <div className="h-6 rounded bg-gray-200"></div>
            <div className="h-6 rounded bg-gray-200"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading || !prices) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-balance text-3xl font-black text-terciary">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-4">
            <div className="h-6 rounded bg-gray-200"></div>
            <div className="h-6 rounded bg-gray-200"></div>
            <div className="h-6 rounded bg-gray-200"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const total = calculateTotal(
    reservation.adults,
    reservation.children,
    prices,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance text-3xl font-black text-terciary">
          {t("title")}
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="grid grid-cols-2">
          <p className="text-gray-600">{t("date")}</p>
          <p className="text-end font-bold">
            {format(reservation.date, "PPP", {
              locale: locale === "es" ? es : undefined,
            })}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <p className="text-gray-600">{t("schedule")}</p>
          <p className="text-end font-bold">{reservation.schedule}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="text-gray-600">{t("participants.title")}</p>
          <div className="text-end font-bold">
            <p>
              {reservation.adults} {t("participants.adults")}
            </p>
            <p>
              {reservation.children} {t("participants.children")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p className="text-gray-600">{t("language")}</p>
          <p className="text-end font-bold uppercase">{reservation.language}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="grid w-full grid-cols-2">
          <p className="font-black">Total</p>
          <p className="text-end font-bold">$ {total.toFixed(2)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}

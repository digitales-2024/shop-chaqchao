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

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-primary">{title}</h3>
      <div className="space-y-3">{children}</div>
      <Separator className="my-4" />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="grid grid-cols-2">
      <p className="text-gray-600">{label}</p>
      <p className="text-end font-bold">{value}</p>
    </div>
  );
}

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

  const hasPersonalInfo =
    reservation.userName || reservation.userEmail || reservation.userPhone;
  const hasAdditionalInfo =
    reservation.language ||
    reservation.occasion ||
    reservation.restrictions ||
    reservation.comments;
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
        <Section title={t("basicInfo")}>
          <InfoRow
            label={t("date")}
            value={format(reservation.date, "PPP", {
              locale: locale === "es" ? es : undefined,
            })}
          />
          <InfoRow label={t("schedule")} value={reservation.schedule} />
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
          {reservation.languageClass && (
            <InfoRow label={t("language")} value={reservation.languageClass} />
          )}
        </Section>

        {hasPersonalInfo && (
          <Section title={t("personalInfo")}>
            {reservation.userName && (
              <InfoRow label={t("name")} value={reservation.userName} />
            )}
            {reservation.userEmail && (
              <InfoRow label={t("email")} value={reservation.userEmail} />
            )}
            {reservation.userPhone && (
              <InfoRow label={t("phone")} value={reservation.userPhone} />
            )}
          </Section>
        )}

        {hasAdditionalInfo && (
          <Section title={t("additionalInfo")}>
            {reservation.occasion && (
              <InfoRow label={t("occasion")} value={reservation.occasion} />
            )}
            {reservation.restrictions && (
              <InfoRow
                label={t("restrictions")}
                value={reservation.restrictions}
              />
            )}
            {reservation.comments && (
              <InfoRow label={t("comments")} value={reservation.comments} />
            )}
          </Section>
        )}
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

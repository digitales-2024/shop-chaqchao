import { useBusiness } from "@/hooks/useBusiness";
import { BusinessHour } from "@/types/business";
import { motion } from "framer-motion";
import { Clock, ExternalLink, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const direction = "Chaqchao+Express,+Avenida+Ejército,+Yanahuara";
export const BusinessInfoCart = () => {
  const t = useTranslations("business");
  const d = useTranslations("business.days");
  const { business } = useBusiness();
  const { businessHours, businessInfo } = business;

  const getFormattedBusinessHours = (
    hours: BusinessHour[],
  ): { nombre: string; valor: string }[] => {
    const daysOfWeek = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    const groupedHours = hours.reduce(
      (acc, hour) => {
        const key = `${hour.openingTime}-${hour.closingTime}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(hour.dayOfWeek);
        return acc;
      },
      {} as Record<string, string[]>,
    );

    const formattedHours = Object.entries(groupedHours).map(([time, days]) => {
      const dayRanges = days
        .sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
        .reduce((acc, day, index, array) => {
          if (
            index === 0 ||
            daysOfWeek.indexOf(day) !== daysOfWeek.indexOf(array[index - 1]) + 1
          ) {
            acc.push([day]);
          } else {
            acc[acc.length - 1].push(day);
          }
          return acc;
        }, [] as string[][]);

      const formattedDays = dayRanges
        .map((range) => {
          if (range.length === 1) {
            return `${d(range[0])}`;
          }
          return `${d(range[0])} a ${d(range[range.length - 1])}`;
        })
        .join(", ");

      return { nombre: formattedDays, valor: time.replace("-", " - ") };
    });

    return formattedHours;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-sm text-gray-600"
    >
      <div className="space-y-4 rounded-md bg-muted p-4">
        <h3 className="mb-2 font-black">{t("address")}</h3>
        <p className="mb-2 inline-flex items-center gap-2">
          <MapPin className="size-5 shrink-0" />
          {businessInfo.address}
        </p>
        <div className="mb-4">
          <span className="font-black">{t("schedule")}</span>
          <div className="flex flex-col gap-2">
            {businessHours &&
              getFormattedBusinessHours(businessHours).map((hour, index) => (
                <div key={index} className="inline-flex items-center gap-2">
                  <Clock className="size-4 shrink-0" />
                  <span className="font-bold">{hour.nombre}:</span> {hour.valor}
                </div>
              ))}
          </div>
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${direction}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:underline"
        >
          {t("see")}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

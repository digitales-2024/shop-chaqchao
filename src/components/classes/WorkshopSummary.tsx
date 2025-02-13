import { useReservation } from "@/hooks/use-reservation";
import {
  useClassByDateMutation,
  useGetClassesCapacityQuery,
} from "@/redux/services/classApi";
import { ClassesDataAdmin, TypeClass } from "@/types/classes";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PulsatingDots from "../common/PulsatingDots";
import { Separator } from "../ui/separator";

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

  const [findClass, { isLoading }] = useClassByDateMutation();
  const { data: capacityNormal, isLoading: isLoadingCapacity } =
    useGetClassesCapacityQuery({ typeClass: "NORMAL" as TypeClass });
  const [classData, setClassData] = useState<ClassesDataAdmin | undefined>();

  useEffect(() => {
    const fetchClassData = async () => {
      if (reservation?.dateClass && reservation?.scheduleClass) {
        const response = await findClass({
          date: format(reservation.dateClass, "dd-MM-yyyy"),
          schedule: reservation.scheduleClass,
          typeClass: "NORMAL" as TypeClass,
        }).unwrap();

        setClassData(response);
      }
    };

    fetchClassData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation?.dateClass, reservation?.scheduleClass]);

  if (!reservation?.dateClass) {
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
    reservation.languageClass ||
    reservation.occasion ||
    reservation.allergies ||
    reservation.comments;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance text-3xl font-black text-terciary">
          {t("title")}
        </CardTitle>
        <div>
          {isLoading || isLoadingCapacity ? (
            <PulsatingDots />
          ) : (
            <div className="text-sm text-muted-foreground">
              {capacityNormal ? (
                `${t("capacity.class")} ${capacityNormal.minCapacity} - ${capacityNormal.maxCapacity} ${t("capacity.people")}`
              ) : (
                <PulsatingDots />
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading || isLoadingCapacity ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 rounded bg-gray-200"></div>
            <div className="h-6 rounded bg-gray-200"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {capacityNormal && classData && (
              <>
                <div>
                  <p className="font-bold">{t("capacity.available.title")}</p>
                  <p className="ml-4">
                    {t("capacity.available.label")}{" "}
                    {classData.totalParticipants} {t("capacity.available.of")}{" "}
                    {capacityNormal.maxCapacity} {t("capacity.available.cupos")}
                  </p>
                  <p className="ml-4 text-sm text-muted-foreground">
                    {t("capacity.available.available")}{" "}
                    {Math.max(
                      0,
                      capacityNormal.maxCapacity - classData.totalParticipants,
                    )}
                  </p>
                </div>

                <div>
                  <p className="font-black">{t("capacity.you.title")}</p>
                  <p>
                    {t("capacity.you.label")}{" "}
                    {reservation.totalAdults + reservation.totalChildren}
                  </p>

                  {(() => {
                    const nuevosParticipantes =
                      reservation.totalAdults + reservation.totalChildren;
                    const totalFinal =
                      classData.totalParticipants + nuevosParticipantes;
                    const cuposDisponibles =
                      capacityNormal.maxCapacity - classData.totalParticipants;

                    if (totalFinal > capacityNormal.maxCapacity) {
                      return (
                        <p className="text-sm text-red-500">
                          {t("capacity.you.messageNotAvailable.01")}{" "}
                          {totalFinal - capacityNormal.maxCapacity}{" "}
                          {t("capacity.you.messageNotAvailable.02")}.{" "}
                          {t("capacity.you.messageNotAvailable.03")}{" "}
                          {cuposDisponibles}{" "}
                          {t("capacity.you.messageNotAvailable.04")}
                        </p>
                      );
                    } else if (totalFinal < capacityNormal.minCapacity) {
                      return (
                        <p className="text-sm text-yellow-500">
                          {t("capacity.you.messageMinimum.01")}{" "}
                          {capacityNormal.minCapacity}{" "}
                          {t("capacity.you.messageMinimum.02")}{" "}
                          {capacityNormal.minCapacity - totalFinal}{" "}
                          {t("capacity.you.messageMinimum.03")}
                        </p>
                      );
                    } else {
                      return (
                        <p className="text-sm text-green-500">
                          ✓ {t("capacity.you.messageSuccess.01")}{" "}
                          {capacityNormal.maxCapacity - totalFinal}{" "}
                          {t("capacity.you.messageSuccess.02")}
                        </p>
                      );
                    }
                  })()}
                </div>
              </>
            )}
          </div>
        )}
        <Section title={t("basicInfo")}>
          <InfoRow
            label={t("date")}
            value={format(reservation.dateClass, "PPP", {
              locale: locale === "es" ? es : undefined,
            })}
          />
          <InfoRow label={t("schedule")} value={reservation.scheduleClass} />
          <div className="grid grid-cols-2">
            <p className="text-gray-600">{t("participants.title")}</p>
            <div className="text-end font-bold">
              <p>
                {reservation.totalAdults} {t("participants.adults")}
              </p>
              <p>
                {reservation.totalChildren} {t("participants.children")}
              </p>
            </div>
          </div>
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
            {reservation.languageClass && (
              <InfoRow
                label={t("language")}
                value={reservation.languageClass}
              />
            )}
            {reservation.occasion && (
              <InfoRow label={t("occasion")} value={reservation.occasion} />
            )}
            {reservation.allergies && (
              <InfoRow
                label={t("restrictions")}
                value={reservation.allergies}
              />
            )}
            {reservation.comments && (
              <InfoRow label={t("comments")} value={reservation.comments} />
            )}
          </Section>
        )}
      </CardContent>
    </Card>
  );
}

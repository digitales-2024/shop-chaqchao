import { useClass } from "@/hooks/use-class";
import { useReservation } from "@/hooks/use-reservation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Baby,
  Info,
  Minus,
  Plus,
  TriangleAlert,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { BadgeCustom } from "../common/BadgeCustom";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

const MAX_PEOPLE = 8;

export const StepParticipants = () => {
  const { reservation, setReservation } = useReservation();
  const { findClassByDate, dataFindClassByDate } = useClass();
  const [minPeople, setMinPeople] = useState(reservation.adults);

  useEffect(() => {
    if (dataFindClassByDate) {
      if (dataFindClassByDate.totalParticipants > 1) {
        setMinPeople(1);
        setReservation({ ...reservation, adults: 1 });
      } else {
        setMinPeople(2);
        setReservation({ ...reservation, adults: 2 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFindClassByDate]);

  useEffect(() => {
    if (reservation.date && reservation.time) {
      findClassByDate({
        date: reservation.date.toISOString(),
        schedule: reservation.time,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation.date, reservation.time]);

  const incrementAdults = () =>
    setReservation({ ...reservation, adults: reservation.adults + 1 });
  const decrementAdults = () =>
    setReservation({ ...reservation, adults: reservation.adults - 1 });

  const incrementChildren = () =>
    setReservation({ ...reservation, children: reservation.children + 1 });
  const decrementChildren = () =>
    setReservation({ ...reservation, children: reservation.children - 1 });

  const t = useTranslations("class.step3");

  // Verificar que sumados adultos y niños no superen el límite de 8 personas y minimo 1 adulto
  if (reservation.adults + reservation.children > MAX_PEOPLE) {
    if (reservation.adults > 1) {
      setReservation({ ...reservation, adults: reservation.adults - 1 });
    } else {
      setReservation({ ...reservation, children: reservation.children - 1 });
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {MAX_PEOPLE - (dataFindClassByDate?.totalParticipants ?? 0) > 0 ? (
        <div>
          {t("message.start")}{" "}
          {MAX_PEOPLE - (dataFindClassByDate?.totalParticipants ?? 0)}{" "}
          {t("message.end")}
        </div>
      ) : (
        <BadgeCustom>
          <TriangleAlert />
          {t("empty")}
        </BadgeCustom>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative flex flex-col items-start justify-center">
            <h4 className="text-lg font-semibold">{t("adults")}</h4>
            <AnimatePresence>
              <motion.div
                className="absolute -bottom-3 left-0 flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(reservation.adults)].map((_, i) => (
                  <motion.div
                    key={`child-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <UserRound className="size-3 text-cyan-500" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between gap-5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementAdults}
              className="rounded-full"
              aria-label="Disminuir adultos"
              disabled={reservation.adults === minPeople}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold">{reservation.adults}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={incrementAdults}
              aria-label="Aumentar adultos"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Alert className="border-emerald-500 bg-emerald-50/50 text-emerald-500">
          <Info className="h-4 w-4 stroke-emerald-500" />
          <AlertDescription>{t("childrenPay")}</AlertDescription>
        </Alert>
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative flex flex-col items-start justify-center">
            <h4 className="text-lg font-semibold">{t("children")}</h4>
            <AnimatePresence>
              <motion.div
                className="absolute -bottom-3 left-0 flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(reservation.children)].map((_, i) => (
                  <motion.div
                    key={`child-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                  >
                    <Baby className="size-3 text-emerald-500" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between gap-5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementChildren}
              className="rounded-full"
              aria-label="Disminuir niños"
              disabled={reservation.children === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-2xl font-bold">{reservation.children}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={incrementChildren}
              aria-label="Aumentar niños"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import { useClass } from "@/hooks/use-class";
import useClickOutside from "@/hooks/use-click-outside";
import { useLanguages } from "@/hooks/use-languages";
import { useReservation } from "@/hooks/use-reservation";
import { ArrowLeftIcon } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useId } from "react";

import PulsatingDots from "../common/PulsatingDots";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

export const StepLanguage = () => {
  const { languages, isLoading, error } = useLanguages();
  const { reservation, setReservation } = useReservation();

  const { findClassByDate } = useClass();

  useEffect(() => {
    if (reservation.date && reservation.time) {
      findClassByDate({
        date: reservation.date.toISOString(),
        schedule: reservation.time,
      });
    }
  }, [reservation.date, reservation.time]);

  const t = useTranslations("class.step4");

  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (reservation.comments !== "") {
      openMenu();
    }
  }, [reservation.comments]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  useClickOutside(formContainerRef, () => {
    if (reservation.comments === "") {
      closeMenu();
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        {isLoading ? (
          <PulsatingDots />
        ) : error ? (
          <p>{t("language.loadingError")}</p>
        ) : languages && languages.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((language, index) => (
              <button
                key={index}
                className={`rounded-full border px-6 py-2 text-sm transition-all sm:text-lg ${
                  reservation.language === language.languageName
                    ? "bg-primary text-white"
                    : "border-primary text-primary"
                } hover:bg-primary hover:text-white`}
                onClick={() =>
                  setReservation({
                    ...reservation,
                    language: language.languageName,
                  })
                }
              >
                {t(`languages.${language.languageName}`)}
              </button>
            ))}
          </div>
        ) : (
          <p>{t("language.notAvailabe")}</p>
        )}
      </div>
      <span className="truncate">{t("comments")}</span>
      <MotionConfig transition={TRANSITION}>
        <div className="relative flex items-start justify-start">
          {!isOpen && (
            <motion.button
              key="button"
              layoutId={`popover-${uniqueId}`}
              className="flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50"
              style={{
                borderRadius: 8,
              }}
              onClick={openMenu}
            >
              <motion.span
                layoutId={`popover-label-${uniqueId}`}
                className="truncate text-sm"
              >
                {t("addComments")}
              </motion.span>
            </motion.button>
          )}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={formContainerRef}
                layoutId={`popover-${uniqueId}`}
                className="h-[200px] w-full overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700"
                style={{
                  borderRadius: 12,
                }}
              >
                <form
                  className="flex h-full flex-col"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <motion.span
                    layoutId={`popover-label-${uniqueId}`}
                    aria-hidden="true"
                    style={{
                      opacity: reservation.comments ? 0 : 1,
                    }}
                    className="absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    {t("addComments")}
                  </motion.span>
                  <textarea
                    className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
                    autoFocus
                    value={reservation.comments}
                    onChange={(e) =>
                      setReservation({
                        ...reservation,
                        comments: e.target.value,
                      })
                    }
                  />
                  <div key="close" className="flex justify-between px-4 py-3">
                    <button
                      type="button"
                      className="flex items-center"
                      onClick={() => {
                        if (reservation.comments === "") {
                          closeMenu();
                        }
                      }}
                      aria-label="Close popover"
                    >
                      <ArrowLeftIcon
                        size={16}
                        className="text-zinc-900 dark:text-zinc-100"
                      />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </div>
  );
};

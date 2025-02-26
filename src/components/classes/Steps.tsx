"use client";
import { useReservation } from "@/hooks/use-reservation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import useMeasure from "react-use-measure";
import { toast } from "sonner";
import { z } from "zod";

import { Button as ButtonUI } from "@/components/ui/button";

import { BorderBeam } from "../core/BorderBeam";
import { TransitionPanel } from "../core/TransitionPanel";
import { StepConfirm } from "./StepConfirm";
import { StepDateReservation } from "./StepDateReservation";
import { StepInfo } from "./StepInfo";
import { StepLanguage } from "./StepLanguage";
import { StepParticipants } from "./StepParticipants";

interface Step {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <ButtonUI
      onClick={onClick}
      type="button"
      className="text-md rounded-full font-semibold"
    >
      {children}
    </ButtonUI>
  );
}
export function StepsClass() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();
  const t = useTranslations("class");

  const { reservation, setReservation } = useReservation();

  const handleSetActiveIndex = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(0);
    if (activeIndex >= FEATURES.length) setActiveIndex(FEATURES.length - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const handleConfirmData = () => {
    if (reservation.userName === "") return toast.error(t("errors.name"));
    if (reservation.userEmail === "") return toast.error(t("errors.email"));
    if (reservation.userPhone === "") return toast.error(t("errors.phone"));
    if (reservation.date === undefined) return toast.error(t("errors.date"));
    if (reservation.time === "") return toast.error(t("errors.time"));
    if (reservation.language === "") return toast.error(t("errors.language"));
  };

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("errors.name"),
    }),
    email: z.string().email({
      message: t("errors.email"),
    }),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: t("errors.phone") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: reservation.userName || "",
      email: reservation.userEmail || "",
      phone: reservation.userPhone || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setReservation({
      ...reservation,
      userName: values.name,
      userEmail: values.email,
      userPhone: values.phone,
    });
  };

  useEffect(
    () => {
      setReservation({
        ...reservation,
        userName: form.watch("name"),
        userEmail: form.watch("email"),
        userPhone: form.watch("phone"),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.watch("name"), form.watch("email"), form.watch("phone")],
  );

  const FEATURES: Step[] = [
    {
      title: t("step1.title"),
      content: <StepInfo form={form} onSubmit={onSubmit} />,
    },
    {
      title: t("step2.title"),
      subtitle: t("step2.subtitle"),
      content: <StepDateReservation />,
    },
    {
      title: t("step3.title"),
      content: <StepParticipants />,
    },
    {
      title: t("step4.title"),
      subtitle: t("step4.subtitle"),
      content: <StepLanguage />,
    },
    {
      title: t("step5.title"),
      content: <StepConfirm />,
    },
  ];

  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl bg-white p-4 shadow">
      <BorderBeam size={250} duration={12} delay={9} />
      <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: (direction) => ({
            x: direction > 0 ? 364 : -364,
            opacity: 0,
            height: bounds.height > 0 ? bounds.height : "auto",
            position: "initial",
          }),
          center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : "auto",
          },
          exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 364 : -364,
            opacity: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }),
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        custom={direction}
      >
        {FEATURES.map((feature, index) => (
          <div key={index} className="flex flex-col gap-6 px-4 pt-4" ref={ref}>
            <div>
              <h3 className="text-4xl font-bold">{feature.title}</h3>
              {feature.subtitle && (
                <span className="text-gray-500">{feature.subtitle}</span>
              )}
            </div>
            <div className="p-4">{feature.content}</div>
          </div>
        ))}
      </TransitionPanel>
      <div className="flex justify-between p-4">
        {activeIndex > 0 ? (
          <Button onClick={() => handleSetActiveIndex(activeIndex - 1)}>
            {t("previous")}
          </Button>
        ) : (
          <div />
        )}
        {activeIndex < FEATURES.length - 1 && (
          <Button
            onClick={() => {
              switch (activeIndex) {
                case 0:
                  form.handleSubmit(onSubmit)();
                  if (
                    reservation.userName &&
                    reservation.userEmail &&
                    reservation.userPhone
                  )
                    handleSetActiveIndex(activeIndex + 1);
                  break;
                case 1:
                  if (reservation.date && reservation.time) {
                    handleSetActiveIndex(activeIndex + 1);
                  }
                  break;
                case 2:
                  handleSetActiveIndex(activeIndex + 1);
                  break;
                case 3:
                  handleConfirmData();
                  if (reservation.language) {
                    handleSetActiveIndex(activeIndex + 1);
                  }
                  break;
                case 4:
                  break;
                default:
                  break;
              }
            }}
          >
            {activeIndex === FEATURES.length - 1 ? t("confirm") : t("next")}
          </Button>
        )}
      </div>
    </div>
  );
}

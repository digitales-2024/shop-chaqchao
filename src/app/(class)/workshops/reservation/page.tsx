"use client";

import WorkshopSummary from "@/components/classes/WorkshopSummary";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PersonalInfoForm } from "@/components/classes/PersonalInfoForm";
import { AdditionalInfoForm } from "@/components/classes/AdditionalInfoForm";
import { PaymentForm } from "@/components/classes/PaymentForm";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useReservation } from "@/hooks/use-reservation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { isValidPhoneNumber } from "react-phone-number-input";

export default function PageRegisterClass() {
  const t = useTranslations("class.steps");
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { id: "personal", title: t("personal.title") },
    { id: "additional", title: t("additional.title") },
    { id: "payment", title: t("payment.title") },
  ];

  const { reservation, setReservation } = useReservation();
  const router = useRouter();

  useEffect(() => {
    if (!reservation.date && !reservation.schedule) {
      router.push(`/workshops`);
    }
  }, [reservation]);

  // Esquemas separados para cada paso
  const personalSchema = z.object({
    personal: z.object({
      name: z.string().min(2, {
        message: t("personal.form.name.error"),
      }),
      email: z.string().email({
        message: t("personal.form.email.error"),
      }),
      phone: z.string().refine(isValidPhoneNumber, {
        message: t("personal.form.phone.error"),
      }),
    }),
  });

  const additionalSchema = z.object({
    additional: z.object({
      occasion: z.string().optional(),
      restrictions: z.string().optional(),
      comment: z.string().optional(),
    }),
  });

  const paymentSchema = z.object({
    payment: z.object({
      methodPayment: z
        .string()
        .min(1, { message: t("payment.form.payment.error") }),
    }),
  });

  // Usar solo el esquema del paso actual
  const getCurrentSchema = () => {
    switch (currentStep) {
      case 0:
        return personalSchema;
      case 1:
        return additionalSchema;
      case 2:
        return paymentSchema;
      default:
        return personalSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getCurrentSchema()),
    defaultValues: {
      personal: {
        name: reservation.userName || "",
        email: reservation.userEmail || "",
        phone: reservation.userPhone || "",
      },
      additional: {
        occasion: reservation.occasion || "",
        restrictions: reservation.restrictions || "",
        comment: reservation.comments || "",
      },
      payment: {
        methodPayment: "",
      },
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: any) => {
    try {
      // Validar solo el paso actual
      const currentSchema = getCurrentSchema();
      const result = currentSchema.safeParse(data);

      if (!result.success) {
        result.error.errors.forEach((error) => {
          form.setError(error.path.join(".") as any, {
            message: error.message,
          });
        });
        return;
      }

      // Actualizar el estado global según el paso actual
      if (currentStep === 0) {
        setReservation({
          userName: data.personal.name,
          userEmail: data.personal.email,
          userPhone: data.personal.phone,
        });
        setCurrentStep(1);
      } else if (currentStep === 1) {
        setReservation({
          occasion: data.additional.occasion,
          restrictions: data.additional.restrictions,
          comments: data.additional.comment,
        });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        setReservation({ confirmed: true });
        // Aquí iría la lógica de envío final
        console.log("Reserva confirmada!");
      }
    } catch (error) {
      console.error("Error en la validación:", error);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <AdditionalInfoForm />;
      case 2:
        return <PaymentForm />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-8">
          <ol className="flex w-full items-center justify-center space-x-2 bg-white p-3 text-center text-sm font-medium text-gray-500 sm:space-x-4 sm:p-4 sm:text-base">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={cn(
                  "flex items-center text-primary",
                  index < currentStep ? "font-bold" : "text-primary",
                )}
              >
                <span
                  className={cn(
                    "mr-2 flex size-7 shrink-0 items-center justify-center rounded-full text-xs",
                    index <= currentStep
                      ? "bg-primary text-white"
                      : "bg-primary/10",
                  )}
                >
                  {index + 1}
                </span>
                {step.title}
                {index < steps.length - 1 && (
                  <ChevronRight className="ml-2 h-3 w-3 sm:ml-4" />
                )}
              </li>
            ))}
          </ol>
          <Separator />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="order-2 sm:order-1">
            <WorkshopSummary />
          </div>

          <div className="order-1 p-6 sm:order-1">
            <h2 className="mb-4 text-xl font-bold">
              {steps[currentStep].title}
            </h2>
            {renderStepContent()}

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                {t("buttons.back")}
              </Button>
              <Button type="submit">
                {currentStep === steps.length - 1
                  ? t("buttons.confirm")
                  : t("buttons.next")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRegisterClass } from "@/hooks/use-class-registration";
import { useReservation } from "@/hooks/use-reservation";
import { useDeleteClassMutation } from "@/redux/services/classApi";
import { PaypalTransactionData, WorkshopRegistrationData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { AdditionalInfoForm } from "@/components/classes/AdditionalInfoForm";
import { PaymentForm } from "@/components/classes/PaymentForm";
import PayPalButton from "@/components/classes/PaypalButton";
import { PersonalInfoForm } from "@/components/classes/PersonalInfoForm";
import WorkshopSummary from "@/components/classes/WorkshopSummary";
import CountdownTimer from "@/components/common/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

export default function PageRegisterClass() {
  const t = useTranslations("class.steps");
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { id: "personal", title: t("personal.title") },
    { id: "additional", title: t("additional.title") },
    { id: "payment", title: t("payment.title") },
  ];

  const { reservation, setReservation } = useReservation();
  console.log("🚀 ~ PageRegisterClass ~ reservation:", reservation);
  const { registerClass, isLoadingRegisterClass } = useRegisterClass();
  const router = useRouter();

  const [dataTransaction, setDataTransaction] =
    useState<PaypalTransactionData>();

  useEffect(() => {
    if (!reservation.dateClass && !reservation.scheduleClass) {
      router.push(`/workshops`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation]);

  // Esquemas de validación
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
      language: z
        .string()
        .min(1, { message: t("additional.form.language.error") }),
      occasion: z.string().optional(),
      allergies: z.string().optional(),
      comment: z.string().optional(),
    }),
  });

  const paymentSchema = z.object({
    payment: z.object({
      currency: z
        .string()
        .min(1, { message: t("payment.form.currency.error") }),
      methodPayment: z
        .string()
        .min(1, { message: t("payment.form.payment.error") }),
      terms: z.boolean().refine((v) => v, {
        message: t("payment.form.terms.error"),
      }),
      politics: z.boolean().refine((v) => v, {
        message: t("payment.form.politics.error"),
      }),
    }),
  });

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
        language: reservation.languageClass || "",
        occasion: reservation.occasion || "",
        allergies: reservation.allergies || "",
        comment: reservation.comments || "",
      },
      payment: {
        currency: "USD",
        methodPayment: "",
        terms: false,
        politics: false,
      },
    },
    mode: "onSubmit",
  });

  const [deleteClass] = useDeleteClassMutation();

  const deleteClassWithRetry = async (classId: string, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await deleteClass(classId);
        setDataTransaction(undefined);
        setReservation({ id: undefined });
        return true;
      } catch (error) {
        if (attempt === maxRetries) {
          return false;
        }
        // Esperar antes del siguiente intento (500ms, 1000ms, 1500ms)
        await new Promise((resolve) => setTimeout(resolve, attempt * 500));
      }
    }
  };

  useEffect(() => {
    const resetCreateClass = async () => {
      if (dataTransaction?.id) {
        await deleteClassWithRetry(dataTransaction.id);
      }
    };

    resetCreateClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("payment.currency")]);

  const onSubmit = async (data: any) => {
    try {
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

      if (currentStep === 0) {
        setReservation({
          userName: data.personal.name,
          userEmail: data.personal.email,
          userPhone: data.personal.phone,
        });
        setCurrentStep(1);
      } else if (currentStep === 1) {
        setReservation({
          languageClass: data.additional.language,
          occasion: data.additional.occasion,
          allergies: data.additional.allergies,
          comments: data.additional.comment,
        });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        // const paymentMethod = data.payment.methodPayment;

        // Validar que los campos requeridos existan
        if (
          !reservation.userName ||
          !reservation.userEmail ||
          !reservation.userPhone ||
          !reservation.scheduleClass ||
          !reservation.languageClass ||
          !reservation.dateClass
        ) {
          toast.error("Required fields are missing");
          return;
        }

        const payload: WorkshopRegistrationData = {
          userName: reservation.userName,
          userEmail: reservation.userEmail,
          userPhone: reservation.userPhone,
          scheduleClass: reservation.scheduleClass,
          languageClass: reservation.languageClass,
          dateClass: reservation.dateClass,
          totalParticipants: reservation.totalParticipants,
          totalAdults: reservation.totalAdults || 0,
          totalChildren: reservation.totalChildren || 0,
          typeCurrency: data.payment.currency as "USD" | "PEN",
          allergies: reservation.allergies || "",
          occasion: reservation.occasion || "",
          comments: reservation.comments || "",
          typeClass: "NORMAL",
          methodPayment: data.payment.methodPayment,
          totalPriceAdults: reservation.totalPriceAdults,
          totalPriceChildren: reservation.totalPriceChildren,
          totalPrice: reservation.totalPrice,
        };
        try {
          const response = await registerClass(payload).unwrap();

          if (response) {
            setDataTransaction({
              userName: reservation.userName,
              userEmail: reservation.userEmail,
              userPhone: reservation.userPhone,
              scheduleClass: reservation.scheduleClass,
              languageClass: reservation.languageClass,
              dateClass: format(reservation.dateClass, "dd/MM/yyyy"),
              totalAdults: reservation.totalAdults || 0,
              totalChildren: reservation.totalChildren || 0,
              typeCurrency: data.payment.currency,
              comments: reservation.comments || "",
              paypalAmount: reservation.totalPrice.toString(),
              paypalOrderId: "",
              paypalOrderStatus: "",
              paypalDate: new Date().toISOString(),
              paypalCurrency: reservation.typeCurrency,
              id: response.id,
            });

            setReservation({
              ...reservation,
              id: response.id,
            });
          }
        } catch (error) {
          const errorMessage = (error as { data: { message: string } }).data
            .message;
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error en la validación:", error);
      toast.error(t("payment.error"));
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0 && !dataTransaction) {
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

            {dataTransaction && (
              <div className="space-y-4">
                <div className="rounded-md bg-yellow-50 p-4">
                  <CountdownTimer
                    duration={300} // 5 minutos en segundos
                    onComplete={async () => {
                      if (dataTransaction?.id) {
                        await deleteClassWithRetry(dataTransaction.id);
                      }
                      toast.error(
                        "El tiempo para realizar el pago ha expirado",
                      );
                      router.refresh();
                      router.push("/workshops");
                    }}
                  />
                </div>
                {reservation.methodPayment === "PAYPAL" && (
                  <PayPalButton transactionData={dataTransaction} />
                )}
                {reservation.methodPayment === "IZIPAY" && (
                  <Button type="button">Pagar con IZIPAY</Button>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                {t("buttons.back")}
              </Button>
              <Button
                type="submit"
                disabled={isLoadingRegisterClass || !!dataTransaction}
              >
                {currentStep === steps.length - 1
                  ? isLoadingRegisterClass
                    ? "Procesando..."
                    : t("buttons.confirm")
                  : t("buttons.next")}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

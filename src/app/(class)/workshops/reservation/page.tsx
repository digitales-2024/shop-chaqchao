/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useReservation } from "@/hooks/use-reservation";
import { CreatePayment } from "@/types";
import { getDataOrderDynamic } from "@/utils/getDataOrderDynamic";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PersonalInfoForm } from "@/components/classes/PersonalInfoForm";
import WorkshopSummary from "@/components/classes/WorkshopSummary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

export default function PageRegisterClass() {
  const [orderInfo, setOrderInfo] = useState<CreatePayment | undefined>(
    undefined,
  );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation]);

  // Limpiar el estado al desmontar
  useEffect(() => {
    return () => {
      setOrderInfo(undefined);
    };
  }, []);

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
        language: reservation.language || "",
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

  const handlePaymentSuccess = async (status: string) => {
    try {
      setReservation({
        paymentStatus: "completed",
        transactionId: status,
      });
      toast.success(t("payment.success"));
      router.push("/workshops/confirmation");
    } catch (error) {
      console.error("Error al procesar el éxito del pago:", error);
      toast.error(t("payment.error"));
    }
  };

  const handlePaymentError = () => {
    setReservation({ paymentStatus: "failed" });
    toast.error(t("payment.error"));
    setOrderInfo(undefined);
  };

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
          language: data.additional.language,
          occasion: data.additional.occasion,
          restrictions: data.additional.restrictions,
          comments: data.additional.comment,
        });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        const paymentMethod = data.payment.methodPayment;
        setReservation({
          paymentMethod,
          confirmed: true,
        });

        const { orderNumber } = getDataOrderDynamic();

        if (paymentMethod === "izipay") {
          try {
            const paymentData: CreatePayment = {
              amount: reservation.totalAmount * 100, // Convertir a centavos
              currency: "PEN",
              orderId: `WS-${orderNumber}`,
              customer: {
                email: reservation.userEmail || "",
                reference: reservation.userPhone,
                billingDetails: {
                  firstName: reservation.userName,
                  lastName: "asdasd",
                  phoneNumber: reservation.userPhone,
                },
              },
            };
            setOrderInfo(paymentData);
          } catch (error) {
            console.error("Error al preparar el pago:", error);
            toast.error(t("payment.error"));
          }
        }
      }
    } catch (error) {
      console.error("Error en la validación:", error);
      toast.error(t("payment.error"));
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
        return (
          <PaymentForm
            orderInfo={orderInfo}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        );
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

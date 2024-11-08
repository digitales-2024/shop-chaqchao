"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { Invoice, InvoiceSchema } from "@/schemas/invoice.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarCheck,
  Check,
  MapPinCheckInside,
  ReceiptText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { SelectDateOrder } from "./SelectDateOrder";
import { SelectInvoice } from "./SelectInvoice";

export const CheckoutSteps = () => {
  const t = useTranslations("checkout");
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const form = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema()),
    defaultValues: {
      documentType: "dni",
      number: "",
      address: "",
      name: "",
    },
  });
  const { date, hour } = useCartDetail();

  const handleConfirmDate = () => {
    if (step === 1 && date && hour) {
      handleNext();
    }
    if (!date) {
      toast.warning(t("dateOrder.messages.date"));
    } else {
      if (!hour) {
        toast.warning(t("dateOrder.messages.hour"));
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-10 pt-20">
      <div className="h-2 w-full rounded-full bg-primary-foreground">
        <div
          className="relative flex h-full items-center justify-center rounded-full bg-emerald-500 transition-all duration-300 ease-in-out"
          style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
        >
          <div className="absolute right-0 inline-flex size-10 items-center justify-center rounded-full border border-emerald-500 bg-white text-emerald-500">
            {step === 1 ? (
              <CalendarCheck />
            ) : step === 2 ? (
              <ReceiptText />
            ) : (
              <MapPinCheckInside />
            )}
          </div>
        </div>
      </div>
      {step === 1 && <SelectDateOrder />}
      {step === 2 && <SelectInvoice form={form} />}
      <div className="inline-flex gap-8">
        {step === 1 && (
          <Button onClick={handleConfirmDate} className="rounded-full text-lg">
            {t("dateOrder.buttonDate")}
            <Check />
          </Button>
        )}
        {step > 1 && (
          <Button onClick={handlePrevious} className="rounded-full text-lg">
            {t("back")}
          </Button>
        )}
        {step === 2 && (
          <Button
            onClick={() => {
              form.handleSubmit((data) => {
                console.log(data);
                handleNext();
              })();
            }}
            className="rounded-full text-lg"
          >
            {t("next")}
          </Button>
        )}
        {step === 3 && (
          <Button onClick={handleNext} className="rounded-full text-lg">
            Finalizar
          </Button>
        )}
      </div>
    </div>
  );
};

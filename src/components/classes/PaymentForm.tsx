/* eslint-disable @typescript-eslint/no-explicit-any */
import { Izipay, Paypal } from "@/assets/icons";
import { useReservation } from "@/hooks/use-reservation";
import { usePricesQuery } from "@/redux/services/classApi";
import { CreatePayment } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "@/lib/utils";

import { IzipayForm } from "../payment/IzipayForm";
import { Separator } from "../ui/separator";

interface PaymentFormProps {
  orderInfo?: CreatePayment;
  onPaymentSuccess?: (status: string) => void;
  onPaymentError?: () => void;
}

export function PaymentForm({
  orderInfo,
  onPaymentSuccess,
  onPaymentError,
}: PaymentFormProps) {
  const { control, watch } = useFormContext();
  const t = useTranslations("class.steps.payment");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const currency = watch("payment.currency") || "PEN";
  const { reservation } = useReservation();

  const {
    data: pricesDolar,
    isLoading: isLoadingDolar,
    error: errorDolar,
  } = usePricesQuery({
    typeCurrency: "DOLAR",
    typeClass: "NORMAL",
  });

  const {
    data: pricesSoles,
    isLoading: isLoadingSoles,
    error: errorSoles,
  } = usePricesQuery({
    typeCurrency: "SOL",
    typeClass: "NORMAL",
  });

  // Función para calcular los totales por tipo de usuario
  const calculateTotals = (
    adults: number,
    children: number,
    prices: { classTypeUser: string; price: number }[],
  ) => {
    const adultPrice =
      prices?.find((p) => p.classTypeUser === "ADULT")?.price ?? 0;
    const childPrice =
      prices?.find((p) => p.classTypeUser === "CHILD")?.price ?? 0;

    return {
      adultTotal: adults * adultPrice,
      childTotal: children * childPrice,
      total: adults * adultPrice + children * childPrice,
    };
  };

  // Manejo de estados de carga y error
  if (isLoadingDolar || isLoadingSoles) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Cargando precios...</p>
        </div>
      </div>
    );
  }

  // Manejo de errores
  const currentError = currency === "PEN" ? errorSoles : errorDolar;
  if (currentError) {
    return (
      <div className="rounded-lg border border-destructive p-4 text-destructive">
        <div className="space-y-2">
          <p className="font-semibold">Error al cargar los precios</p>
          <p className="text-sm">
            {(currentError as any)?.data?.message ||
              "No se pudieron cargar los precios. Por favor, intente más tarde."}
          </p>
        </div>
      </div>
    );
  }

  // Verificar que tenemos los precios necesarios según la moneda seleccionada
  const currentPrices = currency === "PEN" ? pricesSoles : pricesDolar;
  if (!currentPrices || currentPrices.length === 0) {
    return (
      <div className="border-warning text-warning rounded-lg border p-4">
        <div className="space-y-2">
          <p className="font-semibold">Precios no disponibles</p>
          <p className="text-sm">
            Los precios para {currency === "PEN" ? "Soles" : "Dólares"} no están
            disponibles en este momento.
            {currency === "USD" && " Por favor, intente con Soles."}
          </p>
        </div>
      </div>
    );
  }

  const totals = calculateTotals(
    reservation.adults,
    reservation.children,
    currentPrices,
  );

  // Handler for payment success
  const handlePaymentSuccess = (response: any) => {
    onPaymentSuccess?.(response.clientAnswer?.orderStatus ?? "");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

      {/* Currency Selection */}
      <FormField
        control={control}
        name="payment.currency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === "USD") {
                    setSelectedMethod("paypal");
                  }
                }}
                defaultValue="PEN"
                value={field.value || "PEN"}
                className="flex gap-4"
              >
                <FormItem>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="PEN" />
                    <span>Soles (S/)</span>
                  </label>
                </FormItem>
                <FormItem>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="USD" />
                    <span>Dólares ($)</span>
                  </label>
                </FormItem>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {/* Price Summary */}
      <div className="rounded-lg border p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Adultos ({reservation.adults})</span>
            <span>
              {currency === "PEN" ? "S/" : "$"} {totals.adultTotal.toFixed(2)}
            </span>
          </div>
          {reservation.children > 0 && (
            <div className="flex justify-between">
              <span>Niños ({reservation.children})</span>
              <span>
                {currency === "PEN" ? "S/" : "$"} {totals.childTotal.toFixed(2)}
              </span>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>
              {currency === "PEN" ? "S/" : "$"} {totals.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <FormField
        control={control}
        name="payment.methodPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Método de Pago</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedMethod(value);
                }}
                defaultValue={field.value}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <FormItem className="m-0">
                  <label
                    htmlFor="paypal"
                    className={cn(
                      "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent",
                      field.value === "paypal"
                        ? "border-primary bg-accent"
                        : "border-muted",
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Paypal</span>
                        <Paypal className="h-5 w-auto" />
                      </div>
                      {field.value === "paypal" && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </label>
                </FormItem>

                {currency === "PEN" && (
                  <FormItem className="m-0">
                    <label
                      htmlFor="izipay"
                      className={cn(
                        "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent",
                        field.value === "izipay"
                          ? "border-primary bg-accent"
                          : "border-muted",
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value="izipay"
                          id="izipay"
                          className="sr-only"
                        />
                      </FormControl>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Izipay</span>
                          <Izipay className="h-5 w-auto" />
                        </div>
                        {field.value === "izipay" && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </label>
                  </FormItem>
                )}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedMethod === "izipay" && orderInfo && (
        <IzipayForm
          paymentData={{
            ...orderInfo,
            amount: Math.round(totals.total * 100), // Convertir a centavos y redondear
            currency: currency,
          }}
          onSuccess={handlePaymentSuccess}
          onError={onPaymentError}
          containerId="workshop-izipay-form"
        />
      )}
    </div>
  );
}

import { Izipay, Paypal } from "@/assets/icons";
import { useReservation } from "@/hooks/use-reservation";
import { usePricesQuery } from "@/redux/services/classApi";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
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

import { Separator } from "../ui/separator";

export function PaymentForm() {
  const { control, watch } = useFormContext();
  const [, setSelectedMethod] = useState<string>("");
  const currency = watch("payment.currency") || "PEN";
  const { reservation, setReservation } = useReservation();
  const t = useTranslations("class.steps.payment");

  // Fetch Prices
  const {
    data: pricesDolar,
    isLoading: isLoadingDolar,
    error: errorDolar,
  } = usePricesQuery({
    typeCurrency: "USD",
    typeClass: "NORMAL",
  });

  const {
    data: pricesSoles,
    isLoading: isLoadingSoles,
    error: errorSoles,
  } = usePricesQuery({
    typeCurrency: "PEN",
    typeClass: "NORMAL",
  });

  // Calculate totals
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
  // Error handling
  const currentError = currency === "PEN" ? errorSoles : errorDolar;
  // Get current prices and validate
  const currentPrices = currency === "PEN" ? pricesSoles : pricesDolar;

  const totals = calculateTotals(
    reservation.totalAdults,
    reservation.totalChildren,
    currentPrices || [],
  );

  useEffect(() => {
    setReservation({
      totalPriceAdults: totals.adultTotal,
      totalPriceChildren: totals.childTotal,
      totalPrice: totals.total,
      typeCurrency: currency,
    });
  }, [currency, totals.total, setReservation]);

  // Loading state
  if (isLoadingDolar || isLoadingSoles) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (currentError) {
    return (
      <div className="rounded-lg border border-destructive p-4 text-destructive">
        <div className="space-y-2">
          <p className="font-semibold">{t("error.title")}</p>
          <p className="text-sm">
            {(currentError as any)?.data?.message || t("error.message")}
          </p>
        </div>
      </div>
    );
  }

  if (!currentPrices || currentPrices.length === 0) {
    return (
      <div className="border-warning text-warning rounded-lg border p-4">
        <div className="space-y-2">
          <p className="font-semibold">{t("unavailable.title")}</p>
          <p className="text-sm">
            {t("unavailable.message", {
              currency: currency === "PEN" ? "Soles" : "Dólares",
            })}
            {currency === "USD" && t("unavailable.tryPEN")}
          </p>
        </div>
      </div>
    );
  }

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
                  } else {
                    setSelectedMethod("");
                  }
                }}
                defaultValue={field.value}
                value={field.value}
                className="flex gap-4"
              >
                <FormItem>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="PEN" />
                    <span>{t("form.currency.options.PEN")} (S/.)</span>
                  </label>
                </FormItem>
                <FormItem>
                  <label className="flex items-center gap-2">
                    <RadioGroupItem value="USD" />
                    <span>{t("form.currency.options.USD")} ($)</span>
                  </label>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price Summary */}
      <div className="rounded-lg border p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>
              {t("summary.adults", { count: reservation.totalAdults })}
            </span>
            <span>
              {currency === "PEN" ? "S/" : "$"} {totals.adultTotal.toFixed(2)}
            </span>
          </div>
          {reservation.totalChildren > 0 && (
            <div className="flex justify-between">
              <span>
                {t("summary.children", { count: reservation.totalChildren })}
              </span>
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
            <FormLabel>{t("form.payment.label")}</FormLabel>
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
                    htmlFor="PAYPAL"
                    className={cn(
                      "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent",
                      field.value === "PAYPAL"
                        ? "border-primary bg-accent"
                        : "border-muted",
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem
                        value="PAYPAL"
                        id="PAYPAL"
                        className="sr-only"
                      />
                    </FormControl>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Paypal</span>
                        <Paypal className="h-5 w-auto" />
                      </div>
                      {field.value === "PAYPAL" && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </label>
                </FormItem>

                {currency === "PEN" && (
                  <FormItem className="m-0">
                    <label
                      htmlFor="IZIPAY"
                      className={cn(
                        "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent",
                        field.value === "IZIPAY"
                          ? "border-primary bg-accent"
                          : "border-muted",
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem
                          value="IZIPAY"
                          id="IZIPAY"
                          className="sr-only"
                        />
                      </FormControl>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Izipay</span>
                          <Izipay className="h-5 w-auto" />
                        </div>
                        {field.value === "IZIPAY" && (
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

      {/* Terms and Conditions */}
      <FormField
        control={control}
        name="payment.terms"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <label className="flex w-fit cursor-pointer items-center rounded-lg border border-transparent px-3 py-2 transition-all hover:bg-secondary/10">
                <span className="inline-flex items-center">
                  <span className="relative flex cursor-pointer items-center">
                    <input
                      className={cn("peer size-5 opacity-0")}
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <span className="absolute inset-0 rounded-[5px] border border-secondary before:absolute before:inset-0 before:scale-0 before:rounded-[4px] before:bg-secondary before:transition-all peer-checked:before:scale-105" />
                  </span>
                  <span className="ml-2 inline-flex cursor-pointer gap-1 text-sm text-neutral-600">
                    {t("form.terms.label")}
                    <Link
                      href="/terms-and-conditions"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      {t("form.terms.link")}
                    </Link>
                  </span>
                </span>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Privacy Policy */}
      <FormField
        control={control}
        name="payment.politics"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <label className="flex w-fit cursor-pointer items-center rounded-lg border border-transparent px-3 py-2 transition-all hover:bg-secondary/10">
                <span className="inline-flex items-center">
                  <span className="relative flex cursor-pointer items-center">
                    <input
                      className={cn("peer size-5 opacity-0")}
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <span className="absolute inset-0 rounded-[5px] border border-secondary before:absolute before:inset-0 before:scale-0 before:rounded-[4px] before:bg-secondary before:transition-all peer-checked:before:scale-105" />
                  </span>
                  <span className="ml-2 inline-flex cursor-pointer gap-1 text-sm text-neutral-600">
                    {t("form.politics.label")}
                    <Link
                      href="/politics"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      {t("form.politics.link")}
                    </Link>
                  </span>
                </span>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* PayPal Button */}
      {/* {isSuccessRegisterClass && dataTransaction && (
        <PaypalPaymentMethod
          transactionData={dataTransaction}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
        />
      )} */}
    </div>
  );
}

import { useRegisterClass } from "@/hooks/use-class-registration";
import { useReservation } from "@/hooks/use-reservation";
import { usePricesQuery } from "@/redux/services/classApi";
import { PaypalTransactionData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import PayPalButton from "./PaypalButton";

export const StepConfirm = () => {
  const t = useTranslations("class.step5");
  const { reservation } = useReservation();
  const { data } = usePricesQuery();

  const getPrices = useCallback(() => {
    if (data) {
      const priceAdult = data?.find((p) => p.classTypeUser === "ADULT")?.price;
      const priceChild = data?.find((p) => p.classTypeUser === "CHILD")?.price;
      return { priceAdult, priceChild };
    }
  }, [data]);

  const { priceAdult, priceChild } = getPrices() || {};

  const subTotal = useCallback(() => {
    if (priceAdult && priceChild) {
      return (
        reservation.adults * priceAdult + reservation.children * priceChild
      );
    }
  }, [priceAdult, priceChild, reservation.adults, reservation.children]);
  const total = subTotal() || 0;

  const { registerClass, isSuccessRegisterClass, isLoadingRegisterClass } =
    useRegisterClass();

  const [dataTransaction, setDataTransaction] =
    useState<PaypalTransactionData>();
  const handleClassRegister = async () => {
    const payload = {
      userName: reservation.userName,
      userEmail: reservation.userEmail,
      userPhone: reservation.userPhone,
      scheduleClass: reservation.time,
      languageClass: reservation.language,
      dateClass: reservation.date?.toISOString() || "",
      totalAdults: reservation.adults,
      totalChildren: reservation.children,
      typeCurrency: "DOLAR",
      comments: reservation.comments === "" ? "" : reservation.comments,
      paypalOrderId: "",
      paypalOrderStatus: "",
      paypalAmount: total.toFixed(2),
      paypalCurrency: "USD",
      paypalDate: "",
    };
    try {
      const response = await registerClass(payload).unwrap();
      if (response.statusCode === 201)
        setDataTransaction({ ...payload, ...response.data });
    } catch (error) {
      const errorMessage = (error as { data: { message: string } }).data
        .message;
      toast.error(errorMessage);
    }
  };
  const formSchema = z.object({
    terms: z.boolean().refine((v) => v, { message: t("errors.terms") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.terms) {
      handleClassRegister();
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <div className="flex w-full justify-between text-gray-700">
        <p className="text-sm sm:text-base">
          <strong>
            {" "}
            {t("subtotalDetail.adults")} ({reservation.adults})
          </strong>{" "}
          ${priceAdult} x {reservation.adults}
        </p>
        <p className="text-sm font-bold sm:text-base">
          ${(reservation.adults * (priceAdult ?? 0)).toFixed(2)}
        </p>
      </div>
      <div className="flex w-full justify-between text-gray-700">
        <p className="text-sm sm:text-base">
          <strong>
            {" "}
            {t("subtotalDetail.children")} ({reservation.children}):
          </strong>{" "}
          ${priceChild} x {reservation.children}
        </p>
        <p className="text-sm font-bold sm:text-base">
          ${(reservation.children * (priceChild ?? 0)).toFixed(2)}
        </p>
      </div>

      <Separator />
      {/* Subtotal final */}
      <div className="mt-4 flex w-full justify-between text-gray-700">
        <p className="text-base font-extrabold sm:text-lg">
          {t("subtotalDetail.title")}
        </p>
        <p className="text-base font-extrabold sm:text-lg">
          ${subTotal()?.toFixed(2)}
        </p>
      </div>

      <div className="flex w-full items-center justify-between text-gray-700">
        <span className="text-sm font-black sm:text-base">{t("total")}</span>
        <span className="text-base font-black sm:text-lg">
          ${total.toFixed(2)}
        </span>
      </div>

      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-5 p-5 text-center"
        >
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label
                    className="flex w-fit cursor-pointer items-center rounded-lg border border-transparent px-3 py-2 transition-all hover:bg-secondary/10 focus:bg-secondary/30 active:border-secondary/30 active:bg-secondary/30"
                    htmlFor="terms-class"
                  >
                    <span className="inline-flex items-center">
                      <span className="relative flex cursor-pointer items-center">
                        <input
                          className={cn("peer size-5 opacity-0")}
                          id="terms-class"
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                        <span className="absolute inset-0 rounded-[5px] border border-secondary before:absolute before:inset-0 before:scale-0 before:rounded-[4px] before:bg-secondary before:transition-all peer-checked:before:scale-105 peer-hover:before:scale-50 peer-checked:peer-hover:before:scale-90" />
                      </span>
                      <span className="ml-2 cursor-pointer text-sm text-neutral-600 dark:text-neutral-500">
                        {t("terms.accord")}
                        <a
                          href=""
                          className="font-semibold text-primary"
                          target="_blank"
                        >
                          {t("terms.terms")}
                        </a>
                      </span>
                    </span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isSuccessRegisterClass && (
            <Button type="submit" className="rounded-full text-lg font-bold">
              {isLoadingRegisterClass
                ? t("buttons.loading")
                : t("buttons.register")}
            </Button>
          )}
        </form>
      </Form>
      {isSuccessRegisterClass && dataTransaction && (
        <PayPalButton transactionData={dataTransaction} />
      )}
    </div>
  );
};

"use client";
import { useClients } from "@/hooks/use-client";
import {
  updateClientsSchema,
  UpdateClientsSchema,
} from "@/schemas/client/updateClientSchema";
import { ClientDataUpdate } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import DatePickerWithYearNavigation from "../ui/year-selector";

export function ProfileForm() {
  const t = useTranslations("account.profile");
  const { clientData, onUpdateClient } = useClients();
  const form = useForm<UpdateClientsSchema>({
    resolver: zodResolver(updateClientsSchema),
    defaultValues: {
      name: "",
      phone: "",
      birthDate: undefined,
    },
    mode: "onChange",
  });
  useEffect(() => {
    if (clientData) {
      form.reset({
        ...clientData,
        birthDate: new Date(clientData.birthDate),
      });
    }
  }, [clientData]);

  function onSubmit(data: Partial<ClientDataUpdate>) {
    onUpdateClient(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{t("name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("nameDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormDescription>{t("phoneDescription")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("birthdate")}</FormLabel>
              <FormControl>
                <DatePickerWithYearNavigation
                  selectedDate={field.value}
                  onDateChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{t("button")}</Button>
      </form>
    </Form>
  );
}

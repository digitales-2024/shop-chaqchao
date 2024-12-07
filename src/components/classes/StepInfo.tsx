"use client";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";

interface StepInfoProps {
  form: UseFormReturn<{ name: string; email: string; phone: string }>;
  onSubmit: (values: { name: string; email: string; phone: string }) => void;
}

export const StepInfo = ({ form, onSubmit }: StepInfoProps) => {
  const t = useTranslations("class.step1");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("label.name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("label.email")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("label.phone")}</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry="PE" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

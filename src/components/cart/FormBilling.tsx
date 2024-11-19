import { Invoice, Receipt } from "@/types";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import LocationSelector from "../ui/location-input";

interface FormBillingProps {
  form: UseFormReturn<Receipt | Invoice, unknown, undefined>;
}

export const FormBilling = ({ form }: FormBillingProps) => {
  const t = useTranslations("checkout.invoice");

  return (
    <>
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("address")}</FormLabel>
            <FormControl>
              <Input autoComplete="off" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("country")}</FormLabel>
            <FormControl>
              <LocationSelector
                onCountryChange={(country) => {
                  form.setValue(field.name, country?.name || "");
                }}
                onStateChange={(state) => {
                  form.setValue(field.name, state?.name || "");
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("city")}</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codPostal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("codPostal")}</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

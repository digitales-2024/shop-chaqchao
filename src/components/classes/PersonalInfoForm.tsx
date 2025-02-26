import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { PhoneInput } from "../ui/phone-input";
import { useReservation } from "@/hooks/use-reservation";
import { useEffect } from "react";

export function PersonalInfoForm() {
  const { control, watch } = useFormContext();
  const { setReservation } = useReservation();
  const t = useTranslations("class.steps.personal");

  // Sincronizar cambios del formulario con el estado global
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!name?.startsWith("personal.")) return;

      setReservation({
        userName: value.personal?.name,
        userEmail: value.personal?.email,
        userPhone: value.personal?.phone,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, setReservation]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <div className="space-y-4">
        <FormField
          control={control}
          name="personal.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("form.name.placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personal.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("form.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personal.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.phone.label")}</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry="PE" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { Izipay } from "@/assets/icons";

export function PaymentForm() {
  const { control } = useFormContext();
  const t = useTranslations("class.steps.payment");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
      <FormField
        control={control}
        name="payment.methodPayment"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="yape" />
                  </FormControl>
                  <FormLabel className="font-normal">Paypal</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="izipay" />
                  </FormControl>
                  <FormLabel className="inline-flex items-center gap-2 font-normal">
                    Izipay <Izipay className="h-4 w-auto" />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { Izipay, Paypal } from "@/assets/icons";
import { cn } from "@/lib/utils";

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
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

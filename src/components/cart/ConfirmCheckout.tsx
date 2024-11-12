import useCartDetail from "@/hooks/use-cart-detail";
import useCartStore from "@/redux/store/cart";
import { CartItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface ConfirmCheckoutProps {
  validateCart: (cartItems: CartItem[]) => Promise<any>;
}

export const ConfirmCheckout = ({ validateCart }: ConfirmCheckoutProps) => {
  const t = useTranslations("checkout.summary");
  const confirmCheckoutSchema = z.object({
    terms: z.boolean().refine(
      (value) => {
        return value === true;
      },
      { message: t("errors.terms") },
    ),
    privacy: z.boolean().refine(
      (value) => {
        return value === true;
      },
      { message: t("errors.privacy") },
    ),
  });

  type ConfirmCheckoutType = z.infer<typeof confirmCheckoutSchema>;

  const { dateOrder, invoice, login } = useCartDetail();

  const form = useForm<ConfirmCheckoutType>({
    resolver: zodResolver(confirmCheckoutSchema),
    defaultValues: {
      terms: false,
      privacy: false,
    },
  });

  const { cartItems } = useCartStore();

  const onConfirm = async () => {
    await validateCart(cartItems);
    if (cartItems.length === 0) {
      toast.error(t("errors.empty"), {
        position: "top-center",
      });
      return;
    }
  };

  // Confirmar que los datos del formulario esten completos para habilitar el boton de confirmar pedido
  const isFormComplete =
    dateOrder.date &&
    dateOrder.fullDate &&
    login.name &&
    login.email &&
    invoice.typeInvoice &&
    invoice.number;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onConfirm)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel htmlFor="terms">
                    <>
                      {t("terms")}{" "}
                      <a href="/" className="text-primary" target="_blank">
                        {t("termsLink")}
                      </a>
                    </>
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormLabel htmlFor="privacy">
                    <>
                      {t("privacy")}{" "}
                      <a href="/" className="text-primary" target="_blank">
                        {t("privacyLink")}
                      </a>
                    </>
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!isFormComplete ? (
          <Button
            className="w-full text-lg font-bold"
            disabled={
              !login.name ||
              !login.email ||
              !invoice.typeInvoice ||
              !dateOrder.fullDate
            }
          >
            {t("button")}
          </Button>
        ) : (
          <div
            className={cn(
              buttonVariants({}),
              "w-full cursor-not-allowed bg-primary/60 text-lg font-bold hover:bg-primary/60",
            )}
          >
            {t("button")}
          </div>
        )}
      </form>
    </Form>
  );
};

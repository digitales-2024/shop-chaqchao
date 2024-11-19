import { ShoppingCheck, ShoppingDelete } from "@/assets/icons";
import useCartDetail from "@/hooks/use-cart-detail";
import { usePayment } from "@/hooks/use-payment";
import useCartStore from "@/redux/store/cart";
import { CartItem } from "@/types";
import { getDataOrderDynamic } from "@/utils/getDataOrderDynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import PaymentConfirm from "./PaymentConfirm";

const currency = "PEN";
interface ConfirmCheckoutProps {
  validateCart: (cartItems: CartItem[]) => Promise<boolean>;
}

interface OrderInfo {
  transactionId: string;
  orderNumber: string;
  merchantCode: string;
  publicKey: string;
  amount: string;
  currency: string;
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

  const { dateOrder, invoice, contact } = useCartDetail();

  const form = useForm<ConfirmCheckoutType>({
    resolver: zodResolver(confirmCheckoutSchema),
    defaultValues: {
      terms: false,
      privacy: false,
    },
  });

  const { cartItems, amountTotal } = useCartStore();

  const router = useRouter();

  const [showPayment, setShowPayment] = useState(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingGenerateToken, setIsLoadingGenerateToken] = useState(false);

  const { generatePaymentToken } = usePayment();

  const onConfirm = async () => {
    const merchantCode = process.env.NEXT_PUBLIC_IZIPAY_MERCHANT_CODE ?? "";
    const publicKey = process.env.NEXT_PUBLIC_IZIPAY_PUBLIC_KEY ?? "";

    try {
      await validateCart(cartItems);
      if (cartItems.length === 0) {
        toast.error(t("errors.empty"), { position: "top-center" });

        setTimeout(() => {
          router.replace("/");
        }, 1000);

        return;
      }
      setIsLoadingGenerateToken(true);

      // Generar un nuevo transactionId y orderNumber
      const { transactionId, orderNumber } = getDataOrderDynamic();

      // Calcular el monto total como string con dos decimales
      const amount = amountTotal.toFixed(2).toString();

      // Establecer el estado de orderInfo
      const newOrderInfo: OrderInfo = {
        transactionId,
        orderNumber,
        merchantCode,
        publicKey,
        amount,
        currency,
      };

      setOrderInfo(newOrderInfo);

      // Generar el token de pago
      const tokenResponse = await generatePaymentToken({
        transaction: transactionId,
        body: {
          requestSource: "ECOMMERCE",
          merchantCode: merchantCode,
          orderNumber: orderNumber,
          publicKey: publicKey,
          amount: amount,
        },
      });

      if (!tokenResponse) {
        throw new Error("Error al generar token");
      }

      setToken(tokenResponse ?? null);
      setIsLoadingGenerateToken(false);
      setShowPayment(true);
    } catch (error) {
      toast("Ops!", {
        description: "Algo salió mal, por favor intenta de nuevo.",
        icon: <ShoppingDelete />,
        className: "text-rose-500",
      });
      setIsLoadingGenerateToken(false);
      setShowPayment(false);
      setOrderInfo(null);
    }
  };

  const handlePaymentSuccess = () => {
    toast("¡Pago realizado con éxito!", {
      description: "Gracias por tu compra.",
      icon: <ShoppingCheck />,
      className: "text-green-500",
    });
    // Resetear estados o redireccionar según sea necesario
    setOrderInfo(null);
    setToken(null);
    setShowPayment(false);
    // Opcional: Vaciar el carrito, redirigir, etc.
  };

  const handlePaymentError = () => {
    toast("Ops!", {
      description: "Algo salió mal, por favor intenta de nuevo.",
      icon: <ShoppingDelete />,
      className: "text-rose-500",
    });
    // Resetear orderInfo y token para permitir reintentar
    setOrderInfo(null);
    setToken(null);
    setShowPayment(false);
  };

  // Confirmar que los datos del formulario estén completos para habilitar el botón de confirmar pedido
  const isFormComplete =
    dateOrder.date &&
    dateOrder.fullDate &&
    contact.email &&
    invoice.typeInvoice &&
    invoice.number;

  return (
    <>
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
          {!showPayment &&
            (!!isFormComplete ? (
              <Button
                className="w-full text-lg font-bold"
                disabled={
                  !contact.email ||
                  !invoice.typeInvoice ||
                  !dateOrder.fullDate ||
                  isLoadingGenerateToken
                }
              >
                {isLoadingGenerateToken ? (
                  <>
                    <RefreshCcw className="animate-spin" />
                    {t("loading")}
                  </>
                ) : (
                  t("button")
                )}
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
            ))}
        </form>
      </Form>
      {showPayment && orderInfo && (
        <PaymentConfirm
          token={token}
          orderInfo={orderInfo}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      )}
    </>
  );
};

import { ShoppingCheck, ShoppingDelete } from "@/assets/icons";
import { useCart } from "@/hooks/use-cart";
import useCartDetail from "@/hooks/use-cart-detail";
import { usePayment } from "@/hooks/use-payment";
import useCartStore from "@/redux/store/cart";
import { CartItem, CartItemInfo, CreatePayment } from "@/types";
import { getDataOrderDynamic } from "@/utils/getDataOrderDynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import KRGlue from "@lyracom/embedded-form-glue";
import { RefreshCcw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
import { AlertSuccessCheckout } from "./AlertSuccessCheckout";
import PaymentForm from "./PaymentForm";

const currency = "PEN";
interface ConfirmCheckoutProps {
  validateCart: (cartItems: CartItem[]) => Promise<boolean>;
}

export const ConfirmCheckout = ({ validateCart }: ConfirmCheckoutProps) => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

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

  const { cartItems, amountTotal, clearCart } = useCartStore();
  const { checkoutCart, completeCart } = useCart();
  const [token, setToken] = useState<string>("");

  const router = useRouter();

  const [showPayment, setShowPayment] = useState(false);
  const [orderInfo, setOrderInfo] = useState<CreatePayment | null>(null);
  const [isLoadingGenerateToken, setIsLoadingGenerateToken] = useState(false);

  const { generatePaymentToken } = usePayment();

  const onConfirm = async () => {
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
      const { orderNumber } = getDataOrderDynamic();

      // Calcular el monto total como string con dos decimales
      const amount = amountTotal;

      // Establecer el estado de orderInfo
      const newOrderInfo: CreatePayment = {
        amount: amount * 100,
        currency,
        orderId: orderNumber,
        customer: {
          email: contact.email,
          reference: contact.phone,
          billingDetails: {
            address: invoice.address,
            city: invoice.city,
            country: invoice.country,
            state: invoice.state,
            firstName: contact.name,
            lastName: contact.lastName,
            phoneNumber: contact.phone,
            identityCode: invoice.number,
          },
          shoppingCart: {
            cartItemInfo: cartItems.map(
              (item) =>
                ({
                  productLabel: item.name,
                  productType: "FOOD_AND_GROCERY",
                  productQty: item.quantity,
                  productAmount: item.price * 100,
                }) as CartItemInfo,
            ),
          },
        },
      };

      setOrderInfo(newOrderInfo);
      // Generar el token de pago
      const tokenResponse = await generatePaymentToken(newOrderInfo);
      if (!tokenResponse) {
        throw new Error("Error al generar token");
      }

      setIsLoadingGenerateToken(false);
      // Completar el carrito
      await completeCart();
      setToken(tokenResponse.token ?? "");
      payment(tokenResponse.token ?? "");
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

  const handlePaymentSuccess = async () => {
    await checkoutCart();

    toast("¡Pago realizado con éxito!", {
      description: "Gracias por tu compra.",
      icon: <ShoppingCheck />,
      className: "text-green-500",
    });
    // Resetear estados o redireccionar según sea necesario
    setOrderInfo(null);
    setShowPayment(false);
    // Opcional: Vaciar el carrito, redirigir, etc.
    clearCart();
  };

  const handlePaymentError = () => {
    toast("Ops!", {
      description: "Algo salió mal, por favor intenta de nuevo.",
      icon: <ShoppingDelete />,
      className: "text-rose-500",
    });
    // Resetear orderInfo y token para permitir reintentar
    setOrderInfo(null);
    setShowPayment(false);
  };

  // Confirmar que los datos del formulario estén completos para habilitar el botón de confirmar pedido
  const isFormComplete =
    dateOrder.date &&
    dateOrder.fullDate &&
    contact.email &&
    invoice.typeInvoice &&
    invoice.number;

  const endpoint =
    process.env.NEXT_PUBLIC_IZIPAY_PAYMENT_ENDPOINT ||
    "https://api.micuentaweb.pe";
  const publicKey = process.env.NEXT_PUBLIC_IZIPAY_PAYMENT_PUBLIC_KEY || "";

  const locale = useLocale();

  const payment = (token: string) => {
    try {
      getFormToken(token);
      setShowPayment(true);
    } catch (error) {
      handlePaymentError();
    }
  };
  const getFormToken = async (token: string) => {
    try {
      const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);
      await KR.setFormConfig({
        formToken: token,
        "kr-language": locale,
        "kr-public-key": publicKey,
      });

      await KR.onError((error) => {
        toast(error.errorMessage, {
          description: error.detailedErrorMessage,
          icon: <ShoppingDelete />,
          className: "text-rose-500",
        });
      });

      await KR.onPopinClosed(() => {
        toast("¡Pago cancelado!", {
          description: "El pago ha sido cancelado.",
          icon: <ShoppingDelete />,
          className: "text-rose-500",
        });
      });

      await KR.onSubmit((paymentData) => {
        if (paymentData.clientAnswer.orderStatus === "PAID") {
          handlePaymentSuccess();
        }
        setOpenAlertDialog(true);
        KR.closePopin("#formPayment"); // Close the popin after payment
        return false;
      });

      await KR.renderElements(
        "#formPayment",
      ); /* Render the payment form into myPaymentForm div*/
    } catch (error) {
      toast("Ops!", {
        description: "Algo salió mal, por favor intenta de nuevo.",
        icon: <ShoppingDelete />,
        className: "text-rose-500",
      });
    }
  };

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
        <>
          <div className="d-flex justify-content-center">
            <div
              id="myDIV"
              className="formulario"
              style={{ display: showPayment ? "block" : "none" }}
            >
              <div id="formPayment">
                {/* Formulario de pago POPIN */}
                <PaymentForm popin={true} token={token} />
              </div>
            </div>
          </div>
        </>
      )}
      {openAlertDialog && (
        <AlertSuccessCheckout
          isOpen={openAlertDialog}
          setIsOpen={setOpenAlertDialog}
        />
      )}
    </>
  );
};

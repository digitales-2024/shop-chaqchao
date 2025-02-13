import {
  useConfirmClassPayment,
  useRegisterClass,
} from "@/hooks/use-class-registration";
import { PaypalPaymentMethodProps } from "@/types/payment";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { toast } from "sonner";

import { AlertSuccessPayment } from "./AlertSuccessPayment";

export function PaypalPaymentMethod({
  transactionData,
  onPaymentSuccess,
  onPaymentError,
}: PaypalPaymentMethodProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  const { confirmPayment } = useConfirmClassPayment();
  const { registerClass } = useRegisterClass();
  const [open, setOpen] = useState(false);

  const handleClassRegistration = async (paypalDetails: any) => {
    try {
      const finalTransactionData = {
        ...transactionData,
        paypalOrderId: String(paypalDetails.id),
        paypalOrderStatus: String(paypalDetails.status),
        paypalDate: String(paypalDetails.create_time),
        paypalCurrency: String(
          paypalDetails?.purchase_units?.[0]?.amount?.currency_code || "USD",
        ),
      };

      // Registrar la clase
      const registerResponse =
        await registerClass(finalTransactionData).unwrap();

      if (registerResponse.statusCode === 201) {
        // Confirmar el pago
        const confirmResponse = await confirmPayment({
          id: registerResponse.data.id || "",
          paypalData: finalTransactionData,
        });

        if (confirmResponse.data) {
          setOpen(true);
          onPaymentSuccess?.(paypalDetails.status);
        } else if (confirmResponse.error) {
          throw new Error(
            typeof confirmResponse.error === "object" && confirmResponse.error
              ? (confirmResponse.error as any).message || "Error desconocido"
              : "Error al confirmar el pago",
          );
        }
      }
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message || "Error desconocido";
      toast.error("Ocurrió un error al procesar el pago", {
        description: errorMessage,
      });
      onPaymentError?.();
    }
  };

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: clientId,
          components: "buttons",
          currency: "USD",
        }}
      >
        <div className="w-full">
          <PayPalButtons
            style={{
              layout: "horizontal",
              tagline: false,
            }}
            className="z-10 w-full rounded-full"
            createOrder={(_data, actions) => {
              if (parseFloat(transactionData.paypalAmount) <= 0) {
                toast.error(
                  "El monto total debe ser mayor a cero para realizar el pago",
                );
                return Promise.reject(
                  "El monto total debe ser mayor a cero para realizar el pago",
                );
              }
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: transactionData.paypalAmount,
                    },
                  },
                ],
              });
            }}
            onApprove={async (_data, actions) => {
              if (actions && actions.order) {
                const details = await actions.order.capture();
                await handleClassRegistration(details);
              }
            }}
            onCancel={() => {
              toast.error("Pago cancelado");
            }}
            onError={() => {
              toast.error("Ocurrió un error al procesar el pago");
            }}
          />
        </div>
      </PayPalScriptProvider>
      {open && (
        <AlertSuccessPayment
          isOpen={open}
          setIsOpen={setOpen}
          title="¡Pago exitoso!"
          description="Tu pago se ha procesado correctamente. La clase ha sido registrada."
          buttonText="Finalizar"
        />
      )}
    </>
  );
}

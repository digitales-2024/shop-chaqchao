import { useConfirmClassPayment } from "@/hooks/use-class-registration";
import { PaypalTransactionData } from "@/types";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { toast } from "sonner";

import { AlertSuccessPayment } from "./AlertSuccessPayment";

interface PayPalButtonProps {
  transactionData: PaypalTransactionData;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ transactionData }) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  const { confirmPayment } = useConfirmClassPayment();

  const [open, setOpen] = useState(false);

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: clientId,
          components: "buttons",
          intent: "capture",
          "disable-funding": "card",
        }}
      >
        <div className="w-full">
          <PayPalButtons
            forceReRender={[clientId]} // Para asegurar que el botón se re-renderice si cambia el clientId
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
                      currency_code: transactionData.typeCurrency,
                      value: transactionData.paypalAmount,
                    },
                  },
                ],
              });
            }}
            onClick={() => {
              if (parseFloat(transactionData.paypalAmount) <= 0) {
                console.warn("Payment attempt with zero amount");
              }
            }}
            onApprove={async (_data, actions) => {
              if (actions && actions.order) {
                const details = await actions.order.capture();
                const finalTransactionData = {
                  ...transactionData,
                  paypalOrderId: String(details.id),
                  paypalOrderStatus: String(details.status),
                  paypalDate: String(details.create_time),
                  paypalCurrency: String(
                    details?.purchase_units?.[0]?.amount?.currency_code ||
                      "USD",
                  ),
                };
                try {
                  const response = await confirmPayment({
                    id: finalTransactionData.id || "",
                    paypalData: finalTransactionData,
                  });

                  if (response.data) {
                    setOpen(true);
                  } else if (response.error) {
                    const errorMessage =
                      (response.error as { message?: string }).message ||
                      "Error desconocido";
                    toast("Ocurrió un error al confirmar el pago", {
                      description: errorMessage,
                    });
                  }
                } catch (error) {
                  const errorMessage =
                    (error as { message?: string }).message ||
                    "Error desconocido";
                  toast("Ocurrió un error al confirmar el pago", {
                    description: errorMessage,
                  });
                }
              }
            }}
            onCancel={() => {
              toast.error("Pago cancelado");
            }}
            onError={(err) => {
              console.error("Error en PayPal:", err);
              // Manejar error de bloqueador de anuncios
              if (err.toString().includes("ERR_BLOCKED_BY_CLIENT")) {
                toast.error("El botón de PayPal no se pudo cargar", {
                  description:
                    "Por favor, desactiva el bloqueador de anuncios para continuar con el pago",
                  duration: 5000,
                });
                return;
              }

              toast.error("Error al procesar el pago con PayPal", {
                description:
                  "Por favor, intenta nuevamente o utiliza otro método de pago",
              });
            }}
          />
        </div>
      </PayPalScriptProvider>
      {open && <AlertSuccessPayment isOpen={open} setIsOpen={setOpen} />}
    </>
  );
};

export default PayPalButton;

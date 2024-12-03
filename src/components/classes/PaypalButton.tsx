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
            onClick={() => {
              if (parseFloat(transactionData.paypalAmount) <= 0) {
                console.warn("Payment attempt with zero amount");
              }
            }}
            onApprove={async (_data, actions) => {
              if (actions && actions.order) {
                const details = await actions.order.capture();
                console.log("🚀 ~ details:", details);
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
                console.log(
                  "🚀 ~ onApprove={ ~ finalTransactionData:",
                  finalTransactionData,
                );

                try {
                  const response = await confirmPayment({
                    id: finalTransactionData.id,
                    paypalData: finalTransactionData,
                  }).unwrap();

                  if (response.statusCode === 200) {
                    setOpen(true);
                  }
                } catch (error) {
                  toast("Ocurrió un error al confirmar el pago", {
                    description: error.message || "Error desconocido",
                  });
                }
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
      {open && <AlertSuccessPayment isOpen={open} setIsOpen={setOpen} />}
    </>
  );
};

export default PayPalButton;

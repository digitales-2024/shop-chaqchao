import { PayPalButtonProps } from "@/types/paypal";
import { showToast } from "@/utils/helpers";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton: React.FC<PayPalButtonProps> = ({
  getTransactionData,
  onNext,
  onPaymentSuccess,
  onCancel,
}) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
      }}
    >
      <div className="w-60 overflow-hidden rounded-[20px]">
        <PayPalButtons
          style={{
            layout: "horizontal",
            tagline: false,
          }}
          className="h-9 w-60"
          createOrder={(_data, actions) => {
            const transactionData = getTransactionData();
            if (parseFloat(transactionData.paypalAmount) <= 0) {
              alert(
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
            const transactionData = getTransactionData();
            if (parseFloat(transactionData.paypalAmount) <= 0) {
              console.warn("Intento de pago con monto cero");
            }
          }}
          onApprove={async (_data, actions) => {
            if (actions && actions.order) {
              const details = await actions.order.capture();
              const finalTransactionData = {
                ...getTransactionData(),
                paypalOrderId: String(details.id),
                paypalOrderStatus: String(details.status),
                paypalDate: String(details.create_time),
                paypalCurrency: String(
                  details?.purchase_units?.[0]?.amount?.currency_code || "USD",
                ),
              };

              onPaymentSuccess(finalTransactionData);
              if (finalTransactionData.paypalOrderStatus === "COMPLETED")
                onNext();
            }
          }}
          onCancel={() => {
            showToast("Pago cancelado", "error");
            if (onCancel) onCancel();
          }}
          onError={(err) => console.error("Error en el pago de PayPal", err)}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

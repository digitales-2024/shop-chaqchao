import useIzipay from "@/hooks/use-izipay";
import { usePayment } from "@/hooks/use-payment";
import useCartStore from "@/redux/store/cart";
import { getDataOrderDynamic } from "@/utils/getDataOrderDynamic";
import React, { useEffect, useState } from "react";

import { ButtonPayment } from "./ButtonPayment";

const { transactionId, orderNumber } = getDataOrderDynamic();

/* Inicio datos del comercio */
const MERCHANT_CODE = "4001834";
const PUBLIC_KEY = "VErethUtraQuxas57wuMuquprADrAHAb";
/* Fin datos del comercio */

/************* Inicio datos de la transacción **************/
const TRANSACTION_ID = transactionId;
const ORDER_NUMBER = orderNumber;
const ORDER_CURRENCY = "PEN";

interface PaymentConfirmProps {
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentConfirm: React.FC<PaymentConfirmProps> = ({ setIsConfirm }) => {
  const [token, setToken] = useState<string | null>(null);
  const { generatePaymentToken } = usePayment();
  const { loadIzipayForm } = useIzipay(token);
  const { amountTotal } = useCartStore();

  const AMOUNT = amountTotal.toFixed(2).toString() ?? "00.00";

  useEffect(() => {
    const fetchToken = async () => {
      const data = await generatePaymentToken({
        transaction: TRANSACTION_ID,
        body: {
          requestSource: "ECOMMERCE",
          merchantCode: MERCHANT_CODE,
          orderNumber: ORDER_NUMBER,
          publicKey: PUBLIC_KEY,
          amount: AMOUNT,
        },
      }).catch(() => {
        if (setIsConfirm) {
          setIsConfirm(false);
        }
      });
      if (data) {
        setToken(data);
      }
    };

    fetchToken();
  }, []);

  const iziConfig = {
    transactionId: TRANSACTION_ID,
    action: "pay",
    merchantCode: MERCHANT_CODE,
    order: {
      orderNumber: ORDER_NUMBER,
      currency: ORDER_CURRENCY,
      amount: AMOUNT,
      processType: "AT",
      merchantBuyerId: "mc1768",
      dateTimeTransaction: "1670258741603000",
      payMethod: "all",
    },
    billing: {
      firstName: "Juan",
      lastName: "Wick",
      email: "jwick@izipay.pe",
      phoneNumber: "989339999",
      street: "calle el demo",
      city: "lima",
      state: "lima",
      country: "PE",
      postalCode: "00001",
      document: "12345678",
      documentType: "DNI",
    },
    render: {
      typeForm: "pop-up",
      container: "#your-iframe-payment",
      showButtonProcessForm: false,
    },
    urlRedirect: "https://server.punto-web.com/comercio/creceivedemo.asp?p=h1",
    appearance: {
      customTheme: {
        colors: {
          primary: {
            background: "#f38e1b",
            color: "#FFFFFF",
          },
        },
      },
      customize: {
        elements: [
          {
            paymentMethod: "CARD",
            fields: [
              {
                name: "firstName",
                order: 1,
              },
              {
                name: "lastName",
                order: 1,
              },
              {
                name: "cardNumber",
                order: 2,
              },
              {
                name: "expirationDate",
                order: 3,
              },
              {
                name: "securityCode",
                order: 3,
              },
              {
                name: "email",
                order: 4,
              },
            ],
          },
        ],
      },
    },
  };

  const handlePayment = () => {
    loadIzipayForm(iziConfig, (response: any) => {
      document.querySelector("#payment-message")!.innerHTML = JSON.stringify(
        response,
        null,
        2,
      );
    });
  };

  return (
    <div>
      <ButtonPayment onClick={handlePayment} disabled={!token} />
      <div id="your-iframe-payment"></div>
      <pre id="payment-message"></pre>
    </div>
  );
};

export default PaymentConfirm;

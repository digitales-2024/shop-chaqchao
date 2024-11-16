import useIzipay from "@/hooks/use-izipay";
import React from "react";

import { ButtonPayment } from "./ButtonPayment";

interface PaymentConfirmProps {
  token: string | null;
  orderInfo: {
    transactionId: string;
    orderNumber: string;
    merchantCode: string;
    amount: string;
  };
  onPaymentSuccess: () => void;
  onPaymentError: () => void;
}

const PaymentConfirm = ({
  token,
  orderInfo,
  onPaymentSuccess,
  onPaymentError,
}: PaymentConfirmProps) => {
  const { loadIzipayForm } = useIzipay(token);

  const iziConfig = {
    transactionId: orderInfo.transactionId,
    action: "pay",
    merchantCode: orderInfo.merchantCode,
    order: {
      orderNumber: orderInfo.orderNumber,
      currency: "PEN",
      amount: orderInfo.amount,
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

  const handleLoadForm = () => {
    loadIzipayForm(iziConfig, (response) => {
      if (response.code === "00") {
        onPaymentSuccess();
      } else {
        onPaymentError();
      }
    });
  };

  return <ButtonPayment onClick={handleLoadForm} />;
};

export default PaymentConfirm;

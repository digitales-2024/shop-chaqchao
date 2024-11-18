import useCartDetail from "@/hooks/use-cart-detail";
import useIzipay from "@/hooks/use-izipay";
import { getDateTimeTransaction } from "@/utils/getDateTimeTransaction";
import { getMerchantBuyerId } from "@/utils/getMerchantBuyerId";
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
  const { login, invoice } = useCartDetail();

  const iziConfig = {
    transactionId: orderInfo.transactionId,
    action: "pay",
    merchantCode: orderInfo.merchantCode,
    order: {
      orderNumber: orderInfo.orderNumber,
      currency: "PEN",
      amount: orderInfo.amount,
      processType: "AT",
      merchantBuyerId: getMerchantBuyerId,
      dateTimeTransaction: getDateTimeTransaction,
      payMethod: "CARD,YAPE_CODE,PAGO_PUSH",
    },
    billing: {
      firstName: login.name ?? "hola",
      lastName: "nose",
      email: login.email ?? "",
      phoneNumber: "",
      street: invoice.address ?? "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      document: invoice.number,
      documentType: invoice.documentType,
    },
    render: {
      typeForm: "pop-up",
      showButtonProcessForm: false,
    },
    urlRedirect: "https://server.punto-web.com/comercio/creceivedemo.asp?p=h1", // TODO Cambiar por la URL de redirección
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

import { ShoppingDelete } from "@/assets/icons";
import { useGeneratePaymentTokenMutation } from "@/redux/services/paymentApi";
import { CreatePayment } from "@/types";
import { createElement } from "react";
import { toast } from "sonner";

type UsePayment = CreatePayment;

export const usePayment = () => {
  const [generatePaymentTokenMutation] = useGeneratePaymentTokenMutation();

  const generatePaymentToken = async (data: UsePayment) => {
    console.log("🚀 ~ generatePaymentToken ~ data:", data);
    try {
      const response = await generatePaymentTokenMutation(data).unwrap();

      if (response.code !== "200") {
        toast("Ops!", {
          description: response.message,
          icon: createElement(ShoppingDelete),
          className: "text-rose-500",
        });
      }
      return response.response.token;
    } catch (error) {
      toast("Ops!", {
        description: "Algo salio mal, por favor intenta de nuevo.",
        icon: createElement(ShoppingDelete),
        className: "text-rose-500",
      });
    }
  };

  return { generatePaymentToken };
};

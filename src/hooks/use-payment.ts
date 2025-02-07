import { ShoppingDelete } from "@/assets/icons";
import {
  useGeneratePaymentTokenMutation,
  useValidatePaymentMutation,
} from "@/redux/services/paymentApi";
import { CreatePayment } from "@/types";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { createElement } from "react";
import { toast } from "sonner";

type UsePayment = CreatePayment;

export const usePayment = () => {
  const [generatePaymentTokenMutation] = useGeneratePaymentTokenMutation();
  const [validatePaymentMutation] = useValidatePaymentMutation();
  const e = useTranslations("errors");

  const generatePaymentToken = async (data: UsePayment) => {
    console.log("🚀 ~ generatePaymentToken ~ data:", data);
    try {
      const token = await generatePaymentTokenMutation(data).unwrap();
      if (token) {
        toast(e("pay.ok"), {
          description: e("pay.valid"),
          icon: createElement(ShoppingBag),
          className: "text-emerald-500",
        });
      }

      return token;
    } catch (error) {
      toast(e("cart.title"), {
        description: e("network"),
        icon: createElement(ShoppingDelete),
        className: "text-rose-500",
      });

      return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleValidatePayment = async (resp: any) => {
    return await validatePaymentMutation(resp);
  };

  return { generatePaymentToken, handleValidatePayment };
};

import { ShoppingDelete } from "@/assets/icons";
import { useGeneratePaymentTokenMutation } from "@/redux/services/paymentApi";
import { CreatePayment } from "@/types";
import { ShoppingBag } from "lucide-react";
import { createElement } from "react";
import { toast } from "sonner";

type UsePayment = CreatePayment;

export const usePayment = () => {
  const [generatePaymentTokenMutation] = useGeneratePaymentTokenMutation();

  const generatePaymentToken = async (data: UsePayment) => {
    try {
      const token = await generatePaymentTokenMutation(data).unwrap();
      if (token) {
        toast("¡Bien hecho!", {
          description: "Carrito validado correctamente.",
          icon: createElement(ShoppingBag),
          className: "text-emerald-500",
        });
      }

      return token;
    } catch (error) {
      toast("Ops!", {
        description: "Algo salio mal, por favor intenta de nuevo",
        icon: createElement(ShoppingDelete),
        className: "text-rose-500",
      });

      return null;
    }
  };

  // const handleValidatePayment = async (resp) => {
  //   return await validatePaymentMutation(resp);

  // axios.post(`${server}/validatePayment`, resp).then(({ data }) => {
  //   if (data === "Valid Payment") {
  //     setIsShow(false);
  //     alert("Pago Satisfactorio");
  //   } else {
  //     alert("Pago Inválido");
  //   }
  // });
  // return false;
  // };

  return { generatePaymentToken };
};

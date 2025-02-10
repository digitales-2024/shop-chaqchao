import { useRegisterClass } from "@/hooks/use-class-registration";
import { useReservation } from "@/hooks/use-reservation";
import { PaypalTransactionData } from "@/types/payment";
import { useState } from "react";
import { toast } from "sonner";

interface UsePaymentLogicProps {
  currency: string;
  totals: {
    total: number;
  };
  onPaymentSuccess?: (status: string) => void;
  onPaymentError?: () => void;
}

export const usePaymentLogic = ({
  currency,
  totals,
  onPaymentSuccess,
  onPaymentError,
}: UsePaymentLogicProps) => {
  const { registerClass, isSuccessRegisterClass, isLoadingRegisterClass } =
    useRegisterClass();
  const { reservation } = useReservation();
  const [dataTransaction, setDataTransaction] =
    useState<PaypalTransactionData>();

  const handleClassRegister = async () => {
    if (!totals) {
      toast.error("No se pudieron calcular los totales");
      return;
    }

    if (currency !== "USD") {
      toast.error(
        "Para pagar con PayPal, debe seleccionar dólares como moneda",
      );
      return;
    }

    const payload = {
      userName: reservation.userName,
      userEmail: reservation.userEmail,
      userPhone: reservation.userPhone,
      scheduleClass: reservation.time,
      languageClass: reservation.language,
      dateClass: reservation.date?.toISOString() || "",
      totalAdults: reservation.adults,
      totalChildren: reservation.children,
      typeCurrency: "DOLAR",
      comments: reservation.comments === "" ? "" : reservation.comments,
      paypalOrderId: "",
      paypalOrderStatus: "",
      paypalAmount: totals.total.toFixed(2),
      paypalCurrency: "USD",
      paypalDate: "",
    };

    try {
      const response = await registerClass(payload).unwrap();
      if (response.statusCode === 201) {
        setDataTransaction({ ...payload, ...response.data });
        onPaymentSuccess?.("PENDING");
      }
    } catch (error) {
      const errorMessage =
        (error as { data: { message: string } }).data?.message ||
        "Error al registrar la clase";
      toast.error(errorMessage);
      onPaymentError?.();
    }
  };

  return {
    handleClassRegister,
    isSuccessRegisterClass,
    isLoadingRegisterClass,
    dataTransaction,
  };
};

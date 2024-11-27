import {
  useConfirmPaymentMutation,
  useRegisterClassMutation,
} from "@/redux/services/classApi";
import { CreateClassSchema } from "@/schemas/classRegisterSchema";
import { PaypalTransactionData } from "@/types/paypal";
import { showToast } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

export const useRegisterClass = () => {
  const [classId, setClassId] = useState<string>("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [registerClass, { isLoading }] = useRegisterClassMutation();
  const t = useTranslations("class.step7");

  const handleRegisterClass = useCallback(
    async (payload: CreateClassSchema) => {
      try {
        const response = await registerClass(payload).unwrap();
        showToast(t("toast.classRegisterSuccessfully"), "success");
        setClassId(response.data.id || "");
        setTimeout(() => setShowCountdown(true), 3000);
      } catch (error) {
        const err = error as { data: { message: string } };
        const errorMessage = err.data.message;

        switch (errorMessage) {
          case "There are no more spots available.":
            showToast(t("toast.noPlaceAvailable"), "error");
            break;
          case "Invalid number of participants":
            if (payload.totalAdults < 2 || payload.totalAdults > 8) {
              showToast(t("toast.invalidNumberParticipantsRange"), "error");
            } else {
              showToast(t("toast.invalidNumberParticipants"), "error");
            }
            break;
          case "Class is close":
            showToast(t("toast.classIsClose"), "error");
            break;
          case "Registration is close":
            showToast(t("toast.registrationIsClose"), "error");
            break;
          case "Invalid class date":
            showToast(t("toast.invalidClassDate"), "error");
            break;
          default:
            showToast(t("toast.errorRegisterClass"), "error");
        }
      }
    },
    [registerClass, t],
  );

  return {
    handleRegisterClass,
    classId,
    showCountdown,
    setShowCountdown,
    isLoading,
  };
};

export const useConfirmClassPayment = () => {
  const t = useTranslations("class.step7");
  const [confirmPayment, { isLoading, isError, isSuccess }] =
    useConfirmPaymentMutation();

  const confirmClassPayment = useCallback(
    async (id: string, paypalData: PaypalTransactionData) => {
      try {
        await confirmPayment({ id, paypalData }).unwrap();
        setTimeout(
          () => showToast(t("toast.paymentConfirmed"), "success"),
          2000,
        );
      } catch (error) {
        console.error("Error al confirmar el pago:", error);
        showToast(t("toast.errorConfirmPayment"), "error");
      }
    },
    [confirmPayment, t],
  );

  return { confirmClassPayment, isLoading, isError, isSuccess };
};

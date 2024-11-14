import { useConfirmPaymentMutation } from "@/redux/services/classApi";
import { CreateClassSchema } from "@/schemas/classRegisterSchema";
import { PaypalTransactionData } from "@/types/paypal";
import { showToast } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";

export const useRegisterClass = () => {
  const [classId, setClassId] = useState<string>("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("class.step7");

  const handleRegisterClass = useCallback(
    async (payload: CreateClassSchema) => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:4000/api/v1/classes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: payload.userName,
            userEmail: payload.userEmail,
            userPhone: payload.userPhone,
            scheduleClass: payload.scheduleClass,
            languageClass: payload.languageClass || "",
            dateClass: payload.dateClass.toString(),
            totalAdults: payload.totalAdults,
            totalChildren: payload.totalChildren,
            typeCurrency: payload.typeCurrency,
            comments: payload.comments || "Ninguna",
            paypalOrderId: payload.paypalOrderId || "",
            paypalOrderStatus: payload.paypalOrderStatus || "",
            paypalAmount: payload.paypalAmount || "",
            paypalCurrency: payload.paypalCurrency || "USD",
            paypalDate: payload.paypalDate || "",
          }),
        });

        const result = await response.json();
        setIsLoading(false);

        if (!response.ok) {
          switch (result.message) {
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
          return;
        }

        showToast(t("toast.classRegisterSuccessfully"), "success");
        setClassId(result.data?.id || "");
        setTimeout(() => setShowCountdown(true), 3000);
      } catch (error) {
        setIsLoading(false);
        showToast(t("toast.errorRegisterClass"), "error");
        console.error("Error al registrar la clase:", error);
      }
    },
    [t],
  );

  return {
    handleRegisterClass,
    classId,
    showCountdown,
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
          1950,
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

import { useRegisterClaimMutation } from "@/redux/services/claimApi";
import { ReclamationFormData } from "@/schemas/claimsSchema";
import { showToast } from "@/utils/helpers";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useRegisterClaim = () => {
  const [registerClaim, { isLoading }] = useRegisterClaimMutation();
  const router = useRouter();
  const t = useTranslations("claims");

  const handleRegisterClaim = useCallback(
    async (data: ReclamationFormData) => {
      try {
        const { fechaDia, fechaMes, fechaAnio, ...filteredData } = data;

        const dateClaim = new Date(
          `${fechaAnio}-${fechaMes.padStart(2, "0")}-${fechaDia.padStart(2, "0")}`,
        ).toISOString();

        const payload = {
          ...filteredData,
          dateClaim,
        };

        await registerClaim(payload).unwrap();

        showToast(t("messages.success"), "success");
        router.push("/");
      } catch (error) {
        showToast(t("messages.error"), "error");
      }
    },
    [registerClaim, router, t],
  );

  return {
    handleRegisterClaim,
    isLoading,
  };
};

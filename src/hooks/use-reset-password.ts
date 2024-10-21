import { useResetPasswordMutation } from "@/redux/services/clientApi";
import { CustomErrorData, ResetPassword } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useResetPassword = () => {
  const router = useRouter();
  const [
    resetPassword,
    {
      isSuccess: isSuccessResetPassword,
      isLoading: isLoadingResetPassword,
      error: errorResetPassword,
      data: dataResetPassword,
    },
  ] = useResetPasswordMutation();

  const onResetPassword = async (input: ResetPassword) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await resetPassword(input);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).error;
            const message = error as string;
            reject(new Error(message));
          }
          if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Restableciendo contraseña...",
      success: "Contraseña restablecida con éxito.",
      error: (error) => {
        return error.message;
      },
    });
  };

  useEffect(() => {
    if (isSuccessResetPassword && dataResetPassword) {
      router.replace("/sign-in");
    }
  }, [dataResetPassword, isSuccessResetPassword, router]);

  return {
    onResetPassword,
    isSuccessResetPassword,
    isLoadingResetPassword,
    errorResetPassword,
  };
};

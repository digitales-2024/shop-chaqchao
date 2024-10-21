import { useForgotPasswordMutation } from "@/redux/services/clientApi";
import { CustomErrorData, ForgotPassword } from "@/types";
import { toast } from "sonner";

export const useForgotPassword = () => {
  const [
    forgotPassword,
    {
      isSuccess: isSucessForgotPassword,
      isLoading: isLoadingForgotPassword,
      error: errorForgotPassword,
    },
  ] = useForgotPasswordMutation();
  const onForgotPassword = async (input: ForgotPassword) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await forgotPassword(input);
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
      loading: "Enviando correo...",
      success: "Correo enviado con éxito.",
      error: (error) => {
        return error.message;
      },
    });
  };
  return {
    onForgotPassword,
    isSucessForgotPassword,
    isLoadingForgotPassword,
    errorForgotPassword,
  };
};

import { useLoginMutation } from "@/redux/services/authApi";
import { Credentials, CustomErrorData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  const [login, { data, isSuccess, isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const onLogin: SubmitHandler<Credentials> = async (credentials) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await login(credentials);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
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
      loading: "Iniciando sesión...",
      success: "Sesión iniciada correctamente",
      error: (error) => {
        return error.message;
      },
    });
  };

  const googleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const googleAuthWindow = window.open(
      process.env.NEXT_PUBLIC_BACKEND_URL_GOOGLE_LOGIN,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`,
    );

    // Verificar si la ventana se ha cerrado
    const checkWindowClosed = setInterval(() => {
      if (googleAuthWindow && googleAuthWindow.closed) {
        clearInterval(checkWindowClosed);
        // Después de que la ventana se cierra, recargar la página
        window.location.reload();
      }
    }, 500);
  };

  useEffect(() => {
    if (isSuccess && data) {
      router.replace("/");
    }
  }, [data, isSuccess, router]);

  return { onLogin, googleLogin, isLoading, error };
};

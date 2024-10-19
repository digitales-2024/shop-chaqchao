import { useCreateClientMutation } from "@/redux/services/authApi";
import { CreateClientInputSchema } from "@/schemas/client/createClientsSchema";
import { CustomErrorData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useRegister = () => {
  const router = useRouter();
  const [
    createClient,
    { isSuccess: isSuccessCreateClient, data: dataRegisterClient },
  ] = useCreateClientMutation();

  const onCreateClient = async (input: CreateClientInputSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClient(input);
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
      loading: "Creando usuario...",
      success: "Usuario creado con exitoso.",
      error: (error) => {
        return error.message;
      },
    });
  };

  useEffect(() => {
    if (isSuccessCreateClient && dataRegisterClient) {
      router.replace("/");
    }
  }, [dataRegisterClient, isSuccessCreateClient, router]);
  return {
    onCreateClient,
  };
};

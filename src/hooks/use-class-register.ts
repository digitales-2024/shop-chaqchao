import { useCreateClassRegistrationMutation } from "@/redux/services/classApi"; // Endpoint para crear una clase
import { CreateClassSchema } from "@/schemas/classRegisterSchema";
import { CustomErrorData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useClassRegister = () => {
  const router = useRouter();

  // Mutation para crear la clase
  const [
    createClassRegistration,
    { isSuccess: isSuccessCreateClass, data: dataRegisterClass },
  ] = useCreateClassRegistrationMutation();

  // Función que se ejecuta cuando se envían los datos
  const onCreateClassRegister = async (input: CreateClassSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createClassRegistration(input);
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
      loading: "Registrando clase...",
      success: "Clase registrada con éxito.",
      error: (error) => {
        return error.message;
      },
    });
  };

  useEffect(() => {
    if (isSuccessCreateClass && dataRegisterClass) {
      router.replace("/");
    }
  }, [dataRegisterClass, isSuccessCreateClass, router]);

  return {
    onCreateClassRegister,
  };
};

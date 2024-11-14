// hooks/use-client.ts
import {
  useGetClientsQuery,
  useUpdateClientMutation,
  useProfileQuery,
  useFindClientByEmailMutation,
} from "@/redux/services/clientApi";
import { CustomErrorData } from "@/types";
import { ClientDataUpdate } from "@/types/client";
import { toast } from "sonner";

// Hook personalizado para manejar operaciones con clientes
export const useClients = () => {
  const { data: profileData, isLoading: isLoadingProfile } = useProfileQuery();

  const clientId = profileData?.id;

  const {
    data: clientData,
    error,
    isLoading,
  } = useGetClientsQuery(clientId, {
    skip: !clientId,
  });

  const [
    findClient,
    {
      data: dataClientByEmail,
      isLoading: isLoadingClientByEmail,
      error: errorClientByEmail,
    },
  ] = useFindClientByEmailMutation();

  const [
    updateClient,
    { isSuccess: isSuccessUpdateClient, isLoading: isLoadingUpdateClient },
  ] = useUpdateClientMutation();

  const onUpdateClient = async (input: Partial<ClientDataUpdate>) => {
    if (!clientId) return; // No intentar actualizar si no hay un ID disponible

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClient({
            ...input,
            id: clientId,
            birthDate: input.birthDate ?? undefined,
          });
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
            const error = (result.error.data as CustomErrorData).message;
            reject(new Error(error));
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
      loading: "Actualizando...",
      success: "Cliente actualizado",
      error: (error) => {
        return error.message;
      },
    });
  };

  return {
    clientData,
    error,
    isLoading,
    findClient,
    onUpdateClient,
    isSuccessUpdateClient,
    isLoadingUpdateClient,
    isLoadingProfile,
    dataClientByEmail,
    isLoadingClientByEmail,
    errorClientByEmail,
  };
};

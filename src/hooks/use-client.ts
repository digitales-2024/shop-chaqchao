// hooks/use-client.ts
import {
  useGetClientsQuery,
  useUpdateClientMutation,
  useProfileQuery, // Asegúrate de importar el hook que obtenga el perfil del usuario
} from "@/redux/services/clientApi";
import { ClientDataUpdate } from "@/types/client";
import { toast } from "sonner";

// Hook personalizado para manejar operaciones con clientes
export const useClients = () => {
  // Obtener perfil del usuario logueado
  const { data: profileData, isLoading: isLoadingProfile } = useProfileQuery();

  // Asegúrate de que profileData contenga el ID del cliente
  const clientId = profileData?.id; // Ajusta según cómo se llame el campo

  // Obtener datos del cliente
  const {
    data: clientData,
    error,
    isLoading,
  } = useGetClientsQuery(clientId, {
    skip: !clientId, // Solo hacer la consulta si hay un ID
  });

  // Actualizar cliente
  const [
    updateClient,
    { isSuccess: isSuccessUpdateClient, isLoading: isLoadingUpdateClient },
  ] = useUpdateClientMutation();

  // Manejar la actualización de un cliente
  const onUpdateClient = async (input: Partial<ClientDataUpdate>) => {
    if (!clientId) return; // No intentar actualizar si no hay un ID disponible

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateClient({ ...input, id: clientId });
          if (result.error && "data" in result.error) {
            const error = (result.error.data as any).message;
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
    onUpdateClient,
    isSuccessUpdateClient,
    isLoadingUpdateClient,
    isLoadingProfile, // Para poder manejar el estado de carga del perfil
  };
};

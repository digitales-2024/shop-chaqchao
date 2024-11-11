import { useCreateClientMutation } from "@/redux/services/authApi";
import { CreateClientInputSchema } from "@/schemas/client/createClientsSchema";
import { CustomErrorData } from "@/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export const useRegister = () => {
  const router = useRouter();

  const e = useTranslations("errors");
  const t = useTranslations("register.messages");

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
            reject(new Error(e("network")));
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: t("loading"),
      success: t("success"),
      error: (error) => {
        return t(error.message) || error.message;
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

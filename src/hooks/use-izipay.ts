/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingCheck, ShoppingDelete } from "@/assets/icons";
import KRGlue from "@lyracom/embedded-form-glue";
import { useLocale, useTranslations } from "next-intl";
import { createElement, useState } from "react";
import { toast } from "sonner";

interface IzipayConfig {
  endpoint?: string;
  publicKey?: string;
  containerId: string;
  language?: string;
  theme?: "standard" | "night";
}

interface IzipayCallbacks {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
}

export const useIzipay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const locale = useLocale();
  const t = useTranslations("izipay");

  const defaultConfig: IzipayConfig = {
    endpoint:
      process.env.NEXT_PUBLIC_IZIPAY_PAYMENT_ENDPOINT ||
      "https://api.micuentaweb.pe",
    publicKey: process.env.NEXT_PUBLIC_IZIPAY_PAYMENT_PUBLIC_KEY || "",
    containerId: "izipay-form", // Valor por defecto
    language: locale,
    theme: "standard",
  };

  const initializeForm = async (
    token: string,
    config: Partial<IzipayConfig>,
    callbacks: IzipayCallbacks = {},
  ) => {
    const finalConfig = { ...defaultConfig, ...config };
    const { endpoint, publicKey, containerId, language } = finalConfig;

    if (!endpoint || !publicKey) {
      throw new Error(t("errors.missingConfig"));
    }

    if (!containerId) {
      throw new Error(t("errors.missingContainer"));
    }

    try {
      setIsLoading(true);
      setError(null);

      const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

      // Configuración del formulario
      await KR.setFormConfig({
        formToken: token,
        "kr-language": language,
        "kr-public-key": publicKey,
      });

      // Manejo de errores
      await KR.onError((error: any) => {
        const errorMessage = error.errorMessage || t("errors.generic");
        setError(new Error(errorMessage));
        toast.error(errorMessage, {
          icon: createElement(ShoppingDelete),
        });
        callbacks.onError?.(error);
      });

      // Manejo de cierre del popup
      await KR.onPopinClosed(() => {
        toast.error(t("errors.canceled"), {
          icon: createElement(ShoppingDelete),
        });
        callbacks.onCancel?.();
      });

      // Manejo de envío del formulario
      await KR.onSubmit(async (paymentData: any) => {
        try {
          callbacks.onSuccess?.(paymentData);
          toast.success(t("success"), {
            icon: createElement(ShoppingCheck),
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : t("errors.generic");
          callbacks.onError?.(error);
          toast.error(errorMessage, {
            icon: createElement(ShoppingDelete),
          });
        }
        return false;
      });

      // Renderización del formulario
      await KR.renderElements(`#${containerId}`);

      setIsLoading(false);
      return KR;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("errors.initialization");
      setError(new Error(errorMessage));
      toast.error(errorMessage, {
        icon: createElement(ShoppingDelete),
      });
      callbacks.onError?.(error);
      setIsLoading(false);
      throw error;
    }
  };

  return {
    initializeForm,
    isLoading,
    error,
  };
};

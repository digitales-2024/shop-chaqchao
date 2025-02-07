/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingDelete } from "@/assets/icons";
import { useIzipay } from "@/hooks/use-izipay";
import { usePayment } from "@/hooks/use-payment";
import { CreatePayment } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface IzipayFormProps {
  paymentData: CreatePayment;
  onSuccess?: (response: any) => void;
  onError?: () => void;
  onCancel?: () => void;
  containerId?: string;
}

export const IzipayForm = ({
  paymentData,
  onSuccess,
  onError,
  onCancel,
  containerId = "izipay-form-workshop",
}: IzipayFormProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const { initializeForm } = useIzipay();
  const { generatePaymentToken, handleValidatePayment } = usePayment();
  const [isLoadingGenerateToken, setIsLoadingGenerateToken] = useState(false);
  const t = useTranslations("izipay");
  const e = useTranslations("errors");

  const handlePaymentSubmit = async (paymentResponse: any) => {
    try {
      const validationResult = await handleValidatePayment(paymentResponse);
      if (validationResult.data?.isValid) {
        onSuccess?.(paymentResponse);
      } else {
        throw new Error("Payment validation failed");
      }
    } catch (error) {
      onError?.();
    }
  };

  const handleGenerateToken = async () => {
    try {
      setIsLoadingGenerateToken(true);
      const tokenResponse = await generatePaymentToken(paymentData);
      if (!tokenResponse) {
        throw new Error("Error");
      }

      await handleInitializePayment(tokenResponse.token ?? "");
    } catch (error) {
      toast(e("cart.title"), {
        description: e("network"),
        icon: <ShoppingDelete />,
        className: "text-rose-500",
      });
      onError?.();
    } finally {
      setIsLoadingGenerateToken(false);
    }
  };

  const handleInitializePayment = async (paymentToken: string) => {
    try {
      await initializeForm(
        paymentToken,
        { containerId },
        {
          onSuccess: handlePaymentSubmit,
          onError,
          onCancel: () => {
            setShowPayment(false);
            onCancel?.();
          },
        },
      );
      setShowPayment(true);
    } catch (error) {
      setShowPayment(false);
      onError?.();
    }
  };

  return (
    <div className="space-y-4">
      {!showPayment ? (
        <Button
          onClick={handleGenerateToken}
          disabled={isLoadingGenerateToken}
          className="w-full"
        >
          {isLoadingGenerateToken ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              {t("loading")}
            </>
          ) : (
            t("pay")
          )}
        </Button>
      ) : (
        <div id={containerId} className="mt-4">
          {/* El formulario de IziPay se renderizará aquí */}
        </div>
      )}
    </div>
  );
};

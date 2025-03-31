import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
interface ButtonCheckoutProps {
  isLoading: boolean;
  validate: () => void;
}

export const ButtonCheckout = ({
  validate,
  isLoading,
}: ButtonCheckoutProps) => {
  const t = useTranslations("checkout.checkout");

  return (
    <Button
      variant="default"
      className={cn(
        "h-16 rounded-none px-8 text-xl font-bold text-white [&_svg]:size-6 [&_svg]:shrink-0",
      )}
      onClick={validate}
      disabled={isLoading}
    >
      {isLoading && <RefreshCcw className="animate-spin" />}
      {t("button")}
    </Button>
  );
};

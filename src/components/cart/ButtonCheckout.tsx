import { ShoppingCheck } from "@/assets/icons";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../ui/button";

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
      className={cn("font-bold", buttonVariants({}))}
      onClick={validate}
      disabled={isLoading}
    >
      {isLoading ? <RefreshCcw className="animate-spin" /> : <ShoppingCheck />}
      {t("button")}
    </Button>
  );
};

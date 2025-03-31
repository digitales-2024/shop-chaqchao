import { Izipay } from "@/assets/icons";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";

interface ButtonPaymentProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const ButtonPayment: React.FC<ButtonPaymentProps> = ({
  onClick,
  isLoading,
}) => {
  return (
    <Button
      id="btnPayNow"
      onClick={onClick}
      disabled={isLoading}
      className="relative w-full overflow-hidden bg-izipay px-10 py-10 text-2xl font-bold hover:bg-izipay-foreground disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="absolute -left-2 -top-2 rounded-md bg-white p-4 [clip-path:_polygon(0_0,_100%_0,_90%_70%,_0%_100%)]">
        <Izipay
          style={{
            width: "3rem",
            height: "auto",
          }}
        />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Procesando...</span>
        </div>
      ) : (
        "Realizar el pago"
      )}
    </Button>
  );
};

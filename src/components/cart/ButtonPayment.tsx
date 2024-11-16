import { Izipay } from "@/assets/icons";

import { Button } from "../ui/button";

interface ButtonPaymentProps {
  onClick: () => void;
}

export const ButtonPayment: React.FC<ButtonPaymentProps> = ({ onClick }) => {
  return (
    <Button
      id="btnPayNow"
      onClick={onClick}
      className="relative w-full overflow-hidden bg-izipay px-10 py-10 text-2xl font-bold hover:bg-izipay-foreground"
    >
      <div className="absolute -left-2 -top-2 rounded-md bg-white p-4 [clip-path:_polygon(0_0,_100%_0,_90%_70%,_0%_100%)]">
        <Izipay
          style={{
            width: "3rem",
            height: "auto",
          }}
        />
      </div>
      Realizar el pago
    </Button>
  );
};

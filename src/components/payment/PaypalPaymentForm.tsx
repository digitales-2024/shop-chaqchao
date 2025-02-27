import { Button } from "../ui/button";

interface PaypalPaymentFormProps {
  isLoading?: boolean;
  onSubmit: () => void;
}

export function PaypalPaymentForm({
  isLoading,
  onSubmit,
}: PaypalPaymentFormProps) {
  return (
    <Button
      onClick={onSubmit}
      className="w-full rounded-full text-lg font-bold"
      disabled={isLoading}
    >
      {isLoading ? "Registrando..." : "Confirmar"}
    </Button>
  );
}

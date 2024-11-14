import { CheckoutSteps } from "./CheckoutSteps";
import { DetailCheckout } from "./DetailCheckout";

export const Checkout = () => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <CheckoutSteps />
      <DetailCheckout />
    </div>
  );
};

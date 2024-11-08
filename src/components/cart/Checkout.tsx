import { CheckoutSteps } from "./CheckoutSteps";
import { DetailCheckout } from "./DetailCheckout";

export const Checkout = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <CheckoutSteps />
      <DetailCheckout />
    </div>
  );
};

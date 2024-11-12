import { CartTitle } from "@/components/cart/CartTitle";
import { Checkout } from "@/components/cart/Checkout";

export default function PageCart() {
  return (
    <section className="container mx-auto flex flex-col gap-10 py-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <CartTitle />
      </div>
      <Checkout />
    </section>
  );
}

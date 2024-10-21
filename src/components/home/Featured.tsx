import { CartSkeleton } from "../cart/CartSkeleton";

interface FeaturedHeaderProps {
  children: React.ReactNode;
}

const FeaturedHeader: React.FC<FeaturedHeaderProps> = ({ children }) => {
  return (
    <section className="flex flex-col gap-20">
      <h2 className="text-center text-3xl font-semibold">
        Productos destacados
      </h2>
      <div className="flex gap-6">{children}</div>
    </section>
  );
};

export const Featured = () => {
  return (
    <FeaturedHeader>
      {[...Array(4)].map((_, index) => (
        <CartSkeleton key={index} />
      ))}
    </FeaturedHeader>
  );
};

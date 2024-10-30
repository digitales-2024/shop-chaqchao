// /components/Sidebar.tsx
import Link from "next/link";
import { useProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { UserRound } from "lucide-react";
import { OrderUpdateContext } from "@/contexts/OrderUpdateContext";
import { useContext } from "react";

const Sidebar = () => {
  const { clienteData, isLoading } = useProfile();
  const { hasOrderUpdates } = useContext(OrderUpdateContext);
  if (isLoading || !clienteData) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-background"
      >
        <span className="sr-only">Iniciar sesión</span>
        <UserRound className="shrink-0" />
      </Link>
    );
  }
  return (
    <div className="flex flex-col bg-gray-200 p-4">
      <div className="my-8 flex grid-cols-2">
        <Button
          variant="ghost"
          className="relative size-10 rounded-full bg-background text-lg capitalize ring-0 ring-offset-0 transition-all duration-300 hover:scale-105 focus:ring-0 focus:ring-offset-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {hasOrderUpdates && (
            <span className="absolute right-0 top-0 size-2 rounded-full bg-emerald-500" />
          )}
          {getFirstLetter(clienteData.name)}
        </Button>
        <div className="pl-4">
          <h1 className="text-xl text-secondary">
            {" "}
            {clienteData.name.split(" ")[0]}
          </h1>
          <h1 className="text-sm font-extralight">{clienteData.email}</h1>
        </div>
      </div>
      <Link href="/profile" className="mb-2 hover:font-bold hover:underline">
        Detalles de la cuenta
      </Link>
      <Link href="/orders" className="mb-2 hover:font-bold hover:underline">
        Pedidos
      </Link>
      <Link
        href="/account/reservations"
        className="mb-2 hover:font-bold hover:underline"
      >
        Reservas
      </Link>
    </div>
  );
};

export { Sidebar };

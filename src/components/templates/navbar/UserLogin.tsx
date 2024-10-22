import { useAuth } from "@/hooks/use-auth";
import { useLogout } from "@/hooks/use-logout";
import { CreditCard, LogOut, NotebookPen, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserLogin = () => {
  const { client } = useAuth();
  const { signOut } = useLogout();
  if (!client) {
    return (
      <Link
        href="/login"
        className="inline-flex h-16 items-center justify-center whitespace-nowrap rounded-full bg-secondary px-10 text-xl text-white transition-colors duration-300 hover:bg-secondary/90"
      >
        Iniciar sesión
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-16 rounded-full border-2 border-secondary/20 pl-2 pr-4 capitalize focus-visible:ring-transparent"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {client.name.split(" ")[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Pedidos</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NotebookPen className="mr-2 h-4 w-4" />
            <span>Reservas</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

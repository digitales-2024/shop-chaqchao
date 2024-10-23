"use client";
import { useLogout } from "@/hooks/use-logout";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { CreditCard, LogOut, NotebookPen, User, UserRound } from "lucide-react";
import Link from "next/link";

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
  const { signOut } = useLogout();
  const { clienteData, isLoading } = useProfile();
  if (isLoading || !clienteData) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 hover:bg-background"
      >
        <UserRound className="shrink-0" />
      </Link>
    );
  }

  return (
    <div className="inline-flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-10 rounded-full bg-background text-lg capitalize ring-0 ring-offset-0 transition-all duration-300 hover:scale-105 focus:ring-0 focus:ring-offset-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span className="absolute right-0 top-0 size-2 rounded-full bg-emerald-500" />
            {getFirstLetter(clienteData.name)}
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
            <DropdownMenuItem className="relative">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Pedidos</span>
              <span className="absolute right-0 size-2 rounded-full bg-emerald-500" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <NotebookPen className="mr-2 h-4 w-4" />
              <span>Reservas</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

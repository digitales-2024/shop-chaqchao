"use client";
import { OrderUpdateContext } from "@/contexts/OrderUpdateContext";
import { useLogout } from "@/hooks/use-logout";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { CreditCard, LogOut, NotebookPen, User, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useContext } from "react";

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
  const t = useTranslations("profile");
  const { signOut } = useLogout();
  const hasOrderUpdates = useContext(OrderUpdateContext);
  const { clienteData, isLoading } = useProfile();
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
    <div className="inline-flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-10 rounded-full border-primary bg-background font-nunito text-lg font-black capitalize outline outline-primary ring-0 ring-offset-0 transition-all duration-300 hover:scale-105 focus:ring-0 focus:ring-offset-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {hasOrderUpdates && (
              <span className="absolute right-0 top-0 size-2 rounded-full bg-emerald-500" />
            )}
            {getFirstLetter(clienteData.name)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="flex flex-col gap-1">
            <span className="truncate font-nunito text-lg font-bold capitalize">
              {clienteData.name}
            </span>
            <span className="font-nunito text-xs text-slate-500">
              {clienteData.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {t("profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders" className="relative cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                {t("orders")}
                {hasOrderUpdates && (
                  <span className="absolute right-3 top-3 size-2 items-center rounded-full bg-emerald-500" />
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/classes" className="cursor-pointer">
                <NotebookPen className="mr-2 h-4 w-4" />
                <span>{t("class")}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("signout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

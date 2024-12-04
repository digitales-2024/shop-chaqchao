"use client";

import { OrderUpdateContext } from "@/contexts/OrderUpdateContext";
import { useLogout } from "@/hooks/use-logout";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/utils/getFirstLetter";
import {
  LogOut,
  NotebookPen,
  ShoppingBag,
  User,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useContext } from "react";

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
  const t = useTranslations("account");
  const { signOut } = useLogout();
  const hasOrderUpdates = useContext(OrderUpdateContext);
  const { clientData, isLoading } = useProfile();
  if (isLoading || !clientData) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
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
            className="relative size-9 rounded-full bg-white text-lg font-semibold capitalize outline-none ring-0"
          >
            {hasOrderUpdates && (
              <div className="absolute -right-1 -top-0">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
              </div>
            )}

            <Avatar>
              <AvatarImage src={clientData.image} />
              <AvatarFallback>{getFirstLetter(clientData.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel className="flex flex-col gap-1">
            <span className="truncate font-nunito text-lg font-bold capitalize">
              {clientData.name}
            </span>
            <span className="font-nunito text-xs text-slate-500">
              {clientData.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/account" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {t("profile.profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/orders" className="relative cursor-pointer">
                <ShoppingBag className="mr-2 h-4 w-4" />
                {t("orders.title")}
                {hasOrderUpdates && (
                  <div className="absolute right-3 top-3 size-2 items-center">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                    </span>
                  </div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/classes" className="cursor-pointer">
                <NotebookPen className="mr-2 h-4 w-4" />
                <span>{t("classes.title")}</span>
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

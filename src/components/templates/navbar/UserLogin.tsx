"use client";

import { OrderUpdateContext } from "@/contexts/OrderUpdateContext";
import { useLogout } from "@/hooks/use-logout";
import { useOpenMenu } from "@/hooks/use-open-menu";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { LogOut, ShoppingBag, User, UserRound } from "lucide-react";
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

  const { open } = useOpenMenu();

  if (isLoading || !clientData) {
    return (
      <Link
        href="/sign-in"
        className="inline-flex h-full w-full shrink-0 items-center justify-center rounded-full"
      >
        <span className="sr-only">Iniciar sesión</span>
        {open ? (
          <span className="p-4 uppercase">Login</span>
        ) : (
          <UserRound className="size-7" strokeWidth={1} />
        )}
      </Link>
    );
  }

  return (
    <div className="inline-flex gap-2">
      {open ? (
        <Link href="/account" className="p-4 uppercase">
          {clientData.name}
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-full w-full shrink-0 rounded-full p-0 outline-none ring-0 hover:bg-transparent"
            >
              <span className="sr-only">Open user menu</span>
              {hasOrderUpdates && (
                <div className="absolute -right-1 -top-0">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
              )}
              <Avatar>
                <AvatarImage src={clientData.image} alt={clientData.name} />
                <AvatarFallback>
                  {getFirstLetter(clientData.name)}
                </AvatarFallback>
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
                <Link
                  href="/account/orders"
                  className="relative cursor-pointer"
                >
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t("signout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

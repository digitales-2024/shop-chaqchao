"use client";
import { useLogout } from "@/hooks/use-logout";
import { useOpenMenu } from "@/hooks/use-open-menu";
import { useProfile } from "@/hooks/use-profile";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

export const Logout = () => {
  const a = useTranslations("account");
  const { signOut } = useLogout();
  const { clientData } = useProfile();
  const { open } = useOpenMenu();
  return (
    <>
      {open && clientData && (
        <button
          onClick={signOut}
          className="relative inline-flex w-fit items-center justify-center gap-4 whitespace-nowrap rounded-full p-4 text-2xl uppercase transition-all duration-300 hover:font-bold"
        >
          <span>{a("signout")}</span>
          <LogOut className="mr-2 h-4 w-4" />
        </button>
      )}
    </>
  );
};

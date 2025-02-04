"use client";

import { LucideIcon, ShoppingBag, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface Items {
  href: string;
  title: string;
  icon: LucideIcon;
}
type SidebarNavProps = React.HTMLAttributes<HTMLElement>;

export function Sidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const t = useTranslations("account");
  const sidebarNavItems: Items[] = [
    {
      title: t("profile.title"),
      href: "/account",
      icon: User,
    },
    {
      title: t("orders.title"),
      href: "/account/orders",
      icon: ShoppingBag,
    },
  ];

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {sidebarNavItems.map(({ href, title, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          <Icon />
          {title}
        </Link>
      ))}
    </nav>
  );
}

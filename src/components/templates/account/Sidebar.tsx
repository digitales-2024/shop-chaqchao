"use client";

import { BookOpen, LucideIcon, ShoppingBag, User } from "lucide-react";
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
const sidebarNavItems: Items[] = [
  {
    title: "Profile",
    href: "/account",
    icon: User,
  },
  {
    title: "Pedidos",
    href: "/account/orders",
    icon: ShoppingBag,
  },
  {
    title: "Clases",
    href: "/account/classes",
    icon: BookOpen,
  },
];

export function Sidebar({ className, ...props }: SidebarNavProps) {
  const pathname = usePathname();

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

"use client";

import { useCategory } from "@/hooks/use-category";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

export function MenuList() {
  const { dataCategories, isLoadingCategories } = useCategory();

  const t = useTranslations("navbar");

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            disabled={isLoadingCategories}
            className="bg-transparent transition-all duration-300 hover:scale-105 hover:bg-transparent focus:bg-transparent"
          >
            {t("products")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {dataCategories?.map((component) => (
                <ListItem
                  key={component.id}
                  title={component.name}
                  href={component.name}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/class"
            legacyBehavior
            passHref
            className="bg-transparent"
          >
            <NavigationMenuLink
              className={`${navigationMenuTriggerStyle()} bg-transparent transition-all duration-300 hover:scale-105 hover:bg-transparent focus:bg-transparent`}
            >
              {t("classes")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="bg-transparent">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium capitalize leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

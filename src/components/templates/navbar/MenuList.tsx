"use client";

import { useCategory } from "@/hooks/use-category";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

export function MenuList() {
  const { dataCategories, isLoadingCategories } = useCategory();

  return (
    <NavigationMenu>
      <NavigationMenuList className="inline-flex gap-4 hover:bg-transparent">
        <NavigationMenuItem className="hover:bg-transparent">
          <NavigationMenuTrigger
            className="bg-transparent text-xl font-semibold text-secondary transition-all duration-300 open:bg-transparent hover:scale-105 hover:bg-transparent hover:text-secondary"
            disabled={isLoadingCategories || !dataCategories}
          >
            Productos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {dataCategories &&
                dataCategories.map((category) => (
                  <ListItem
                    key={category.id}
                    title={category.name}
                    href={category.name}
                  >
                    {category.description}
                  </ListItem>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="transition-all duration-300 hover:scale-105">
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="bg-transparent text-xl font-semibold text-secondary">
              Clases
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

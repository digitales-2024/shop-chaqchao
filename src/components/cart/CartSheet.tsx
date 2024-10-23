"use client";
import { ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "../ui/badge";

export function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="group/cart relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full hover:bg-background">
          <span className="sr-only">Abrir carrito de pedidos</span>
          <ShoppingBag className="flex-shrink-0 transition-transform duration-300 group-hover/cart:animate-tada" />
          <Badge
            variant="default"
            className="absolute -bottom-0 -right-1 flex size-4 items-center justify-center p-2 text-[10px]"
          >
            20
          </Badge>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

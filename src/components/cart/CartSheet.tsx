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
        <div className="group/cart relative flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-secondary/20 bg-transparent text-secondary">
          <span className="sr-only">Abrir carrito de pedidos</span>
          <ShoppingBag className="h-28 flex-shrink-0 transition-transform duration-300 group-hover/cart:animate-tada" />
          <Badge
            variant="default"
            className="absolute -right-2 top-0 flex size-6 items-center justify-center p-2"
          >
            1
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

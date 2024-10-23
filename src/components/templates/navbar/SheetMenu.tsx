import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import { Locale } from "@/i18n/config";
import { AlignRight } from "lucide-react";
import { useLocale } from "next-intl";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LanguageSelector } from "./LanguageSelector";
import { MenuList } from "./MenuList";

export const SheetMenu = () => {
  const locale = useLocale();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-full p-2 hover:bg-background">
          <AlignRight className="" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <ChaqchaoName className="mx-auto h-16" />
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <MenuList />
        </div>
        <SheetFooter className="w-full">
          <SheetClose asChild>
            <LanguageSelector
              defaultValue={locale as Locale}
              className="w-full"
            />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

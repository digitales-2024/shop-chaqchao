import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import { useCategory } from "@/hooks/use-category";
import { Locale } from "@/i18n/config";
import { AnimatePresence, motion } from "framer-motion";
import { AlignRight, ChevronDown, ChevronUp } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
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

type SheetMenuMobilProps = React.ComponentPropsWithRef<typeof Sheet>;

export const SheetMenuMobil = (props: SheetMenuMobilProps) => {
  const locale = useLocale();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const { dataCategories, isLoadingCategories } = useCategory();

  const t = useTranslations("navbar");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-full p-2 hover:bg-background">
          <AlignRight className="" />
        </button>
      </SheetTrigger>
      <SheetContent className="m-1 flex h-full max-h-svh flex-col rounded-lg">
        <SheetHeader>
          <SheetTitle>
            <ChaqchaoName className="mx-auto h-16" />
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="grid flex-1 gap-4 py-4">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="flex h-full flex-col bg-background"
            >
              <nav className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  <ul className="space-y-2 p-4">
                    <motion.li
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link
                        href="/"
                        className="w-full justify-start p-4 text-lg font-medium"
                        onClick={() => props.onOpenChange?.(false)}
                      >
                        {t("classes")}
                      </Link>
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <Collapsible
                        open={isCategoryOpen}
                        onOpenChange={setIsCategoryOpen}
                        className="w-full"
                        disabled={isLoadingCategories}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-lg font-medium"
                          >
                            <div className="flex items-center">
                              {t("products")}
                            </div>
                            {isCategoryOpen ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-6">
                          <AnimatePresence>
                            {isCategoryOpen &&
                              dataCategories?.map((category, index) => (
                                <motion.div
                                  key={category.id}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <Link
                                    href={`/productos/${category.name}`}
                                    className="w-full justify-start pl-9 text-base"
                                    onClick={() => props.onOpenChange?.(false)}
                                  >
                                    {category.name}
                                  </Link>
                                </motion.div>
                              ))}
                          </AnimatePresence>
                        </CollapsibleContent>
                      </Collapsible>
                    </motion.li>
                  </ul>
                </AnimatePresence>
              </nav>
            </motion.div>
          </div>
        </ScrollArea>
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

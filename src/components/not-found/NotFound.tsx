"use client";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { TextScramble } from "@/components/core/TextScramble";
import { Button } from "@/components/ui/button";
export const NotFoundC = () => {
  const t = useTranslations("notfound");
  const [isTrigger, setIsTrigger] = useState(false);
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background text-foreground">
      <div className="space-y-4 text-center">
        <TextScramble
          characterSet="0123456789"
          className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
          as="span"
          speed={0.01}
          trigger={isTrigger}
          onHoverStart={() => setIsTrigger(true)}
          onScrambleComplete={() => setIsTrigger(false)}
        >
          404
        </TextScramble>
        <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
          {t("title")}
        </h2>
        <p className="max-w-[42rem] text-xs leading-normal text-muted-foreground sm:text-sm sm:leading-8">
          {t("description")}
        </p>
        <div className="flex flex-col justify-center gap-2 pt-4 min-[400px]:flex-row">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>{t("button")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

"use client";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import LayoutShop from "./(shop)/layout";

export default function NotFound() {
  const t = useTranslations("notfound");
  return (
    <LayoutShop>
      <div className="flex h-full flex-col items-center justify-center bg-background text-foreground">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            404
          </h1>
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
    </LayoutShop>
  );
}

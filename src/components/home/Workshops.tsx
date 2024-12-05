"use client";
import { ChevronRight, Notebook } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { AnimatedGradientText } from "../common/AnimatedGradientText";
import { ClassWorkshop } from "./ClassWorkshop";

export const Workshops = () => {
  const t = useTranslations("workshops");

  return (
    <section className="container mx-auto flex flex-col gap-16 py-20">
      <header className="flex flex-col items-start justify-center gap-6">
        <h2 className="truncate text-balance text-start text-[5rem] font-black uppercase">
          del
          <span>cafe</span>
          al
          <span>chocolate</span>
        </h2>
        <p className="text-2xl text-gray-500">{t("subtitle")}</p>
        <Link href="/workshops">
          <AnimatedGradientText>
            <Notebook className="text-secondary" />{" "}
            <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-secondary to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-xl text-transparent`,
              )}
            >
              {t("button")}
            </span>
            <ChevronRight className="ml-1 size-5 text-secondary transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
      </header>
      <div className="pointer-events-none -translate-y-1/3">
        <ClassWorkshop />
      </div>
    </section>
  );
};

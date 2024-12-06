"use client";
import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import { ChevronRight, Notebook } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { AnimatedGradientText } from "../common/AnimatedGradientText";
import BlobCursor from "../core/BlobCursor";
import { Cursor } from "../core/Cursor";
import { InView } from "../core/InView";
import { ClassWorkshop } from "./ClassWorkshop";

export const Workshops = () => {
  const t = useTranslations("workshops");

  const variants1 = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const variants2 = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <BlobCursor />
      <section className="container mx-auto flex flex-col gap-16 py-20">
        <div className="grid h-[620px] grid-cols-1 items-start justify-start gap-8 sm:grid-cols-2">
          <div className="flex w-full flex-col items-start justify-center gap-6 space-y-4">
            <h2 className="flex w-fit flex-col gap-2">
              <span className="relative inline-flex gap-2">
                <span className="absolute -top-2 text-5xl font-bold capitalize">
                  {t("title.start")}
                </span>
                <span className="relative font-pacifico text-[8rem] font-bold capitalize">
                  <Cursor
                    attachToParent
                    variants={{
                      initial: { height: 0, opacity: 0, scale: 0.3 },
                      animate: { height: "auto", opacity: 1, scale: 1 },
                      exit: { height: 0, opacity: 0, scale: 0.3 },
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.3,
                      bounce: 0.1,
                    }}
                    className="overflow-hidden"
                    springConfig={{
                      bounce: 0.01,
                    }}
                  >
                    <Image
                      src={ChaqchaoWorkshop01}
                      alt="Christian Church, Eastern Europe"
                      className="h-40 w-auto rounded-xl"
                    />
                  </Cursor>
                  <InView
                    variants={variants1}
                    viewOptions={{ margin: "0px 0px -200px 0px" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    {t("title.resalt")}
                  </InView>
                </span>
              </span>
              <span className="relative ml-20 inline-flex gap-2">
                <span className="absolute right-1/2 text-5xl font-bold">
                  {t("title.end")}
                </span>
                <Cursor
                  attachToParent
                  variants={{
                    initial: { height: 0, opacity: 0, scale: 0.3 },
                    animate: { height: "auto", opacity: 1, scale: 1 },
                    exit: { height: 0, opacity: 0, scale: 0.3 },
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.3,
                    bounce: 0.1,
                  }}
                  className="overflow-hidden"
                  springConfig={{
                    bounce: 0.01,
                  }}
                >
                  <Image
                    src={ChaqchaoWorkshop02}
                    alt="Christian Church, Eastern Europe"
                    className="h-40 w-auto rounded-xl"
                  />
                </Cursor>
                <InView
                  variants={variants2}
                  viewOptions={{ margin: "0px 0px -200px 0px" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <span className="font-pacifico text-[9rem] font-extrabold capitalize">
                    Chocolate
                  </span>
                </InView>
              </span>
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
          </div>
          <ClassWorkshop />
        </div>
      </section>
    </>
  );
};

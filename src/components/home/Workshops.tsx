"use client";
import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

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
    <section className="relative flex w-full flex-col items-center justify-center">
      <BlobCursor />
      <div className="container mx-auto flex flex-col gap-16 py-20">
        <div className="grid h-[620px] grid-cols-1 items-start justify-start gap-8 px-4 sm:grid-cols-2 sm:px-0">
          <div className="flex w-full flex-col items-start justify-center gap-6 space-y-4">
            <h2 className="flex w-fit flex-col gap-y-14">
              <span className="relative inline-flex h-auto w-fit">
                <span className="absolute -top-12 h-auto text-5xl font-bold capitalize">
                  {t("title.start")}
                </span>
                <span className="relative h-auto font-pacifico text-[6rem] font-bold capitalize sm:text-[8rem]">
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
              <span className="relative ml-0 inline-flex h-auto w-fit gap-2 whitespace-normal sm:ml-20">
                <span className="absolute right-1/2 top-0 text-5xl font-bold">
                  {t("title.end")}
                </span>
                <span className="font-pacifico text-[5rem] font-extrabold capitalize sm:text-[9rem]">
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
                    Chocolate
                  </InView>
                </span>
              </span>
            </h2>
            <p className="text-2xl text-gray-500">{t("subtitle")}</p>
            <Link href="/workshops">
              <motion.span
                className="inline-flex overflow-hidden rounded-full bg-[linear-gradient(120deg,#FFf_calc(var(--shimmer-button-x)-25%),#ffb31c_var(--shimmer-button-x),#f38e1b_calc(var(--shimmer-button-x)+25%))] [--shimmer-button-x:0%]"
                initial={
                  {
                    scale: 1,
                    "--shimmer-button-x": "-100%",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any
                }
                animate={
                  {
                    "--shimmer-button-x": "200%",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any
                }
                transition={{
                  stiffness: 500,
                  damping: 20,
                  type: "spring",
                  "--shimmer-button-x": {
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.445, 0.05, 0.55, 0.95],
                  },
                }}
                whileTap={{
                  scale: 0.95,
                }}
                whileHover={{
                  scale: 1.05,
                }}
              >
                <span className="m-[0.125rem] rounded-full bg-secondary px-8 py-4 text-2xl font-semibold backdrop-blur-sm">
                  {t("button")}
                </span>
              </motion.span>
            </Link>
          </div>
          <ClassWorkshop />
        </div>
      </div>
    </section>
  );
};

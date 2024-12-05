"use client";
import BgHero from "@/assets/images/bg_hero.webp";
import Product01 from "@/assets/images/product_01.webp";
import Product02 from "@/assets/images/product_02.webp";
import Product03 from "@/assets/images/product_03.webp";
import Product04 from "@/assets/images/product_04.webp";
import Product05 from "@/assets/images/product_05.webp";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ButtonProducts from "./ButtonProducts";

interface CarouselItem {
  image: StaticImageData;
}

const carouselItems: CarouselItem[] = [
  { image: Product01 },
  { image: Product02 },
  { image: Product03 },
  { image: Product04 },
  { image: Product05 },
];

export const Hero = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const t = useTranslations("hero");

  return (
    <section className="relative flex w-full flex-col items-start justify-center">
      <div className="absolute bottom-0 right-0 top-0 h-full w-full bg-gradient-to-br" />
      <div className="container z-10 mx-auto grid h-full w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex h-full flex-col items-center justify-center space-y-20"
        >
          <motion.h1
            className="font-display text-4xl font-black uppercase tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Hola mundo
          </motion.h1>
          <motion.p
            className="mt-6 flex flex-col text-balance text-start text-gray-600 md:text-2xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <span className="inline-flex gap-2 truncate">
              {t("textfirst")}{" "}
              <span className="relative inline-flex text-primary">
                {t("textresalt")}
                <motion.svg
                  fill="none"
                  viewBox="0 0 645 25"
                  className="absolute -bottom-[6px] left-0 w-full stroke-2"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    strokeDasharray="0 1"
                    stroke="currentColor"
                    d="M.5 16C127.5-1 239.4-.67 358 3c108.5 3.36 191.5 9.5 286.5 21.5"
                  />
                </motion.svg>
              </span>
            </span>
            {t("textsecond")}
          </motion.p>
          <motion.div
            className="mx-auto mt-6 flex items-center justify-center space-x-5"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <ButtonProducts href="/categories">{t("button")}</ButtonProducts>
          </motion.div>
        </motion.div>
        <div className="relative hidden aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 sm:flex">
          <Image
            src={BgHero}
            alt="chaqchao"
            fill
            className="object-cover opacity-10"
            priority
          />
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            className="relative z-10 flex flex-col items-center justify-center"
            autoplay={{ delay: 5000 }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation, Autoplay]}
            speed={1000}
          >
            {carouselItems.map((item, index) => (
              <SwiperSlide key={index} zoom={true} className="bg-transparent">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={item.image.src}
                    alt="chaqchao"
                    width={500}
                    height={500}
                    className="relative z-10 mx-auto size-[calc(100%_-_10rem)] bg-transparent object-cover object-center [filter:_drop-shadow(2px_10px_10px_#818182);]"
                    priority={index === 0}
                    quality={100}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
            <div className="inline-flex w-full select-none justify-center gap-4 p-2">
              <div className="swiper-button-prev flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-secondary text-secondary hover:scale-105">
                <ChevronLeft size={24} />
              </div>
              <div className="swiper-button-next flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-secondary text-secondary hover:scale-105">
                <ChevronRight size={24} />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

"use client";
import ChaqchaoLogoName from "@/assets/images/ChaqchaoLogoName";
import Product01 from "@/assets/images/product_01.webp";
import Product02 from "@/assets/images/product_02.webp";
import Product03 from "@/assets/images/product_03.webp";
import Product04 from "@/assets/images/product_04.webp";
import Product05 from "@/assets/images/product_05.webp";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";

import "swiper/css";

import { SpinningText } from "../common/SpinningText";
import ButtonProducts from "./ButtonProducts";

interface CarouselItem {
  image: StaticImageData;
  alt: string;
}

const carouselItems: CarouselItem[] = [
  {
    image: Product01,
    alt: "Organic Cacao Nibs from Chaqchao Chocolates. Selected cacao from the Andean valleys of Peru.",
  },
  {
    image: Product02,
    alt: "Organic Cacao Tea from Chaqchao Chocolates. A delicate and flavorful tea from the Andes of Peru.",
  },
  {
    image: Product03,
    alt: "Organic Cacao Powder from Chaqchao Chocolates. Premium quality cacao powder sourced from the Andean regions of Peru.",
  },
  {
    image: Product04,
    alt: "Organic Cacao Butter from Chaqchao Chocolates. High-quality cacao butter for culinary and cosmetic uses, sourced from the Andean regions of Peru.",
  },
  {
    image: Product05,
    alt: "Organic Panela from Chaqchao Chocolates. The real raw sugar, minimally processed and full of natural flavor.",
  },
];

export const Hero = () => {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const t = useTranslations("hero");

  return (
    <section className="relative flex w-full flex-col items-start justify-center">
      <div className="hero absolute bottom-0 right-0 top-0 z-[1] h-full w-full opacity-10" />
      <div className="absolute bottom-0 right-0 top-0 z-[2] h-full w-full bg-gradient-to-t from-white via-transparent to-white" />
      <div className="container relative z-[3] mx-auto flex h-full w-full grid-cols-1 flex-col-reverse justify-center gap-10 px-6 sm:grid sm:grid-cols-2 md:px-0">
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
          className="flex h-full flex-col items-start justify-center gap-10"
        >
          <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS}>
            <span className="sr-only">Chaqchao</span>
            <ChaqchaoLogoName className="h-auto w-[20rem] lg:w-[30rem] xl:w-[40rem] 2xl:w-[50rem]" />
          </motion.h1>
          <motion.p
            className="mt-6 flex flex-col text-balance text-start text-3xl font-normal"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <span className="flex flex-wrap gap-2">
              <span className="truncate">{t("textfirst")} </span>
              <span className="relative inline-flex truncate font-bold text-primary">
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
            className="mt-6 flex items-center justify-start space-x-5"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <ButtonProducts href="/categories">{t("button")}</ButtonProducts>
          </motion.div>
        </motion.div>
        <div className="relative">
          <div className="relative flex w-full items-center justify-center">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              className="relative z-10 flex flex-col items-center justify-center"
              autoplay={{ delay: 5000 }}
              effect={"fade"}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ clickable: true }}
              modules={[Navigation, Autoplay, EffectFade]}
              speed={1000}
            >
              {carouselItems.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="h-auto flex-col items-end justify-end"
                >
                  <Image
                    src={item.image.src}
                    alt={item.alt}
                    width={400}
                    height={600}
                    className="relative z-10 mx-auto h-[20rem] w-auto bg-transparent object-contain object-center [filter:_drop-shadow(2px_10px_10px_#adadad);] md:h-[40rem]"
                    priority={index === 0}
                    quality={100}
                  />
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
          <SpinningText
            radius={6}
            fontSize={1.2}
            duration={15}
            className="absolute bottom-32 left-24 z-50 font-bold leading-none text-primary"
          >
            {`CHAQCHAO • CHOCOLATE • QUALITY • `}
          </SpinningText>
        </div>
      </div>
    </section>
  );
};

"use client";
import BgHero from "@/assets/images/bg_hero.webp";
import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import Product01 from "@/assets/images/product_01.webp";
import Product02 from "@/assets/images/product_02.webp";
import Product03 from "@/assets/images/product_03.webp";
import Product04 from "@/assets/images/product_04.webp";
import Product05 from "@/assets/images/product_05.webp";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CircleArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface CarouselItem {
  image: StaticImageData;
}

// Import images de manera dinámica para que sean cargadas por el servidor en producción y no en el cliente (SSR)
const carouselItems: CarouselItem[] = [
  { image: Product01 },
  { image: Product02 },
  { image: Product03 },
  { image: Product04 },
  { image: Product05 },
];

function useIntersectionObserver(
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = {},
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

export const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const isTextVisible = useIntersectionObserver(textRef, { threshold: 0.5 });
  const isButtonVisible = useIntersectionObserver(buttonRef, {
    threshold: 0.5,
  });

  return (
    <section className="relative mx-auto flex w-full items-start justify-center">
      <div className="container grid h-full w-full grid-cols-2">
        <div className="mx-auto h-full">
          <motion.div
            ref={textRef}
            className="flex h-full w-full flex-col items-center justify-center gap-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isTextVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isTextVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ChaqchaoName className="h-56" />
            </motion.h1>
            <motion.p
              className="w-full text-balance text-center text-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={isTextVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Descubre nuestros chocolates artesanales, hecho con amor y los
              mejores ingredientes.
            </motion.p>
            <motion.div
              ref={buttonRef}
              initial={{ opacity: 0, y: 20 }}
              animate={isButtonVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/"
                className="group/see inline-flex items-center justify-center gap-2 rounded-full bg-primary/90 py-2 pl-8 pr-3 text-xl text-white transition-all duration-300 hover:scale-105 hover:bg-primary"
              >
                <span className="truncate">Explora nuestros productos</span>
                <CircleArrowRight
                  className="size-16 -rotate-45 transition-all duration-300 group-hover/see:rotate-0"
                  strokeWidth={0.5}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
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
                >
                  <Image
                    src={item.image.src}
                    alt="chaqchao"
                    height={600}
                    width={600}
                    className="relative z-10 mx-auto bg-transparent object-cover object-center"
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

"use client";
import ChaqchaoHero01 from "@/assets/images/chaqchao-hero-01.webp";
import ChaqchaoHero02 from "@/assets/images/chaqchao-hero-02.webp";
import { ChaqchaoName } from "@/assets/images/ChaqchaoName";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface CarouselItem {
  title: string;
  image: StaticImageData;
}

const carouselItems: CarouselItem[] = [
  {
    title: "Workshop 1",
    image: ChaqchaoHero01,
  },
  {
    title: "Workshop 2",
    image: ChaqchaoHero02,
  },
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
      <Carousel
        className="relative w-full p-0"
        plugins={[
          Autoplay({
            delay: 10000,
          }),
          Fade(),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="h-[45rem] p-0">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="bg-white">
              <div className="relative h-full">
                <Image
                  src={item.image.src}
                  alt={item.title}
                  fill
                  className="h-full w-full object-cover"
                  priority={index === 0}
                  quality={100}
                />
                <div className="absolute h-full w-1/2 bg-gradient-to-l from-transparent to-white shadow-sm [clip-path:_polygon(0_0%,_100%_0%,_80%_100%,_0%_100%)]"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 size-12 border-secondary bg-transparent text-secondary transition-all duration-300 hover:scale-105 hover:bg-secondary/40 hover:text-white" />
        <CarouselNext className="absolute right-4 size-12 border-secondary bg-transparent text-secondary transition-all duration-300 hover:scale-105 hover:bg-secondary/40 hover:text-white" />
      </Carousel>
      <div className="pointer-events-none absolute h-full w-full">
        <div className="container pointer-events-none mx-auto grid h-full grid-cols-2">
          <motion.div
            ref={textRef}
            className="pointer-events-none mx-auto flex h-full flex-col justify-center gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isTextVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="mb-4 text-4xl font-bold text-secondary md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isTextVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ChaqchaoName className="h-40" />
            </motion.h1>
            <motion.p
              className="mb-6 text-balance text-xl"
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
                className="transform rounded-full bg-primary px-8 py-4 text-lg text-white transition-all duration-300 hover:scale-105 hover:bg-secondary"
              >
                Explora nuestros productos
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

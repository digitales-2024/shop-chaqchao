"use client";
import ChaqchaoHeroWebp2 from "@/assets/images/chaqchao-hero-2.webp";
import ChaqchaoHeroWebp from "@/assets/images/chaqchao-hero.webp";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const chocolates = [
  {
    id: 1,
    image: ChaqchaoHeroWebp,
  },
  {
    id: 2,
    image: ChaqchaoHeroWebp2,
  },
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chocolates.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + chocolates.length) % chocolates.length,
    );
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    intervalId = setInterval(() => {
      nextSlide();
    }, 10000); // Cambiar la diapositiva cada 10 segundos

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [nextSlide]);

  return (
    <section className="relative mx-auto w-full overflow-hidden bg-secondary">
      <div className="relative h-[40rem]">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.img
            key={currentIndex}
            src={chocolates[currentIndex].image.src}
            alt="Chaqchao Chocolate Factory"
            className="absolute h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-6 pb-32"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto">
              <Link
                href="/"
                className="rounded-lg bg-primary px-10 py-2 text-3xl text-white hover:bg-primary/90"
              >
                <h2 className="inline-flex">Comprar ahora</h2>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="relative z-10 rounded-full border border-primary text-primary hover:bg-primary/60 hover:text-white"
            aria-label="Chocolate anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="absolute inset-0 -left-1 -top-1 z-0 size-10 rounded-full bg-primary/10 backdrop-blur-lg" />
        </div>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="relative z-10 rounded-full border border-primary text-primary hover:bg-primary/60 hover:text-white"
            aria-label="Siguiente chocolate"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute inset-0 -right-1 -top-1 z-0 size-10 rounded-full bg-primary/10 backdrop-blur-lg" />
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {chocolates.map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex size-fit items-center justify-center rounded-full p-[2px]",
              {
                "border border-primary/20": index === currentIndex,
              },
            )}
          >
            <Button
              onClick={() => setCurrentIndex(index)}
              className={`m-0 size-2 rounded-full p-0 ${
                index === currentIndex ? "bg-primary" : "bg-primary/20"
              }`}
              aria-label={`Ir a la portada ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

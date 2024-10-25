"use client";
import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import ChaqchaoWorkshop03 from "@/assets/images/workshop_03.webp";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

export const Workshops = () => {
  return (
    <section className="container mx-auto flex flex-col gap-16 py-20">
      <header className="flex flex-row items-center justify-center">
        <h2 className="text-center text-3xl font-semibold">
          ¿Qué estás buscando hoy?
        </h2>
      </header>
      <WorkshopCarousel />
    </section>
  );
};

interface WorkshopItem {
  title: string;
  image: StaticImageData;
  href: string;
}

const workshopItems: WorkshopItem[] = [
  {
    title: "Chocolates",
    image: ChaqchaoWorkshop03,
    href: "/",
  },
  {
    title: "Workshops",
    image: ChaqchaoWorkshop01,
    href: "/",
  },
  {
    title: "Cuidado Personal",
    image: ChaqchaoWorkshop02,
    href: "/",
  },
  {
    title: "Chocolates",
    image: ChaqchaoWorkshop03,
    href: "/",
  },
  {
    title: "Workshops",
    image: ChaqchaoWorkshop01,
    href: "/",
  },
  {
    title: "Cuidado Personal",
    image: ChaqchaoWorkshop02,
    href: "/",
  },
];

const WorkshopCarousel = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <Carousel
      className="relative grid h-fit grid-cols-[1fr_10rem]"
      opts={{
        loop: true,
      }}
      tw="md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)]"
    >
      <CarouselContent>
        {workshopItems.map((item, index) => (
          <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
            <Link
              href={item.href}
              className="group/work z-0 flex size-fit flex-col items-center justify-center gap-4 overflow-hidden"
              onMouseEnter={() => {
                setIsFocused(true);
                setFocusedIndex(index);
              }}
              onMouseLeave={() => {
                setIsFocused(false);
                setFocusedIndex(0);
              }}
            >
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={item.image.src}
                  alt={item.title}
                  width={400}
                  height={400}
                  className={cn(
                    "h-full object-cover transition-all duration-700 group-hover/work:scale-105",
                    {
                      "opacity-60": isFocused && focusedIndex !== index,
                    },
                  )}
                  quality={100}
                />
              </div>
              <h3 className="font-commingSoon text-xl font-bold text-terciary">
                {item.title}
              </h3>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute right-0 size-20 border-terciary bg-transparent text-terciary" />
    </Carousel>
  );
};

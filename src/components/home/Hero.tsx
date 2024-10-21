"use client";
import ChaqchaoHero01 from "@/assets/images/chaqchao-hero-01.webp";
import ChaqchaoHero02 from "@/assets/images/chaqchao-hero-02.webp";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

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

export const Hero = () => {
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
        <CarouselContent className="h-[35rem] p-0">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="bg-secondary">
              <div className="relative h-full">
                <Image
                  src={item.image.src}
                  alt={item.title}
                  fill
                  className="h-full w-full object-cover"
                  priority={index === 0}
                  quality={100}
                />
                <div className="absolute h-full w-full select-none bg-gradient-to-t from-white to-transparent to-20%" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 border-terciary bg-terciary/20 text-terciary hover:bg-terciary/80 hover:text-white" />
        <CarouselNext className="absolute right-4 border-terciary bg-terciary/20 text-terciary hover:bg-terciary/80 hover:text-white" />
      </Carousel>
      <div className="container pointer-events-none absolute mx-auto flex h-full items-end justify-start py-20">
        <Link
          href="/workshops"
          className="pointer-events-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-6 py-4 text-2xl font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          Ver nuestros productos
        </Link>
      </div>
    </section>
  );
};

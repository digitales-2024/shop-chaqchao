"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";

interface Img {
  url: string;
}

interface GalleryProps {
  images: Img[];
  label: string;
}

export default function Gallery({ images, label }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const currentImage = useMemo(
    () => images[currentIndex].url || "/placeholder.svg",
    [images, currentIndex],
  );

  return (
    <div className="mx-auto grid h-full w-full grid-rows-[1fr_150px]">
      <div className="relative mx-auto mb-4 w-full max-w-[500px] overflow-hidden rounded-lg">
        <Image
          src={currentImage}
          alt={`${label} - imagen ${currentIndex + 1} de ${images.length}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 500px"
          className="rounded-lg object-cover object-center transition-all duration-300 hover:scale-110"
          priority={currentIndex === 0}
          quality={currentIndex === 0 ? 85 : 75}
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 transform"
          onClick={prevImage}
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Imagen anterior</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
          onClick={nextImage}
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente imagen</span>
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative overflow-hidden rounded-md ${
              index === currentIndex ? "ring-2 ring-primary" : ""
            }`}
            aria-label={`Ver imagen ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          >
            <div className="relative h-16 w-16">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`${label} - miniatura ${index + 1}`}
                fill
                sizes="64px"
                className="aspect-square object-cover object-center"
                loading="lazy"
                quality={60}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

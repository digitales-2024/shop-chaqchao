"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <div className="mx-auto grid w-full grid-rows-[1fr_100px]">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={label}
          width={500}
          height={500}
          className="object-cover object-center transition-all duration-300 hover:scale-110"
          priority
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-lg"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next image</span>
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
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={label}
              width={100}
              height={100}
              className="aspect-square object-cover object-center"
              priority={index < 3}
              quality={index < 3 ? 100 : 50}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

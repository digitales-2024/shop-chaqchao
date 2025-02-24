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
    <div className="mx-auto w-full">
      <div className="relative mb-4 aspect-square">
        <Image
          src={images[currentIndex].url || "/placeholder.svg"}
          alt={label}
          width={500}
          height={500}
          className="rounded-lg object-cover"
          priority
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 transform"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous image</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 transform"
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
            className={`relative aspect-square overflow-hidden rounded-md ${
              index === currentIndex ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={label}
              width={100}
              height={100}
              className="object-cover"
              priority={index < 3}
              quality={index < 3 ? 100 : 50}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

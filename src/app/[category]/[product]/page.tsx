"use client";
import Image from "next/image";

import Imagen from "../../../assets/images/bg_hero.webp";

export default function PageProductDetail() {
  return (
    <div>
      <Image
        src={Imagen}
        alt="Product name"
        className="demo w-48 -translate-y-28 rounded object-cover transition-all duration-500 group-hover/product:scale-105"
        width={200}
        height={50}
        quality={100}
      />
    </div>
  );
}

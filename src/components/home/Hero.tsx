"use client";
import ChaqchaoHeroWebp from "@/assets/images/chaqchao_hero.webp";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative flex h-[40rem] w-full items-center justify-center py-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-full w-full items-end justify-center"
      >
        <Image
          src={ChaqchaoHeroWebp}
          alt="Chaqchao Chocolate Factory"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container absolute mx-auto flex"
      >
        <Link
          href="/"
          className="peer/see relative z-10 flex rounded-lg bg-primary px-12 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-primary/90"
        >
          Ver nuestros productos
        </Link>
      </motion.div>
    </section>
  );
};

"use client";

import { useCatalog } from "@/hooks/use-catalog";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  Image as ImagePlaceholder,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail({
  params,
}: {
  params: { category: string; product: string };
}) {
  const { productFilters, isLoadingProductFilters } = useCatalog({
    filters: {
      name: params.product,
    },
  });
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoadingProductFilters) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Skeleton className="h-96 rounded-lg"></Skeleton>
          </div>
          <div className="flex flex-col gap-5">
            <div className="space-y-4">
              <Skeleton className="h-6"></Skeleton>
              <Skeleton className="h-4"></Skeleton>
              <Skeleton className="h-6"></Skeleton>
            </div>
            <div className="space-y-7">
              <Skeleton className="h-10"></Skeleton>
              <Skeleton className="h-10"></Skeleton>
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <Skeleton className="h-5"></Skeleton>
          <Skeleton className="h-16"></Skeleton>
          <Skeleton className="h-16"></Skeleton>
          <Skeleton className="h-16"></Skeleton>
        </div>
      </div>
    );
  }

  if (!productFilters) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {productFilters[0] ? (
            <Image
              src={productFilters[0]?.image}
              alt="Product Image"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
          ) : (
            <div className="size-[25rem]">
              <ImagePlaceholder />
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col justify-between"
        >
          <div>
            <h1 className="mb-4 text-3xl font-bold">
              {productFilters[0]?.name}
            </h1>
            <div className="mb-4 flex items-center">
              <div className="mr-2 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">(128 reseñas)</span>
            </div>
            <p className="mb-4 text-2xl font-semibold">$299.99</p>
            <p className="mb-6 text-gray-600">
              {productFilters[0]?.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                aria-label="Disminuir cantidad"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="mx-2 w-20 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                aria-label="Aumentar cantidad"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Descripción del producto</AccordionTrigger>
            <AccordionContent>
              Este reloj de pulsera combina elegancia y funcionalidad. Fabricado
              con materiales de alta calidad, cuenta con un movimiento de cuarzo
              preciso y una correa de cuero genuino. Es resistente al agua hasta
              50 metros y presenta una esfera de cristal mineral resistente a
              los arañazos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="specifications">
            <AccordionTrigger>Especificaciones</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-2 pl-5">
                <li>Material de la caja: Acero inoxidable</li>
                <li>Diámetro de la caja: 40mm</li>
                <li>Tipo de cristal: Mineral</li>
                <li>Movimiento: Cuarzo</li>
                <li>Resistencia al agua: 5 ATM (50 metros)</li>
                <li>Material de la correa: Cuero genuino</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Envío y devoluciones</AccordionTrigger>
            <AccordionContent>
              Ofrecemos envío gratuito en pedidos superiores a $100. El tiempo
              de entrega estimado es de 3-5 días hábiles. Aceptamos devoluciones
              dentro de los 30 días posteriores a la compra. El producto debe
              estar sin usar y en su embalaje original.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
}

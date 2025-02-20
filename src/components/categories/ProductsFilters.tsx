"use client";
import { WhatsApp } from "@/assets/icons";
import { useCatalog } from "@/hooks/use-catalog";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { CartItem } from "@/components/cart/CartItem";
import {
  FilterableProductList,
  Filters,
} from "@/components/categories/FilterableProductList";
import { SheetFiltersMobile } from "@/components/categories/SheetFiltersMobile";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { SearchProducts } from "./SearchProduts";

const MotionCard = motion.create(CartItem);

export const MensajeEmergente = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar si el mensaje se ha visto en la sesión actual
    const lastSession = localStorage.getItem("sessionTimestamp");
    const currentSession = new Date().getTime();

    // Si no hay sesión previa o ha pasado suficiente tiempo, mostramos el mensaje
    if (!lastSession || currentSession - Number(lastSession) > 1000 * 60 * 30) {
      setIsOpen(true);
      localStorage.setItem("sessionTimestamp", currentSession.toString());
    }
  }, []);

  return (
    <div className="h-screen w-full">
      {isOpen && (
        <div className="h-screen w-full">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40 backdrop-blur-md">
            <Card className="w-full max-w-sm p-6 text-center">
              <CardContent>
                <h2 className="font-nunito text-2xl font-black text-[#5c3629]">
                  ¡Bienvenido a Chaqchao!{" "}
                </h2>
                <p className="mb-4 font-nunito text-lg text-[#5c3629]">
                  ¿Deseas que tu pedido sea enviado a otra ciudad? <br />
                  Escríbenos a{" "}
                  <a
                    href="https://wa.me/+51932227454"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-nunito text-lg font-black text-[#5c3629]"
                  >
                    <WhatsApp className="h-4 w-4" />
                    <b>932 227 454</b> <ArrowUpRight className="h-4 w-4" />
                  </a>
                </p>

                <Button
                  className="rounded bg-[#d28127] px-4 py-2 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export const ProductsFilters = () => {
  const [filters, setFilters] = useState<Filters>({});

  const { productFilters } = useCatalog({
    filters,
  });

  const t = useTranslations("categories");
  return (
    <>
      <div className="flex flex-col items-start sm:flex-row">
        <div className="mb-10 flex w-full flex-col">
          <h1 className="font-riddle text-[clamp(2.5rem,_4.5vw,_4.5rem)]">
            {t("title")}
          </h1>
          <p>{t("description")}</p>
        </div>
        <SheetFiltersMobile filters={filters} setFilters={setFilters} />
      </div>
      <SearchProducts filters={filters} setFilters={setFilters} />

      <section className="relative inline-flex w-full items-center justify-center py-5">
        <div className="absolute bottom-0 left-0 right-0 top-0 w-[200vw] -translate-x-[100vw] bg-[#d28127]"></div>
        <div className="relative z-10 flex w-full items-center justify-center">
          <p className="relative my-1 text-center font-nunito text-[24px] font-black text-[#5c3629]">
            {t("PopupMessage.message")}{" "}
            <a
              href="https://wa.me/+51932227454"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg font-nunito text-base font-black text-[#5c3629] transition-all"
            >
              <WhatsApp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              <b className="text-[24px] sm:text-xl md:text-2xl">932 227 454</b>
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </a>
          </p>
        </div>
      </section>
      <br />
      <div className="flex flex-col lg:flex-row">
        <aside className="sticky top-28 hidden max-h-screen self-start lg:block lg:w-1/4 lg:pr-8">
          <FilterableProductList filters={filters} setFilters={setFilters} />
        </aside>
        <main className="flex-1">
          <motion.div
            className="grid grid-cols-[repeat(auto-fill,_minmax(22rem,_1fr))] justify-items-center gap-6 gap-y-16"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <AnimatePresence>
              {productFilters?.map((product) => (
                <MotionCard
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  product={product}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </>
  );
};

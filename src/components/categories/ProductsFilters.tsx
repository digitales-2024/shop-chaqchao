"use client";
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
                  <span className="flex items-center justify-center gap-2">
                    Escríbenos a{" "}
                    <a
                      href="https://wa.me/+51932227454"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-nunito text-lg font-black text-[#5c3629]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
                        />
                      </svg>
                      <b>932 227 454</b> <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </span>
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

      <section className="relative flex w-full items-center justify-center py-5">
        <div className="absolute bottom-0 left-0 right-0 top-0 w-[200vw] -translate-x-[100vw] bg-[#d28127]"></div>
        <div className="relative z-10 flex w-full items-center justify-center px-4">
          <p className="flex flex-wrap items-center justify-center gap-2 text-center font-nunito text-[24px] font-black text-[#5c3629]">
            <span className="text-balance">{t("PopupMessage.message")} </span>
            <a
              href="https://wa.me/+51932227454"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg font-nunito text-base font-black text-white transition-all hover:opacity-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01"
                />
              </svg>

              <b className="text-[24px] sm:text-xl md:text-2xl">932 227 454</b>
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

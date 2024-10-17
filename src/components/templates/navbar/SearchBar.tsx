"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowRight, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Simulación de productos para autocompletado
const productos = [
  "Laptop Pro X",
  "SmartPhone Ultra",
  "Tablet Air",
  "AudioPhile Headphones",
  "FitBit Pro",
  "4K CineCam",
  "SoundSphere",
  "DesignView Monitor",
  "MechMaster Keyboard",
  "ErgoMouse",
];

export function SearchBar() {
  const [busqueda, setBusqueda] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [ultimasBusquedas, setUltimasBusquedas] = useState<string[]>([]);
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (busqueda) {
      const filteredSugerencias = productos.filter((producto) =>
        producto.toLowerCase().includes(busqueda.toLowerCase()),
      );
      setSugerencias(filteredSugerencias);
    } else {
      setSugerencias([]);
    }
  }, [busqueda]);

  const handleSearch = (term: string) => {
    if (term && !ultimasBusquedas.includes(term)) {
      setUltimasBusquedas((prev) => [term, ...prev.slice(0, 4)]);
    }
    setBusqueda(term);
    setIsFocused(false);
  };

  const handleClear = () => {
    setBusqueda("");
  };

  return (
    <div className="relative mx-auto w-full">
      <div className="relative z-50">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="relative z-50 border-none bg-chaqchao-white py-2 pl-4 pr-20 transition-all duration-300 ease-in-out"
        />
        <AnimatePresence>
          {busqueda && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={handleClear}
              className="absolute right-10 top-1/3 z-50 -translate-y-1/2 transform"
              aria-label="Limpiar búsqueda"
            >
              <X className="size-4 text-gray-400 transition-colors duration-200 hover:text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
        <Search className="absolute right-3 top-1/2 z-[51] size-4 -translate-y-1/2 transform text-slate-500" />
      </div>
      <AnimatePresence>
        {isFocused && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={() => setIsFocused(false)}
            />
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 right-0 top-full z-50 mt-2 rounded-md bg-white shadow-lg"
            >
              <ScrollArea className="max-h-[300px]">
                {ultimasBusquedas.length > 0 && (
                  <div className="p-2">
                    <h3 className="mb-2 text-sm font-semibold text-gray-500">
                      Últimas búsquedas
                    </h3>
                    {ultimasBusquedas.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(term)}
                        className="flex w-full items-center rounded-md p-2 transition-colors duration-150 hover:bg-gray-100"
                      >
                        <Clock className="mr-2 h-4 w-4 text-gray-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                )}
                {sugerencias.length > 0 && (
                  <div className="p-2">
                    <h3 className="mb-2 text-sm font-semibold text-gray-500">
                      Sugerencias
                    </h3>
                    {sugerencias.map((sugerencia, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleSearch(sugerencia)}
                        className="flex w-full items-center justify-between rounded-md p-2 transition-colors duration-150 hover:bg-gray-100"
                      >
                        <span>{sugerencia}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      </motion.button>
                    ))}
                  </div>
                )}
                {ultimasBusquedas.length === 0 && sugerencias.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No hay búsquedas recientes ni sugerencias
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

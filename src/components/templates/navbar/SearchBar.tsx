"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

export function SearchBar() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setBusqueda("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de búsqueda
    console.log("Búsqueda realizada");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  const handleClear = () => {
    setBusqueda("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsSearchVisible(false);
  };

  return (
    <div ref={searchRef} className="relative flex items-center gap-2">
      <div
        className={cn("transition-all duration-300 ease-in-out", {
          "w-0 opacity-0": !isSearchVisible,
          "w-80 opacity-100": isSearchVisible,
        })}
      >
        <form onSubmit={handleSubmit} className="relative">
          <Label htmlFor="search" className="sr-only">
            Buscar productos
          </Label>
          <Input
            aria-label="Buscar productos"
            alt="Buscar productos"
            ref={inputRef}
            type="text"
            value={busqueda}
            placeholder="Buscar productos ..."
            onChange={(e) => setBusqueda(e.target.value)}
            className={`border-none transition-all duration-300 ease-in-out ${isSearchVisible ? "w-full opacity-100" : "w-0 opacity-0"} focus:ring-none rounded-full focus:outline-none focus-visible:ring-transparent`}
          />
          <AnimatePresence>
            {busqueda && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={handleClear}
                className="absolute right-3 top-3 transform"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-5 w-5 text-secondary/50 hover:text-secondary" />
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </div>
      <div
        onClick={toggleSearch}
        aria-label="Buscar"
        className={cn(
          "relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 hover:scale-105 hover:bg-background",
          {
            "bg-background hover:bg-background": isSearchVisible,
          },
        )}
      >
        <Search />
      </div>
    </div>
  );
}

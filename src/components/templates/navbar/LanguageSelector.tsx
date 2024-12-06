"use client";

import { TextMorph } from "@/hooks/text-morph";
import { useWindowScrollPosition } from "@/hooks/use-window-scroll-position";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import AnimatedBackground from "@/components/core/AnimateBackground";

export function LanguageSelector() {
  const t = useTranslations("navbar.languages");

  const locale = useLocale() as Locale;

  const ITEMS = [
    {
      id: "es",
      name: t("es"),
      label: "Es",
    },
    {
      id: "en",
      name: t("en"),
      label: "En",
    },
  ];

  const [selectedLocale, setSelectedLocale] = useState<Locale>(locale);

  function onChange(value: string) {
    const locale = value as Locale;
    setSelectedLocale(locale); // Update the selected locale
    setUserLocale(locale);
  }

  const { y } = useWindowScrollPosition();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Esto asegura que el componente se renderice después de que se haya montado
    setMounted(true);
    setSelectedLocale(locale); // Inicializa el locale después de que el componente se haya montado
  }, [locale]);

  if (!mounted) {
    return null; // O podrías retornar un "loading..." si prefieres una indicación visual
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 w-fit">
      <div className="flex w-full space-x-2 rounded-full border border-zinc-950/10 bg-white/40 p-2 backdrop-blur-md">
        <AnimatedBackground
          defaultValue={locale}
          onValueChange={(value) => onChange(value as string)}
          className="rounded-full bg-primary/10"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {ITEMS.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              data-checked={selectedLocale === item.id}
              type="button"
              className="inline-flex h-9 w-auto items-center justify-center px-2 text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950"
            >
              <TextMorph>{y > 1 ? item.label : item.name}</TextMorph>
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
}

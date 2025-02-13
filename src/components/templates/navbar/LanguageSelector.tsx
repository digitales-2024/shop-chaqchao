"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export function LanguageSelector() {
  const t = useTranslations("navbar.languages");

  const languages = [
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

  const handleLanguageChange = (language: "es" | "en") => {
    setUserLocale(language);
  };
  const locale = useLocale() as Locale;

  return (
    <div className="relative inline-block text-left">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="inline-flex items-center gap-4">
          <span className="block truncate uppercase">{locale}</span>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem
              key={language.id}
              value={language.id}
              className="uppercase"
            >
              {language.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

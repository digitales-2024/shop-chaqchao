"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";

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

  return (
    <div className="relative inline-block text-left">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="inline-flex items-center gap-4">
          <span className="block truncate uppercase">{languages[0].label}</span>
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

"use client";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Globe } from "lucide-react";
import { useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValue: string;
};

export function LanguageSelector({ defaultValue }: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <Select value={defaultValue} onValueChange={onChange} disabled={isPending}>
      <SelectTrigger className="w-28 border-none bg-transparent focus:bg-background focus:ring-0 focus:ring-offset-0">
        <Globe />
        <SelectValue placeholder="Selecciona un idioma" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">ES</SelectItem>
        <SelectItem value="en">EN</SelectItem>
      </SelectContent>
    </Select>
  );
}

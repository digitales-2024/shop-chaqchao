import { useLanguagesQuery } from "@/redux/services/classApi";
import { useState, useEffect } from "react";

interface Language {
  id: string;
  languageName: string;
}

export const useLanguages = () => {
  const { data: languages, isLoading, error } = useLanguagesQuery();
  const [languageOptions, setLanguageOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (languages && !isLoading) {
      setLanguageOptions(
        languages.map((language: Language) => ({
          value: language.id,
          label: language.languageName,
        })),
      );
    }
  }, [languages, isLoading]);

  return { languageOptions, isLoading, languages, error };
};

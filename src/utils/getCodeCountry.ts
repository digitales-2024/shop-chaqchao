import countries from "@/data/countries.json";

import { CountryProps } from "@/components/ui/location-input";
/**
 * Obtenga el código de país del nombre del país
 * @param {string} countryCode - Código del país
 * @returns {string} - Nombre de país
 */
export const getCodeCountry = (countryCode: string): string => {
  // Cast imported JSON data to their respective types
  const countriesData = countries as CountryProps[];

  return (
    countriesData.find((country) => country.iso2 === countryCode)?.name || ""
  );
};

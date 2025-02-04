/**
 * Convertir una cadena a un formato de slug (URL amigable)
 *
 * @param {string} text - Cadena de texto a convertir
 * @returns {string} - Cadena de texto convertida a slug
 */
export const convertSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

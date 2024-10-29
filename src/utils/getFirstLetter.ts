/**
 * Obtenga la primera letra de una cadena
 * @param {string} str - Cadena de la que se obtendrá la primera letra
 * @returns {string} - La primera letra de la cadena
 * @example getFirstLetter("Hola mundo") // "H"
 */
export const getFirstLetter = (str: string | undefined): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase();
};

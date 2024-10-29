/**
 * Convertir una cadena a un formato de slug (URL amigable)
 *
 * @param {string} text - Cadena de texto a convertir
 * @returns {string} - Cadena de texto convertida a slug
 */
export const convertSlug = (text: string): string => {
  return (
    text
      .toLowerCase()
      // Reemplazar caracteres especiales por su equivalente en ASCII
      .normalize("NFD")
      // Eliminar caracteres especiales que no sean letras o números
      .replace(/[\u0300-\u036f]/g, "")
      // Eliminamos guiones y guiones bajos que no sean parte de una palabra (letra o número)
      .replace(/[^a-zA-Z0-9-_\s]/g, "")
      // Reemplazar guiones y sus dos espacios por un espacio
      .replace(/[-_\s]+/g, " ")
      // Reemplazar espacios por guiones
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
  );
};

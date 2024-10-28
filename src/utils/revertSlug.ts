/**
 * Revert a slug to a string
 *
 * @param {string} slug - Slug to revert
 * @returns {string} - Reverted string
 */
export const revertSlug = (slug: string): string => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

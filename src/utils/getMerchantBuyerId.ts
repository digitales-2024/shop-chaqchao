/**
 * Generar un nuevo merchant buyer id
 * @returns The merchant buyer id
 */
export const getMerchantBuyerId = () => {
  return "chq" + Math.floor(Math.random() * 1000000).toString();
};

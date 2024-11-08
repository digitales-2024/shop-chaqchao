import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

export const CartEmpty = () => {
  const t = useTranslations("cart.empty");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <ShoppingBag className="size-28 text-primary" strokeWidth={0.5} />
      <h2 className="mt-4 text-2xl font-bold">{t("title")}</h2>
      <p className="mt-2 text-balance text-sm text-neutral-500">
        {t("description")}
      </p>
    </motion.div>
  );
};

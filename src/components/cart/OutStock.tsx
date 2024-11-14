import { ShoppingDelete } from "@/assets/icons";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export const OutStock = () => {
  const t = useTranslations("cartItem");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-white bg-opacity-50",
      )}
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center space-x-2 rounded-full bg-white px-4 py-2 font-semibold text-red-500"
      >
        <ShoppingDelete className="animate-tada" />
        <span>{t("outOfStock")}</span>
      </motion.div>
    </motion.div>
  );
};

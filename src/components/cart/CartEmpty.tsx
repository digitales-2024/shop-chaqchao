import { motion } from "framer-motion";
import { ShoppingBag, Sparkle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export const CartEmpty = () => {
  const t = useTranslations("cart.empty");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="relative flex items-center justify-center p-10">
        <div className="absolute size-44 rounded-full bg-primary/5"></div>
        <div className="absolute size-32 rounded-full bg-primary/5"></div>
        <div className="absolute size-20 rounded-full bg-primary/10"></div>
        <Sparkle className="absolute left-3 top-4 size-4 text-primary" />
        <Sparkle className="absolute bottom-4 left-6 size-3 text-primary" />
        <Sparkle className="absolute bottom-1/2 right-1 size-3 text-primary" />
        <Sparkles className="absolute right-2 top-2 size-3 text-primary/60" />
        <Sparkles className="absolute bottom-1/2 left-0 size-3 text-primary/60" />
        <ShoppingBag className="size-14 text-primary" strokeWidth={1} />
      </div>
      <h2 className="mt-4 text-2xl font-bold">{t("title")}</h2>
      <p className="mt-2 text-balance text-sm text-neutral-500">
        {t("description")}
      </p>
    </motion.div>
  );
};

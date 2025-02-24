"use client";
import { useBusiness } from "@/hooks/useBusiness";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Skeleton } from "../ui/skeleton";
import { ExternalLink, MapPin } from "lucide-react";

const direction = "Chaqchao+Express,+Avenida+Ejército,+Yanahuara";
export const BusinessInfoCart = () => {
  const t = useTranslations("business");
  const { business, isLoading } = useBusiness();
  console.log(business);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-sm text-gray-600"
    >
      <div className="space-y-4 rounded-md bg-muted p-4">
        <h3 className="mb-2 font-black">{t("address")}</h3>
        <div className="mb-2 inline-flex items-center gap-2">
          <MapPin className="size-5 shrink-0" />
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : !business ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{business.businessInfo?.address}</span>
          )}
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${direction}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:underline"
        >
          {t("see")}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

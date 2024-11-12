import { useTranslations } from "next-intl";
import { z } from "zod";

export const InvoiceSchema = () => {
  const t = useTranslations("checkout.invoice.errors");

  return z.object({
    documentType: z.string().min(1, {
      message: t("typeDoc"),
    }),
    number: z.string().regex(/^[0-9]+$/, {
      message: t("number"),
    }),

    address: z.string().optional(),
    name: z.string().optional(),
  });
};

import { useTranslations } from "next-intl";
import { z } from "zod";

export const RecieptSchema = () => {
  const t = useTranslations("checkout.invoice.errors");

  return z.object({
    documentType: z.string().min(1, {
      message: t("typeDoc"),
    }),
    number: z.string().regex(/^[0-9]+$/, {
      message: t("number"),
    }),
  });
};

export const InvoiceSchema = () => {
  const t = useTranslations("checkout.invoice.errors");

  return z.object({
    documentType: z.string().min(1, {
      message: t("typeDoc"),
    }),
    number: z
      .string()
      .min(11, {
        message: t("ruc"),
      })
      .max(11, {
        message: t("ruc"),
      })
      .regex(/^[0-9]+$/, {
        message: t("number"),
      }),

    address: z.string().min(1, {
      message: t("address"),
    }),
    name: z.string().min(1, {
      message: t("name"),
    }),
  });
};

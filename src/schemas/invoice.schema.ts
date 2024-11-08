import useCartDetail from "@/hooks/use-cart-detail";
import { useTranslations } from "next-intl";
import { z } from "zod";

import { INVOICE } from "@/components/cart/SelectInvoice";
export const InvoiceSchema = () => {
  const t = useTranslations("checkout.invoice.errors");

  const { invoice } = useCartDetail();
  return z.object({
    documentType: z.string().min(1, {
      message: t("typeDoc"),
    }),
    number: z
      .string()
      .min(invoice === INVOICE[0] ? 8 : 11, {
        message: invoice === INVOICE[0] ? t("dni") : t("ruc"),
      })
      .regex(/^[0-9]+$/, {
        message: t("number"),
      }),

    address: z.string().optional(),
    name: z.string().optional(),
  });
};

export type Invoice = {
  documentType: string;
  number: string;
  address?: string;
  name?: string;
};

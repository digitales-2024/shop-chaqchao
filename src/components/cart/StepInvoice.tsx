"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { INVOICES, InvoiceType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FormInvoice } from "./FormInvoice";
import { FormReceipt } from "./FormReceipt";

export const StepInvoice = () => {
  const t = useTranslations("checkout.invoice");
  const { invoice, setInvoice } = useCartDetail();

  return (
    <div className="mx-auto w-full px-4">
      <div className="relative mb-6 w-full">
        <div className="grid grid-cols-2 rounded-full bg-muted p-1">
          {INVOICES.map((type) => (
            <button
              key={type}
              onClick={() => {
                setInvoice({
                  typeInvoice: type,
                  documentType: "",
                  number: "",
                  address: "",
                  country: "",
                  state: "",
                  city: "",
                  nameBusiness: "",
                });
              }}
              className={`relative z-10 rounded-full py-2 text-sm font-medium transition-colors ${
                invoice.typeInvoice === type
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {t(type.charAt(0).toUpperCase() + type.slice(1))}
            </button>
          ))}
          <motion.div
            className="absolute bottom-[2px] left-[2px] right-[2px] top-[2px] rounded-full bg-background shadow-sm"
            initial={false}
            animate={{
              x: invoice.typeInvoice === InvoiceType.RECEIPT ? "0%" : "100%",
              width: "49.35%",
            }}
            transition={{
              stiffness: 400,
              damping: 30,
            }}
          />
        </div>
      </div>
      <AnimatePresence>
        {invoice.typeInvoice === InvoiceType.RECEIPT ? (
          <FormReceipt />
        ) : (
          <FormInvoice />
        )}
      </AnimatePresence>
    </div>
  );
};

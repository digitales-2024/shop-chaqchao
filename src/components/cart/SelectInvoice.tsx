"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { InvoiceSchema } from "@/schemas/invoice.schema";
import { Invoice, INVOICES } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const SelectInvoice = () => {
  const form = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema()),
    defaultValues: {
      documentType: "dni",
      number: "",
      address: "",
      name: "",
    },
  });
  const { invoice, setInvoice } = useCartDetail();

  const receiptDocuments = [
    {
      code: "dni",
      label: "DNI",
    },
    {
      code: "passport",
      label: "Pasaporte",
    },
  ];
  const invoiceDocuments = [
    {
      code: "ruc",
      label: "RUC",
    },
  ];

  const t = useTranslations("checkout.invoice");

  return (
    <div className="w-full max-w-80">
      <div className="relative mb-6">
        <div className="grid grid-cols-2 rounded-full bg-muted p-1">
          {INVOICES.map((type) => (
            <button
              key={type}
              onClick={() => {
                setInvoice({
                  ...invoice,
                  typeInvoice: type,
                });
                form.setValue("documentType", "");
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
              x: invoice.typeInvoice === INVOICES[0] ? "0%" : "100%",
              width: "49.35%",
            }}
            transition={{
              stiffness: 400,
              damping: 30,
            }}
          />
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("typeDoc")}</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("typeDoc")} />
                    </SelectTrigger>
                    <SelectContent>
                      {invoice.typeInvoice === INVOICES[0]
                        ? receiptDocuments.map(({ code, label }) => (
                            <SelectItem key={code} value={code}>
                              {label}
                            </SelectItem>
                          ))
                        : invoiceDocuments.map(({ code, label }) => (
                            <SelectItem key={code} value={code}>
                              {label}
                            </SelectItem>
                          ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">{t("doc")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {invoice.typeInvoice === INVOICES[1] && (
            <>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">{t("address")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">{t("name")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

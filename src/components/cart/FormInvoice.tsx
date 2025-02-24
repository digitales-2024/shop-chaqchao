import useCartDetail from "@/hooks/use-cart-detail";
import { InvoiceSchema } from "@/schemas/invoice.schema";
import { DocumentTypeInvoice, Invoice, InvoiceType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCustomerData } from "@/lib/api/api-sunat";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormBilling } from "./FormBilling";

const invoiceDocuments = [
  {
    code: DocumentTypeInvoice.RUC,
    label: "RUC",
  },
];
export const FormInvoice = () => {
  const { invoice, setInvoice, handleStepComplete } = useCartDetail();
  const form = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema()),
    defaultValues: {
      documentType:
        invoice.typeInvoice === InvoiceType.INVOICE
          ? invoice.documentType || DocumentTypeInvoice.RUC
          : DocumentTypeInvoice.RUC,
      number:
        invoice.typeInvoice === InvoiceType.INVOICE ? invoice.number || "" : "",
      address:
        invoice.typeInvoice === InvoiceType.INVOICE
          ? invoice.address || ""
          : "",
      nameBusiness:
        invoice.typeInvoice === InvoiceType.INVOICE && "nameBusiness" in invoice
          ? invoice.nameBusiness || ""
          : "",
      country:
        invoice.typeInvoice === InvoiceType.INVOICE
          ? invoice.country || ""
          : "",
      state:
        invoice.typeInvoice === InvoiceType.INVOICE ? invoice.state || "" : "",
      city:
        invoice.typeInvoice === InvoiceType.INVOICE ? invoice.city || "" : "",
    },
  });
  const t = useTranslations("checkout.invoice");
  const c = useTranslations("checkout");

  const handleSubmit = () => {
    setInvoice({
      typeInvoice: InvoiceType.INVOICE,
      ...form.getValues(),
      nameBusiness: form.getValues().nameBusiness || "",
    });
    handleStepComplete(1);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!form.getValues().number) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await getCustomerData("ruc", form.getValues().number);

      setIsLoading(false);
      form.setValue("nameBusiness", response.razonSocial);
      form.setValue("address", response.direccion || undefined);
    };

    if (
      form.getValues().documentType === DocumentTypeInvoice.RUC &&
      form.getValues().number.length === 11
    ) {
      fetchData();
    } else {
      form.setValue("nameBusiness", "");
      form.setValue("address", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("number")]);

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
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
                    {invoiceDocuments.map(({ code, label }) => (
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
                <div className="relative">
                  <Input {...field} />
                  {isLoading && (
                    <span>
                      <RefreshCcw className="absolute right-2 top-2 animate-spin text-primary" />
                    </span>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nameBusiness"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{t("nameBusiness")}</FormLabel>
              <FormControl>
                <Input {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormBilling form={form} />
        <Button className="w-full">{c("continue")}</Button>
      </form>
    </Form>
  );
};

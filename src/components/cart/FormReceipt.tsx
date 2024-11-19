import useCartDetail from "@/hooks/use-cart-detail";
import { RecieptSchema } from "@/schemas/invoice.schema";
import { DocumentType, InvoiceType, Receipt } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
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

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormBilling } from "./FormBilling";

const receiptDocuments = [
  {
    code: DocumentType.DNI,
    label: "DNI",
  },
  {
    code: DocumentType.PASSPORT,
    label: "Pasaporte",
  },
];
export const FormReceipt = () => {
  const { invoice, setInvoice, handleStepComplete } = useCartDetail();

  const form = useForm<Receipt>({
    resolver: zodResolver(RecieptSchema()),
    defaultValues: {
      documentType:
        invoice.typeInvoice === InvoiceType.RECEIPT
          ? invoice.documentType || DocumentType.DNI
          : DocumentType.DNI,
      number:
        invoice.typeInvoice === InvoiceType.RECEIPT ? invoice.number || "" : "",

      address:
        invoice.typeInvoice === InvoiceType.RECEIPT
          ? invoice.address || ""
          : "",
      country:
        invoice.typeInvoice === InvoiceType.RECEIPT
          ? invoice.country || ""
          : "",
      state:
        invoice.typeInvoice === InvoiceType.RECEIPT ? invoice.state || "" : "",
      city:
        invoice.typeInvoice === InvoiceType.RECEIPT ? invoice.city || "" : "",
      codPostal:
        invoice.typeInvoice === InvoiceType.RECEIPT
          ? invoice.codPostal || ""
          : "",
    },
  });
  const t = useTranslations("checkout.invoice");
  const c = useTranslations("checkout");

  const handleSubmit = () => {
    if (
      form.getValues().documentType === DocumentType.DNI &&
      form.getValues().number.length !== 8
    ) {
      form.setError("number", {
        type: "manual",
        message: t("errors.dni"),
      });
      return;
    }

    if (
      form.getValues().documentType === DocumentType.PASSPORT &&
      form.getValues().number.length !== 12
    ) {
      form.setError("number", {
        type: "manual",
        message: t("errors.passport"),
      });
      return;
    }

    setInvoice({
      typeInvoice: InvoiceType.RECEIPT,
      ...form.getValues(),
      nameBusiness: "",
    });

    handleStepComplete(1);
  };

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
                    {receiptDocuments.map(({ code, label }) => (
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
        <FormBilling form={form} />
        <Button className="w-full">{c("continue")}</Button>
      </form>
    </Form>
  );
};

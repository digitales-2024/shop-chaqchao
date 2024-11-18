import useCartDetail from "@/hooks/use-cart-detail";
import { useProfile } from "@/hooks/use-profile";
import { RecieptSchema } from "@/schemas/invoice.schema";
import { Invoice } from "@/types";
import { DocumentType, InvoiceType } from "@/types/invoice";
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

  const { clientData } = useProfile();

  const form = useForm<Invoice>({
    resolver: zodResolver(RecieptSchema()),
    defaultValues: {
      documentType:
        invoice.typeInvoice === InvoiceType.RECEIPT
          ? invoice.documentType || DocumentType.DNI
          : DocumentType.DNI,
      number:
        invoice.typeInvoice === InvoiceType.RECEIPT ? invoice.number || "" : "",
      name:
        invoice.typeInvoice === InvoiceType.RECEIPT
          ? (clientData ? clientData.name : invoice.name) || ""
          : "",
    },
  });
  const t = useTranslations("checkout.invoice");
  const c = useTranslations("checkout");

  const handleSubmit = () => {
    if (
      form.getValues().documentType === DocumentType.DNI &&
      form.getValues().number.length < 8
    ) {
      form.setError("number", {
        type: "manual",
        message: t("errors.dni"),
      });
      return;
    }

    if (
      form.getValues().documentType === DocumentType.PASSPORT &&
      form.getValues().number.length < 12
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
    });

    handleStepComplete(2);
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">{t("name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">{c("continue")}</Button>
      </form>
    </Form>
  );
};

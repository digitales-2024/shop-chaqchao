import useCartDetail from "@/hooks/use-cart-detail";
import { InvoiceSchema } from "@/schemas/invoice.schema";
import { Invoice, INVOICES } from "@/types";
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

const invoiceDocuments = [
  {
    code: "ruc",
    label: "RUC",
  },
];
export const FormInvoice = () => {
  const form = useForm<Invoice>({
    resolver: zodResolver(InvoiceSchema()),
    defaultValues: {
      documentType: "ruc",
      number: "",
      address: "",
      name: "",
    },
  });
  const { setInvoice } = useCartDetail();
  const t = useTranslations("checkout.invoice");
  const c = useTranslations("checkout");

  const handleSubmit = () => {
    setInvoice({
      typeInvoice: INVOICES[1],
      ...form.getValues(),
    });
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full">{c("continue")}</Button>
      </form>
    </Form>
  );
};

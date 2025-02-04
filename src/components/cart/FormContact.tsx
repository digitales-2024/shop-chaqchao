"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { useClients } from "@/hooks/use-client";
import { useProfile } from "@/hooks/use-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCcw, UserSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

export const FormContact = () => {
  const t = useTranslations("checkout.contact");
  const e = useTranslations("errors");

  const formSchema = z.object({
    name: z.string().min(1, {
      message: t("errors.name"),
    }),
    lastName: z.string().min(1, {
      message: t("errors.lastName"),
    }),
    email: z.string().email({
      message: t("errors.email"),
    }),
    phone: z.string().refine(isValidPhoneNumber, {
      message: t("errors.phone"),
    }),
  });
  const { clientData } = useProfile();
  const { contact, setContact, handleStepComplete } = useCartDetail();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: contact.name ? contact.name : clientData?.name || "",
      lastName: contact.lastName
        ? contact.lastName
        : clientData?.lastName || "",
      email: contact.email ? contact.email : clientData?.email || "",
      phone: clientData?.phone || "",
    },
  });

  useEffect(() => {
    form.setValue("name", contact.name ? contact.name : clientData?.name || "");
    form.setValue(
      "lastName",
      contact.lastName ? contact.lastName : clientData?.lastName || "",
    );
    form.setValue(
      "email",
      contact.email ? contact.email : clientData?.email || "",
    );
    form.setValue(
      "phone",
      contact.phone ? contact.phone : clientData?.phone || "",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData, contact]);

  const { existClienByEmail, isLoadingClientByEmail, dataClientByEmail } =
    useClients();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await existClienByEmail({
        email: values.email,
      }).unwrap();
      if (!response || !!clientData) {
        setContact(values);
        handleStepComplete(0);
        return;
      }
    } catch (error) {
      toast(e("cart.title"), {
        description: e("network"),
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-4 py-2 md:px-10"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input readOnly={!!clientData} autoComplete="off" {...field} />
              </FormControl>
              <FormDescription>{t("descriptionEmail")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>{t("phone")}</FormLabel>
              <FormControl className="w-full">
                <PhoneInput {...field} autoComplete="off" defaultCountry="PE" />
              </FormControl>
              <FormDescription>{t("descriptionPhone")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {dataClientByEmail ? (
          <AnimatePresence>
            {dataClientByEmail ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert className="border-cyan-500 text-cyan-500">
                  <UserSearch className="size-4 stroke-cyan-500" />
                  <AlertTitle className="font-bold">
                    {t("alert.title")}
                  </AlertTitle>
                  <AlertDescription>{t("alert.description")}</AlertDescription>
                </Alert>
              </motion.div>
            ) : null}
          </AnimatePresence>
        ) : null}

        <Button type="submit" className="w-full">
          {isLoadingClientByEmail ? (
            <>
              <RefreshCcw className="animate-spin" />
              {t("loading")}
            </>
          ) : (
            t("button")
          )}
        </Button>
      </form>
    </Form>
  );
};

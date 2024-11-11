import useCartDetail from "@/hooks/use-cart-detail";
import { useClients } from "@/hooks/use-client";
import { useProfile } from "@/hooks/use-profile";
import { getFirstLetter } from "@/utils/getFirstLetter";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Check, Mail, RefreshCcw, UserSearch } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import PulsatingDots from "../common/PulsatingDots";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { DialogLogin } from "./DialogLogin";

export const StepEmail = () => {
  const { clientData, isLoading } = useProfile();

  const t = useTranslations("checkout.login");
  const c = useTranslations("checkout");

  const { login, setLogin, handleStepComplete } = useCartDetail();
  const emailSchema = z.object({
    email: z.string().email("Ingrese un correo electrónico válido"),
  });

  type EmailSchema = z.infer<typeof emailSchema>;

  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: login,
  });

  const { findClient, isLoadingClientByEmail, dataClientByEmail } =
    useClients();

  const onSubmit = async (data: { email: string }) => {
    const response = await findClient({ email: data.email });

    if (response.error) {
      setLogin({ email: data.email, name: "" });
      handleStepComplete(0);
    }
  };

  const handleContinue = () => {
    setLogin({ email: clientData?.email ?? "", name: clientData?.name ?? "" });
    handleStepComplete(0);
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-bold">{t("title")}</h2>
        <p className="text-sm">{t("description")}</p>
      </div>
      {isLoading ? (
        <PulsatingDots />
      ) : clientData ? (
        <div className="flex flex-col items-end justify-end gap-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="inline-flex items-center gap-4">
                <div className="relative flex size-10 items-center justify-center rounded-full border-primary bg-background font-nunito text-lg font-black capitalize outline outline-primary">
                  {getFirstLetter(clientData.name)}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="capitalize">{clientData.name}</span>
                  <CardDescription className="inline-flex items-center gap-4">
                    <span className="truncate">{clientData.email}</span>
                    <Check className="size-4 text-emerald-500" />
                  </CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
          <Button type="button" onClick={handleContinue}>
            {c("continue")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="email"
                      className="inline-flex items-center gap-2 text-sm font-bold"
                    >
                      <Mail className="size-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <AlertDescription>
                        {t("alert.description")}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <Button variant="outline" className="border-primary text-primary">
                {isLoadingClientByEmail ? (
                  <>
                    <RefreshCcw className="spin size-4" /> Buscando{" "}
                  </>
                ) : (
                  "Continuar"
                )}
              </Button>
            </form>
          </Form>
          <Separator orientation="vertical" />
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">¿Ya tienes cuenta?</h3>
              <p className="text-sm">
                ¡Inicia sesión y sigue disfrutando de tus compras!
              </p>
            </div>
            <DialogLogin />
          </div>
        </div>
      )}
    </div>
  );
};

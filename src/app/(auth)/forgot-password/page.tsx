"use client";
import { useForgotPassword } from "@/hooks/use-forgot-password";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Key } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { LanguageSelector } from "@/components/templates/navbar/LanguageSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function ForgotPasswordPage() {
  const { onForgotPassword, isSucessForgotPassword } = useForgotPassword();

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordSchema) {
    onForgotPassword(values);
    if (isSucessForgotPassword) {
      form.reset();
    }
  }

  const t = useTranslations("forgot-password");

  return (
    <>
      <div className="relative grid h-full grid-cols-1 items-center justify-items-center">
        <Card className="max-w-[35rem] border-none shadow-none">
          <CardHeader className="space-y-6 text-center">
            <div className="mx-auto rounded-full bg-secondary/10 p-4">
              <Key size={48} className="text-secondary" />
            </div>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription className="text-balance">
              {t("subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input placeholder="chaqchao@email.com" {...field} />
                      </FormControl>
                      <FormDescription>{t("description")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="rounded-full text-lg">{t("button")}</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-base">
              <Link href="/sign-in" className="text-secondary">
                {t("login")}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <LanguageSelector />
    </>
  );
}

"use client";
import { GoogleIcon } from "@/assets/icons";
import { useLogin } from "@/hooks/use-login";
import { AuthSchema } from "@/schemas/authSchema";
import { Credentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Separator } from "@/components/ui/separator";

export const FormLogin = () => {
  const { onLogin, googleLogin, isLoading } = useLogin();
  const t = useTranslations("login");

  const form = useForm<Credentials>({
    resolver: zodResolver(AuthSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <Card className="w-full max-w-[30rem] border-none shadow-none">
        <CardHeader className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-center text-3xl font-bold"
          >
            <p className="text-5xl font-bold">{t("title")}</p>
            <span className="inline-flex flex-wrap justify-center gap-1 text-2xl">
              <span className="truncate">{t("subtitle")}</span>
              <h1 className="text-primary"> Chaqchao</h1>
            </span>
          </motion.div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onLogin)}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="email">
                        {t("email")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@gmail.com"
                          {...field}
                          className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="password">
                        {t("password")}
                      </FormLabel>
                      <FormControl>
                        <div className="relative mb-4">
                          <div className="relative">
                            <InputPassword placeholder="********" {...field} />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="ml-1 text-sm hover:text-primary"
                  >
                    {t("forgot")}
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  className="w-full rounded-full py-6 text-lg text-white transition duration-300 hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? "Cargando..." : `${t("button")}`}
                </Button>
              </motion.div>
            </form>
          </Form>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center justify-center gap-4 text-center"
          >
            <Separator orientation="horizontal" className="w-16 opacity-45" />
            O
            <Separator orientation="horizontal" className="w-16 opacity-45" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              className="flex w-full items-center justify-center rounded-full border bg-white py-6"
              onClick={googleLogin}
              disabled={isLoading}
            >
              <GoogleIcon className="size" />
              {t("google")}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mt-4 text-center text-sm">
              <span>{t("register")}</span>
              <Link
                href="/register"
                className="ml-1 font-bold hover:text-primary"
              >
                {t("registerButton")}
              </Link>
            </p>
            <p className="mt-4 text-center text-xs text-gray-500">
              {t("terms")}
              <Link href="/terms" className="ml-1 font-bold hover:text-primary">
                {t("termsLink")}
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

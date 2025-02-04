"use client";

import { GoogleIcon } from "@/assets/icons";
import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import Bg from "@/assets/images/login/singin.webp";
import { useLogin } from "@/hooks/use-login";
import { useRegister } from "@/hooks/use-register";
import {
  CreateClientsSchema,
  CreateClientInputSchema,
  ClientSchema,
} from "@/schemas/client/createClientsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React, { startTransition } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DatePickerWithYearNavigation from "@/components/ui/year-selector";

export default function AuthComponent() {
  const { googleLogin } = useLogin();
  const { onCreateClient } = useRegister();

  const form = useForm<CreateClientsSchema>({
    resolver: zodResolver(ClientSchema()),
    defaultValues: {
      name: "",
      firstName: "",
      email: "",
      password: "",
      phone: "",
      birthDate: undefined,
      terms: false,
    },
  });
  function onSubmit(input: CreateClientsSchema) {
    const { name, firstName, ...filteredInput } = input;
    const combinedName = `${name} ${firstName}`;
    const apiInput: CreateClientInputSchema = {
      ...filteredInput,
      name: combinedName,
      birthDate: input.birthDate,
    };
    startTransition(async () => {
      await onCreateClient(apiInput);
    });
  }

  const t = useTranslations("register");

  return (
    <div className="grid h-full grid-cols-1 overflow-hidden rounded-3xl bg-white font-nunito md:grid-cols-2">
      {/* Formulario */}
      <div className="flex flex-col items-end justify-end p-0 sm:p-10">
        <div className="flex h-full w-full items-center justify-center">
          <Card className="w-full max-w-[35rem] border-none shadow-none">
            <CardHeader className="mb-10 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-center text-3xl font-bold"
              >
                <p className="text-5xl font-bold">{t("title")}</p>
                <span className="inline-flex justify-center gap-1 text-2xl">
                  {t("subtitle")} <h1 className="text-primary"> Chaqchao</h1>
                </span>
              </motion.div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            {t("name")} <span className="text-rose-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder={t("placeholderName")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            {t("lastName")}{" "}
                            <span className="text-rose-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder={t("placeholderLast")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            {t("email")}{" "}
                            <span className="text-rose-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              placeholder={t("placeholderEmail")}
                              {...field}
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
                    transition={{ delay: 0.1 }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="inline-flex items-center justify-center gap-2 font-bold">
                            {t("password")}{" "}
                            <span className="text-rose-500">*</span>
                            <Tooltip>
                              <TooltipTrigger tabIndex={-1}>
                                <Badge
                                  className="aspect-square cursor-help rounded-full"
                                  variant="outline"
                                >
                                  ?
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent
                                className="z-50 bg-white font-normal"
                                align="start"
                              >
                                {t("tooltip.description")}{" "}
                                <ul className="flex flex-col gap-2">
                                  <li className="inline-flex items-center gap-2 font-bold">
                                    <Check className="size-4 text-emerald-500" />
                                    {t("tooltip.upper")}
                                  </li>
                                  <li className="inline-flex items-center gap-2 font-bold">
                                    <Check className="size-4 text-emerald-500" />
                                    {t("tooltip.lower")}
                                  </li>
                                  <li className="inline-flex items-center gap-2 font-bold">
                                    <Check className="size-4 text-emerald-500" />
                                    {t("tooltip.number")}
                                  </li>
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </FormLabel>
                          <FormControl>
                            <InputPassword
                              placeholder={t("placeholderPassword")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">
                              {t("phone")}{" "}
                              <span className="text-rose-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <PhoneInput
                                autoComplete="off"
                                defaultCountry="PE"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold">
                              {t("birthdate")}
                            </FormLabel>
                            <FormControl className="flex">
                              <DatePickerWithYearNavigation
                                selectedDate={field.value}
                                onDateChange={field.onChange}
                                className="w-full font-nunito"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="inline-flex items-center space-x-2 text-xs">
                              <Checkbox
                                id="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <label htmlFor="terms">
                                {t("terms")}{" "}
                                <Link
                                  href="/terms"
                                  className="font-bold hover:text-primary"
                                  tabIndex={-1}
                                >
                                  {t("termsLink")}
                                </Link>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button className="w-full rounded-full py-6 text-lg text-white transition duration-300 hover:scale-105">
                      {t("button")}
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
                <Separator
                  orientation="horizontal"
                  className="w-16 opacity-45"
                />
                O
                <Separator
                  orientation="horizontal"
                  className="w-16 opacity-45"
                />
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
                >
                  <GoogleIcon />
                  {t("google")}
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="mt-4 text-center text-sm">
                  <span>{t("login")}</span>
                  <Link
                    href="/sign-in"
                    className="ml-1 font-bold hover:text-primary"
                  >
                    {t("loginButton")}
                  </Link>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="relative hidden h-full items-start overflow-hidden rounded-3xl bg-primary p-6 text-white [view-transition-name:_signin] md:flex">
        <Image
          src={Bg}
          alt="chaqchao factory"
          fill
          className="absolute inset-0 z-[-1] object-cover object-center opacity-50"
        />
        <div className="inline-flex w-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/sign-in"
              className="rounded-full border border-white bg-transparent px-10 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-secondary"
            >
              {t("loginButton")}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/">
              <ChaqchaoLogo className="w-32" fill="white" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

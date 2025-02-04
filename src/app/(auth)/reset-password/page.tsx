"use client";

import { useResetPassword } from "@/hooks/use-reset-password";
import {
  resetPassword,
  ResetPasswordSchema,
} from "@/schemas/client/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClockAlert, RectangleEllipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import PulsatingDots from "@/components/common/PulsatingDots";
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

import { decodeToken } from "@/lib/jwt/decodeToken";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const ex = useTranslations("token-expired");
  const t = useTranslations("reset-password");
  const [isExpired, setIsExpired] = useState(false);
  const [validToken, setValidToken] = useState(false);

  const { onResetPassword, isSuccessResetPassword, isLoadingResetPassword } =
    useResetPassword();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = (values: ResetPasswordSchema) => {
    if (token) {
      onResetPassword({ token, ...values });
    }
  };

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        const decodedToken = decodeToken(token as string);
        if (decodedToken) {
          const currentTime = Math.floor(Date.now() / 1000);
          const expirationTime = decodedToken.exp;

          if (expirationTime && currentTime > expirationTime) {
            setIsExpired(true);
          } else {
            setValidToken(true);

            // Configurar un temporizador para cambiar el estado cuando el token expire
            if (expirationTime) {
              const timeLeft = expirationTime - currentTime;
              const timeoutId = setTimeout(() => {
                setIsExpired(true);
                setValidToken(false);
              }, timeLeft * 1000);

              // Limpiar el timeout si el componente se desmonta o si el token cambia
              return () => clearTimeout(timeoutId);
            }
          }
        }
      }
    };

    checkToken();
  }, [token]);

  useEffect(() => {
    if (isSuccessResetPassword) {
      form.reset();
    }
  }, [isSuccessResetPassword, form]);

  if (!token)
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <PulsatingDots />
      </div>
    );

  if (isExpired) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Card className="w-fit border-none shadow-none">
          <CardHeader className="space-y-6 text-center">
            <div className="mx-auto rounded-full bg-rose-500/10 p-4">
              <ClockAlert size={48} className="text-rose-500" />
            </div>
            <CardTitle className="text-rose-500">{ex("title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="mt-2 text-rose-500">
              {ex("description")}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!validToken)
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <PulsatingDots />
      </div>
    );

  return (
    <>
      <div className="relative inline-flex h-full min-h-screen w-full items-center justify-center">
        <Card className="w-[350px] border-none shadow-none">
          <CardHeader className="space-y-6 text-center">
            <div className="mx-auto rounded-full bg-secondary/10 p-4">
              <RectangleEllipsis size={48} className="text-secondary" />
            </div>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleResetPassword)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("newPassword")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{t("description")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirmPassword")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="rounded-full text-lg"
                  disabled={isLoadingResetPassword}
                >
                  {isLoadingResetPassword ? t("loading") : t("button")}
                </Button>
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

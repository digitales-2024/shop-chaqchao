"use client";

import { useResetPassword } from "@/hooks/use-reset-password";
import {
  resetPassword,
  ResetPasswordSchema,
} from "@/schemas/client/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

  if (!token) return <p>Loading...</p>;

  if (isExpired) {
    return (
      <div>
        <p>Your token has expired. Please request a new password reset link.</p>
      </div>
    );
  }

  if (!validToken) return <p>Loading...</p>;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Restablecer Contraseña</CardTitle>
        <CardDescription>Ingresa tu nueva contraseña.</CardDescription>
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
                  <FormLabel>Nueva Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription>
                    Mínimo 8 caracteres, incluyendo mayúsculas, minúsculas y
                    números.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoadingResetPassword}>
              {isLoadingResetPassword
                ? "Restableciendo..."
                : "Restablecer Contraseña"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

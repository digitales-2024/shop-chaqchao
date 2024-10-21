"use client";
import { useForgotPassword } from "@/hooks/use-forgot-password";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/schemas/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  const [message, setMessage] = useState("");

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
      setMessage(
        "Se ha enviado un correo con instrucciones para recuperar tu contraseña.",
      );
      form.reset();
    }
  }

  return (
    <div className="grid h-screen grid-cols-1 items-center justify-items-center">
      <Card className="w-2/4">
        <CardHeader>
          <CardTitle>Recuperar Contraseña</CardTitle>
          <CardDescription>
            Te enviaremos un correo electrónico a tu bandeja de entrada sobre
            cómo restablecer tu contraseña. Recuerda revisar tu carpeta de spam.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="tu@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ingresa el correo asociado a tu cuenta.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Recuperar Contraseña</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {message && <p className="text-sm text-green-600">{message}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}

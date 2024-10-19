"use client";

import { useLogin } from "@/hooks/use-login";
import { useRegister } from "@/hooks/use-register";
import {
  clientSchema,
  CreateClientsSchema,
  CreateClientInputSchema,
} from "@/schemas/client/createClientsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { startTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { PhoneInput } from "@/components/ui/phone-input";

export default function RegisterPage() {
  const { googleLogin } = useLogin();
  const { onCreateClient } = useRegister();

  const form = useForm<CreateClientsSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: "",
      firstName: "",
      email: "",
      password: "",
      phone: "",
      birthDate: "",
      terms: false,
    },
  });

  // Función para manejar el envío del formulario
  function onSubmit(input: CreateClientsSchema) {
    const { name, firstName, ...filteredInput } = input;
    const combinedName = `${name} ${firstName}`;
    const apiInput: CreateClientInputSchema = {
      ...filteredInput,
      name: combinedName,
    };
    startTransition(async () => {
      await onCreateClient(apiInput);
    });
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-center text-xl font-bold">REGISTRARSE</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primer Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Primer Nombre"
                        {...field}
                        className="rounded border p-2"
                        required
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
                    <FormLabel>Primer Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Primer Apellido"
                        {...field}
                        className="rounded border p-2"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Correo Electrónico"
                        {...field}
                        className="w-full rounded border p-2"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        {...field}
                        className="w-full rounded border p-2"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <PhoneInput defaultCountry="PE" {...field} />
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
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="rounded border p-2"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="ml-2">
                      Declaro que acepto los{" "}
                      <Link href="/terms" className="text-blue-600">
                        Términos y Políticas de Privacidad
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="mb-4 w-full rounded-lg bg-[#5a2d0c] py-2 text-white hover:bg-[#4a2409]"
              >
                REGISTRARSE
              </Button>
            </div>
          </form>
        </Form>
        <div className="my-4 text-center">O</div>
        <div className="flex justify-center">
          <Button
            className="flex w-full items-center justify-center rounded-lg border py-2 hover:shadow-md"
            onClick={googleLogin}
          >
            Continuar con Google
          </Button>
        </div>
      </div>
    </div>
  );
}

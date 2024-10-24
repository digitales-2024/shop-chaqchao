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
import { GoogleIcon } from "@/assets/icons";
import { Card, CardContent } from "@/components/ui/card";
import DatePickerWithYearNavigation from "@/components/ui/year-selector";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export default function AuthComponent() {
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
    <div className="grid h-screen grid-cols-1 bg-gray-100 md:grid-cols-2">
      {/* Formulario */}
      <div className="flex h-full items-center justify-center p-8">
        <Card>
          <CardContent>
            <h2 className="mb-6 pt-6 text-center text-xl font-bold text-secondary">
              REGISTRARSE
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Nombre <span className="text-rose-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese su nombre" {...field} />
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
                          Apellidos <span className="text-rose-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ingrese sus apellidos"
                            {...field}
                          />
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
                      <FormLabel className="font-bold">
                        Correo Electrónico{" "}
                        <span className="text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="off"
                          placeholder="Ingrese su correo electrónico"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        Contraseña <span className="text-rose-500">*</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge className="border-xl rounded-md bg-transparent text-slate-500 hover:scale-105 hover:bg-transparent">
                              ?
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            La contraseña debe tener al menos una mayúscula, una
                            minúscula y un número.
                          </TooltipContent>
                        </Tooltip>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="off"
                          placeholder="Ingrese su contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Celular <span className="text-rose-500">*</span>
                        </FormLabel>
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
                    render={({}) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Fecha de cumpleaños
                        </FormLabel>
                        <FormControl className="flex">
                          <DatePickerWithYearNavigation />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Declaro que acepto los{" "}
                          <Link
                            href="/terms"
                            className="text-[#5a2d0c] hover:underline"
                          >
                            Términos y Políticas de Privacidad
                          </Link>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#5a2d0c] text-white hover:bg-secondary"
                >
                  REGISTRARSE
                </Button>
              </form>
            </Form>
            <div className="my-4 text-center">O</div>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center"
              onClick={googleLogin}
            >
              <GoogleIcon />
              Continuar con Google
            </Button>
            <p className="mt-4 text-center text-sm">
              <Link href="/sign-in" className="text-[#5a2d0c] hover:underline">
                ¿Ya tienes cuenta? Ingresa aquí
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mensaje "Hola, Amigo" se oculta en pantallas pequeñas */}
      <div className="hidden h-full bg-secondary text-white md:flex md:flex-col md:items-center md:justify-center">
        <h2 className="mb-4 text-3xl font-bold">¡Hola, Amigo!</h2>
        <p className="mb-8">
          Ingresa tus datos personales y comienza tu viaje con nosotros
        </p>
        <Link href="/sign-in">
          <Button className="rounded-full border border-white bg-transparent px-10 py-2 font-semibold text-white hover:bg-white hover:text-secondary">
            INGRESAR
          </Button>
        </Link>
      </div>
    </div>
  );
}

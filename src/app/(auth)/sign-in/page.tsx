"use client";

import { GoogleIcon } from "@/assets/icons";
import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import Bg from "@/assets/images/login/singin.webp";
import { useLogin } from "@/hooks/use-login";
import { authSchema } from "@/schemas/authSchema";
import { Credentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { EyeIcon, EyeOff } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState } from "react";
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

export default function AuthCards() {
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, googleLogin, isLoading } = useLogin();

  const form = useForm<Credentials>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="grid h-screen grid-cols-1 p-2 md:grid-cols-2">
      {/* Mensaje a la izquierda (oculto en pantallas pequeñas) */}
      <div className="relative hidden h-full items-start justify-start overflow-hidden rounded-3xl bg-secondary p-6 [view-transition-name:_signin] md:flex">
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
            transition={{ delay: 0.2 }}
          >
            <Link href="/">
              <ChaqchaoLogo className="w-32" fill="white" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/register"
              className="rounded-full border border-white bg-transparent px-10 py-2 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-secondary"
            >
              REGISTRARSE
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Formulario a la derecha */}
      <div className="flex h-full items-center justify-center p-8">
        <Card>
          <CardHeader>
            <h2 className="mb-6 text-center text-xl font-bold text-secondary">
              INGRESAR
            </h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onLogin)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="email">
                        Correo Electrónico
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold" htmlFor="password">
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <div className="relative mb-4">
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="*********"
                              {...field}
                              className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                            {showPassword ? (
                              <EyeOff
                                className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-slate-500"
                                onClick={togglePasswordVisibility}
                                size={20}
                              />
                            ) : (
                              <EyeIcon
                                className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-slate-500"
                                onClick={togglePasswordVisibility}
                                size={20}
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mb-6 flex justify-between">
                  <p className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="ml-1 text-[#5a2d0c] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </p>
                </div>

                <Button
                  className="mb-4 w-full rounded-lg bg-secondary py-2 text-white hover:bg-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? "Cargando..." : "INGRESAR"}
                </Button>
              </form>
            </Form>
            <p className="mb-4 text-center text-gray-500">O</p>
            <Button
              variant="outline"
              className="flex w-full items-center justify-center rounded-lg border bg-white py-2 hover:shadow-md"
              onClick={googleLogin}
              disabled={isLoading}
            >
              <GoogleIcon />
              Continuar con Google
            </Button>
            <p className="mt-4 text-center text-sm">
              <Link
                href="/register"
                className="ml-1 text-[#5a2d0c] hover:underline"
              >
                ¿No tienes cuenta? Regístrate aquí
              </Link>
            </p>
            <p className="mt-4 text-center text-xs text-gray-500">
              Al dar en ingresar, declaro que acepto los
              <Link
                href="/terms"
                className="ml-1 text-[#5a2d0c] hover:underline"
              >
                Términos y Políticas de Privacidad
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

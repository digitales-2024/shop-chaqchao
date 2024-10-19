"use client";
import { useLogin } from "@/hooks/use-login";
import { authSchema } from "@/schemas/authSchema";
import { Credentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, googleLogin, isLoading } = useLogin();

  // Initialize the form with default values
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
    <div className="grid h-screen grid-cols-2 items-center justify-items-center">
      {/* Login Box */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">INGRESAR</h2>

        <Form {...form}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">CORREO ELECTRÓNICO</FormLabel>
                <FormControl>
                  <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                    className="mb-4 w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">CONTRASEÑA</FormLabel>
                <FormControl>
                  <div className="relative mb-4">
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        {...field}
                        className="w-full rounded-lg border bg-slate-100 px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-slate-500"
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

          {/* Remember Checkbox */}
          <div className="mb-6 flex justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">
                Recordar
              </label>
            </div>
            <p className="text-sm">
              <a
                href="/forgot-password"
                className="ml-1 text-[#5a2d0c] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </p>
          </div>

          {/* Login Button */}
          <Button
            type="button"
            className="mb-4 w-full rounded-lg bg-[#5a2d0c] py-2 text-white hover:bg-[#4a2409]"
            disabled={isLoading}
            onClick={form.handleSubmit(onLogin)}
          >
            {isLoading ? "Cargando..." : "INGRESAR"}
          </Button>
        </Form>

        <p className="mb-4 text-center text-gray-500">O</p>

        {/* Google Sign In Button */}
        <Button
          className="flex w-full items-center justify-center rounded-lg border py-2 hover:shadow-md"
          onClick={googleLogin}
          disabled={isLoading}
        >
          Continuar con Google
        </Button>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm">
          <Link
            href="/register"
            className="ml-1 text-[#5a2d0c] hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </p>

        {/* Terms and Privacy */}
        <p className="mt-4 text-center text-xs text-gray-500">
          Al dar en ingresar, declaro que acepto los
          <a href="/terms" className="ml-1 text-[#5a2d0c] hover:underline">
            Términos y Políticas de Privacidad
          </a>
        </p>
      </div>
    </div>
  );
}

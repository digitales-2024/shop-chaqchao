"use client";
import { useLogin } from "@/hooks/use-login";
import { authSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the type for the form data
type Credentials = z.infer<typeof authSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(authSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: Credentials) => {
    try {
      await onLogin(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="grid h-screen grid-cols-2 items-center justify-items-center">
      {/* Login Box */}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold">INGRESAR</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <label className="mb-1 block text-sm font-medium">
            CORREO ELECTRÓNICO
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="mb-4 w-full rounded-lg border bg-slate-100 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}

          {/* Password Field */}
          <label className="mb-1 block text-sm font-medium">CONTRASEÑA</label>
          <div className="relative mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                {...register("password")}
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

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
          <button
            type="submit"
            className="mb-4 w-full rounded-lg bg-[#5a2d0c] py-2 text-white hover:bg-[#4a2409]"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "INGRESAR"}
          </button>
        </form>

        <p className="mb-4 text-center text-gray-500">O</p>

        {/* Google Sign In Button */}
        <button className="flex w-full items-center justify-center rounded-lg border bg-white py-2 hover:shadow-md">
          Continuar con Google
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm">
          <a href="/register" className="ml-1 text-[#5a2d0c] hover:underline">
            ¿No tienes cuenta? Regístrate aquí
          </a>
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

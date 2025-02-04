"use client";
import { useLogoutMutation } from "@/redux/services/authApi";
import { CustomErrorData } from "@/types";
import { toast } from "sonner";

import { useAuth } from "./use-auth";
import { useCart } from "./use-cart";

export const useLogout = () => {
  const [logout, { isLoading, error }] = useLogoutMutation();
  const { clearClient } = useAuth();
  const { clearCart } = useCart();

  const signOut = async () => {
    const handleLogout = async () => {
      const result = await logout();

      if (
        result.error &&
        typeof result.error === "object" &&
        "data" in result.error
      ) {
        const errorMessage = (result.error.data as CustomErrorData).message;
        throw new Error(errorMessage);
      }

      if (result.error) {
        throw new Error(
          "Ocurrió un error inesperado, por favor intenta de nuevo",
        );
      }

      clearClient();
      window.location.reload();
      return result;
    };

    clearCart();

    toast.promise(handleLogout(), {
      loading: "Cerrando sesión...",
      success: "Sesión cerrada correctamente",
      error: (error) => error.message,
    });
  };

  return { signOut, isLoading, error };
};

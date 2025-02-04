import { toast } from "sonner";

export const showToast = (
  message: string,
  type: "warning" | "error" | "success" | "info",
) => {
  toast.dismiss();
  toast[type](message, {
    duration: 3000,
    position: "top-right",
    richColors: true,
  });
};

// Validación de Emails
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Formatear el número de teléfono
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\+\d{2})(\d{9})/, "$1 $2");
};

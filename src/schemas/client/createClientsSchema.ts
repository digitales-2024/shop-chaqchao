import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  firstName: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  email: z
    .string()
    .email({ message: "Ingrese un correo electrónico válido" })
    .min(1, { message: "El correo electrónico es obligatorio" }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Número de teléfono no válido" }),
  password: z
    .string()
    .min(6, { message: "Debes generar una contraseña" })
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
    }),
  birthDate: z.date({
    required_error: "Ingrese la fecha de nacimiento",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debe aceptar los términos y condiciones",
  }),
});

export type CreateClientsSchema = z.infer<typeof clientSchema>;

// Nuevo tipo que excluye firstName y terms
export type CreateClientInputSchema = Omit<
  CreateClientsSchema,
  "firstName" | "terms"
>;

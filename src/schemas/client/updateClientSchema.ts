import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

export const clientsSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del cliente debe tener al menos 12342321 caracteres",
  }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Número de teléfono no válido" }),
});

export const updateClientsSchema = clientsSchema.partial().extend({
  id: z.string().optional(),
  birthDate: z.date().optional(), // Acepta null y opcional
});

export type UpdateClientsSchema = z.infer<typeof updateClientsSchema>;

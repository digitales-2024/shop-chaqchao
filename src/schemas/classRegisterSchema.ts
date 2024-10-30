import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

export const classSchema = z.object({
  userName: z.string().min(2, { message: "El nombre es obligatorio" }),
  userEmail: z
    .string()
    .email({ message: "Ingrese un correo electrónico válido" })
    .min(1, { message: "El correo electrónico es obligatorio" }),
  userPhone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Número de teléfono no válido" }),
  scheduleClass: z.string().min(1, { message: "Debes seleccionar un horario" }),
  languageClass: z.string().min(1, { message: "Debes seleccionar un idioma" }),
  dateClass: z.string().min(1, { message: "Debes seleccionar una fecha" }),
  totalAdults: z
    .number()
    .min(1, { message: "Debes inscribir al menos un adulto" }),
  totalChildren: z
    .number()
    .min(0, { message: "El número de niños no puede ser negativo" }),
  typeCurrency: z.string().min(1, { message: "Debes seleccionar una moneda" }),
  comments: z.string().optional(),
});

export type CreateClassSchema = z.infer<typeof classSchema>;

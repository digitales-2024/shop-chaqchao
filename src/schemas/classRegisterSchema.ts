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
  paypalOrderId: z.string().optional(),
  paypalOrderStatus: z.string().optional(),
  paypalAmount: z.string().optional(),
  paypalCurrency: z.string().optional(),
  paypalDate: z.string().optional(),
});

export interface RegisterClassResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    totalParticipants: number;
    totalAdults: number;
    totalChildren: number;
    totalPrice: number;
    totalPriceAdults: number;
    totalPriceChildren: number;
    languageClass: string;
    typeCurrency: string;
    scheduleClass: string;
    dateClass: string;
    comments: string;
    status: string;
  };
}

export type CreateClassSchema = z.infer<typeof classSchema>;

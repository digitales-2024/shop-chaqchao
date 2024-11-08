import { useTranslations } from "next-intl";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

export const ClientSchema = () => {
  const t = useTranslations("errors");

  return z.object({
    name: z.string().min(1, { message: t("name.minlength") }),
    firstName: z.string().min(1, { message: t("lastName.minlength") }),
    email: z
      .string()
      .email({ message: t("email.email") })
      .min(1, { message: t("email.minlength") }),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: t("phone.required") }),
    password: z
      .string()
      .min(6, { message: t("password.minlength") })
      .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: t("password.regex"),
      }),
    birthDate: z
      .date({
        required_error: "Ingrese la fecha de nacimiento",
      })
      .optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: t("terms.required"),
    }),
  });
};

export type CreateClientsSchema = z.infer<ReturnType<typeof ClientSchema>>;

// Nuevo tipo que excluye firstName y terms
export type CreateClientInputSchema = Omit<
  CreateClientsSchema,
  "firstName" | "terms"
>;

import * as z from "zod";

export const resetPassword = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres.",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "La contraseña debe contener al menos una letra minúscula, una mayúscula y un número.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPassword>;

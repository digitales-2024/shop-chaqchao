import { useTranslations } from "next-intl";
import { z } from "zod";

export const AuthSchema = () => {
  const t = useTranslations("errors");
  return z.object({
    email: z
      .string()
      .min(1, {
        message: t("email.email"),
      })
      .email({
        message: t("email.email"),
      }),
    password: z.string().min(1, {
      message: t("password.password"),
    }),
  });
};

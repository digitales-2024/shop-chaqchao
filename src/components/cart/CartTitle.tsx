import { useTranslations } from "next-intl";

export const CartTitle = () => {
  const t = useTranslations("cart");

  return <h1 className="text-center text-5xl font-bold">{t("title")}</h1>;
};

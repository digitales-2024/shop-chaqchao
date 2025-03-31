import { useTranslations } from "next-intl";
import React from "react";

export const WorkshopInfo: React.FC = () => {
  const t = useTranslations("class.info");

  return (
    <div className="relative z-10 flex h-full flex-col gap-6 bg-transparent p-6 sm:p-8">
      {/* Encabezado */}
      <div className="text-start">
        <h3 className="font-riddle text-8xl font-bold text-gray-800">
          {t("title")}
        </h3>
        <h2 className="font-riddle text-7xl font-bold text-gray-800">
          {t("subtitle")}
        </h2>
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-4">
        <p>{t("description.text1")}</p>
        <p>{t("description.text2")}</p>
        <p>{t("description.text3")}</p>
      </div>

      <div className="space-y-3 bg-secondary-foreground p-4">
        <h3 className="font-black">{t("learn.title")}</h3>
        <ul className="ml-4 list-disc">
          <li>{t("learn.learn1")}</li>
          <li>{t("learn.learn2")}</li>
          <li>{t("learn.learn3")}</li>
          <li>{t("learn.learn4")}</li>
        </ul>
      </div>
      <div className="space-y-3 bg-secondary-foreground p-4">
        <h3 className="font-black">{t("important.title")}</h3>
        <ul className="ml-4 list-disc">
          <li>{t("important.important1")}</li>
          <li>{t("important.important2")}</li>
          <li>{t("important.important3")}</li>
          <li>{t("important.important4")}</li>
        </ul>
      </div>
    </div>
  );
};

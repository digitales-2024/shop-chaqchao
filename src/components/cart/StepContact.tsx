import { useProfile } from "@/hooks/use-profile";
import { useTranslations } from "next-intl";

import PulsatingDots from "../common/PulsatingDots";
import { Separator } from "../ui/separator";
import { DialogLogin } from "./DialogLogin";
import { FormContact } from "./FormContact";

export const StepContact = () => {
  const { clientData, isLoading } = useProfile();

  const t = useTranslations("checkout.contact");

  return (
    <div className="space-y-4">
      {isLoading ? (
        <PulsatingDots />
      ) : (
        !clientData && (
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-lg font-bold">{t("account.title")}</h3>
            <p className="text-sm">{t("account.description")} </p>
            <DialogLogin />
          </div>
        )
      )}
      <Separator />
      <div>
        <h2 className="text-lg font-bold">{t("title")}</h2>
        <p className="text-sm">{t("description")}</p>
      </div>
      <FormContact />
    </div>
  );
};

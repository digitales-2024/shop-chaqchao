import { useTranslations } from "next-intl";

import { ProfileForm } from "@/components/account/ProfileForm";
import { Separator } from "@/components/ui/separator";

export default function PageAccount() {
  const t = useTranslations("account.profile");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

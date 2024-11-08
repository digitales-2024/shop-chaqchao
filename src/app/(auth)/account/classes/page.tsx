import { useTranslations } from "next-intl";
import { cookies } from "next/headers";

import { ClassesClient } from "@/components/classes/ClassesClient";
import { Separator } from "@/components/ui/separator";

export default function PageClasses() {
  const layout = cookies().get("react-resizable-panels:layout:classes");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const t = useTranslations("account.classes");
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
      <Separator />
      <ClassesClient defaultLayout={defaultLayout} />
    </div>
  );
}

import useCartDetail from "@/hooks/use-cart-detail";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export const StepSomeonePickup = () => {
  const { handleStepComplete, setActiveStep, setSomeonePickup, someonePickup } =
    useCartDetail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSomeonePickup(someonePickup);

    handleStepComplete(3);
    setActiveStep(-1);
  };

  const t = useTranslations("checkout.someone");

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="recoge-otra-persona"
              className="flex flex-col space-y-1"
            >
              <span>{t("quest")}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {someonePickup ? t("yes") : t("no")}
              </span>
            </Label>
            <Switch
              id="recoge-otra-persona"
              checked={someonePickup}
              onCheckedChange={setSomeonePickup}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {t("button")}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useTranslations } from "next-intl";
import { ButtonSelect } from "../ui/button-select";
import { useLanguages } from "@/hooks/use-languages";
import PulsatingDots from "../common/PulsatingDots";

export function AdditionalInfoForm() {
  const { control } = useFormContext();

  const t = useTranslations();

  const occasionOptions = [
    {
      label: t("class.steps.additional.form.occasion.options.tourism"),
      value: "tourism",
    },
    {
      label: t("class.steps.additional.form.occasion.options.birthday"),
      value: "birthday",
    },
    {
      label: t("class.steps.additional.form.occasion.options.anniversary"),
      value: "anniversary",
    },
    {
      label: t("class.steps.additional.form.occasion.options.other"),
      value: "other",
    },
  ];

  const allergyOptions = [
    {
      label: t("class.steps.additional.form.restrictions.options.dairyFree"),
      value: "milk",
    },
    {
      label: t("class.steps.additional.form.restrictions.options.glutenFree"),
      value: "gluten",
    },
    {
      label: t("class.steps.additional.form.restrictions.options.sojaFree"),
      value: "soja",
    },
    {
      label: t("class.steps.additional.form.restrictions.options.other"),
      value: "other",
    },
  ];

  const { isLoading, languageOptions } = useLanguages();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          {t("class.steps.additional.description")}
        </p>
      </div>
      <div className="space-y-4">
        <FormField
          control={control}
          name="additional.language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("class.steps.additional.form.language.label")}
              </FormLabel>
              <FormControl>
                {isLoading ? (
                  <PulsatingDots />
                ) : (
                  <ButtonSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={languageOptions}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additional.occasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("class.steps.additional.form.occasion.label")}
              </FormLabel>
              <FormControl>
                <ButtonSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={occasionOptions}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additional.restrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("class.steps.additional.form.restrictions.label")}
              </FormLabel>
              <FormControl>
                <>
                  <ButtonSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={allergyOptions}
                  />
                  <Textarea value={field.value} onChange={field.onChange} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="additional.comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("class.steps.additional.form.comments.label")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t(
                    "class.steps.additional.form.comments.placeholder",
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

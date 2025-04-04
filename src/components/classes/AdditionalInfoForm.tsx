import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { ButtonSelect } from "../ui/button-select";

const TextareaAutosize = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        adjustHeight();
      }}
      placeholder={placeholder}
      rows={1}
    />
  );
};

export function AdditionalInfoForm() {
  const { control } = useFormContext();
  const t = useTranslations();

  const restrictionOptions = [
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
          name="additional.allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("class.steps.additional.form.restrictions.label")}
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <ButtonSelect
                    value={
                      restrictionOptions.some(
                        (opt) => opt.value === field.value,
                      )
                        ? field.value
                        : "other"
                    }
                    onChange={(value) => {
                      field.onChange(value === "other" ? "" : value);
                    }}
                    options={restrictionOptions}
                  />
                  {(!restrictionOptions.some(
                    (opt) => opt.value === field.value,
                  ) ||
                    field.value === "other") && (
                    <TextareaAutosize
                      placeholder={t(
                        "class.steps.additional.form.restrictions.options.other",
                      )}
                      value={
                        !restrictionOptions.some(
                          (opt) => opt.value === field.value,
                        )
                          ? field.value
                          : ""
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                </div>
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
                <TextareaAutosize
                  placeholder={t(
                    "class.steps.additional.form.comments.placeholder",
                  )}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
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

import { useLanguages } from "@/hooks/use-languages";
import { useReservation } from "@/hooks/use-reservation";
import { useClassByDateMutation } from "@/redux/services/classApi";
import { ClassesDataAdmin, TypeClass } from "@/types/classes";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import PulsatingDots from "../common/PulsatingDots";
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
  const { control, setValue } = useFormContext();
  const t = useTranslations();

  const { isLoading, languageOptions } = useLanguages();
  const [findClass, { isLoading: isLoadingClass }] = useClassByDateMutation();
  const { reservation, setReservation } = useReservation();
  const [classData, setClassData] = useState<ClassesDataAdmin | null>(null);

  useEffect(() => {
    const existClass = async () => {
      if (reservation?.scheduleClass && reservation?.dateClass) {
        const classResponse = await findClass({
          typeClass: "NORMAL" as TypeClass,
          schedule: reservation.scheduleClass,
          date: format(reservation.dateClass, "dd-MM-yyyy"),
        });

        if (classResponse.data) {
          setClassData(classResponse.data);
          setReservation({
            ...reservation,
            languageClass: classResponse.data.languageClass,
          });
          // Actualizar el valor del campo del formulario
          setValue("additional.language", classResponse.data.languageClass);
        } else {
          setClassData(null);
        }
      }
    };

    existClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservation.scheduleClass, reservation.dateClass]);

  const [languageOptionsDisabled, setLanguageOptionsDisabled] =
    useState(languageOptions);
  useEffect(() => {
    if (languageOptions) {
      if (
        reservation?.languageClass &&
        classData &&
        classData?.totalParticipants > 0
      ) {
        // Si hay participantes, bloquear todas las opciones
        setLanguageOptionsDisabled(
          languageOptions.map((option) => ({
            ...option,
            disabled: true,
          })),
        );
      } else {
        // Si no hay participantes o no existe clase, habilitar las opciones
        setLanguageOptionsDisabled(languageOptions);
      }
    }
  }, [languageOptions, classData, reservation?.languageClass]);

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
          name="additional.language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("class.steps.additional.form.language.label")}
              </FormLabel>
              <FormControl>
                {isLoading || isLoadingClass ? (
                  <PulsatingDots />
                ) : (
                  <ButtonSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={languageOptionsDisabled}
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
                <div className="space-y-2">
                  <ButtonSelect
                    value={
                      occasionOptions.some((opt) => opt.value === field.value)
                        ? field.value
                        : "other"
                    }
                    onChange={(value) => {
                      if (value !== "other") {
                        field.onChange(value);
                      }
                    }}
                    options={occasionOptions}
                  />
                  {(!occasionOptions.some((opt) => opt.value === field.value) ||
                    field.value === "other") && (
                    <TextareaAutosize
                      placeholder={t(
                        "class.steps.additional.form.occasion.options.other",
                      )}
                      value={
                        !occasionOptions.some(
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
                      if (value !== "other") {
                        field.onChange(value);
                      }
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

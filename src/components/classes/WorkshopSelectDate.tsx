import { PHONE_NUMBER } from "@/constants/info";
import { useLanguages } from "@/hooks/use-languages";
import { useReservation } from "@/hooks/use-reservation";
import {
  useClassByDateMutation,
  useCloseTimeQuery,
  useDeleteClassMutation,
  useGetClassesCapacityQuery,
  useGetClassesFuturesQuery,
  usePricesQuery,
  useSchedulesAdminQuery,
} from "@/redux/services/classApi";
import { ClassesDataAdmin } from "@/types";
import { TypeClass } from "@/types/classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMinutes, format, isSameDay, parse } from "date-fns";
import {
  Calendar as CalendarIcon,
  Info,
  Phone,
  UserRoundPen,
  UsersRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import PulsatingDots from "../common/PulsatingDots";
import { ButtonSelect, Option } from "../ui/button-select";
import Counter from "../ui/counter";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { TwoMonthCalendar } from "./TwoMonthCalendar";

export default function WorkshopSelectDate() {
  const { reservation, setReservation } = useReservation();
  const { data: closeTime, isLoading: isLoadingCloseTime } =
    useCloseTimeQuery();
  const { data: capacityNormal } = useGetClassesCapacityQuery({
    typeClass: "NORMAL" as TypeClass,
  });

  const [findClass] = useClassByDateMutation();

  const t = useTranslations("class.schedule");
  const formSchema = z.object({
    date: z.date({
      message: t("errorSelectDate"),
    }),
    schedule: z.string().min(1, {
      message: t("errorSelectSchedule"),
    }),
    adults: z.number(),
    children: z.number(),
    language: z.string().min(1, { message: t("language.error") }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: reservation.dateClass || undefined,
      schedule: reservation.scheduleClass || "",
      adults: capacityNormal?.minCapacity || 1,
      children: reservation.totalChildren || 0,
      language: reservation.languageClass || "",
    },
  });

  // Establecer el valor inicial de adults cuando se carga la capacidad
  useEffect(() => {
    if (capacityNormal && !classData && !form.watch("date")) {
      form.setValue("adults", capacityNormal.minCapacity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacityNormal]);
  const { isLoading, data: schedules } = useSchedulesAdminQuery();
  const [data, setData] = useState<Option[]>([]);
  const [counterMin, setCounterMin] = useState(1);
  const [open, setOpen] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  useEffect(() => {
    if (schedules?.NORMAL) {
      setData(
        schedules?.NORMAL.map((s) => {
          const selectedDate = form.watch("date");
          // Si no hay fecha seleccionada, mostrar horarios habilitados
          if (!selectedDate) {
            return {
              value: s.startTime,
              label: s.startTime,
              disabled: false,
            } as Option;
          }
          // Buscar si existe una clase para este horario solo si hay fecha seleccionada
          const existingClass = classFutures?.find(
            (cls) =>
              cls.scheduleClass === s.startTime &&
              format(new Date(cls.dateClass), "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd"),
          );
          return {
            value: s.startTime,
            label: s.startTime,
            // Solo aplicar la lógica de tiempo si es hoy
            disabled:
              isToday(selectedDate) &&
              compareTimes(
                s.startTime,
                (existingClass?.totalParticipants ?? 0) > 0,
              ),
          } as Option;
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules, form.watch("date")]);

  const [classData, setClassData] = useState<ClassesDataAdmin | undefined>();
  useEffect(() => {
    const fetchClassData = async () => {
      setClassData(undefined);
      if (!form.watch("date") || !form.watch("schedule")) {
        return;
      }
      const response = await findClass({
        date: format(form.watch("date"), "dd-MM-yyyy"),
        schedule: form.watch("schedule"),
        typeClass: "NORMAL" as TypeClass,
      }).unwrap();
      // eslint-disable-next-line react-hooks/exhaustive-deps

      setClassData(response);
    };

    fetchClassData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("date"), form.watch("schedule")]);

  useEffect(() => {
    if (!capacityNormal) return;

    const minCapacity = capacityNormal.minCapacity;
    const maxCapacity = capacityNormal.maxCapacity;

    let adults = form.watch("adults");
    let children = form.watch("children");
    // eslint-disable-next-line prefer-const
    let totalParticipants = adults + children;

    // Ajustar mínimo
    if (totalParticipants < minCapacity) {
      const diff = minCapacity - totalParticipants;
      adults += diff; // Asegurar que al menos se cumpla el mínimo
    }

    // Ajustar máximo
    if (totalParticipants > maxCapacity) {
      const diff = totalParticipants - maxCapacity;
      if (children >= diff) {
        children -= diff;
      } else {
        adults -= diff;
      }
    }

    setCounterMin(minCapacity);
    form.setValue("adults", adults);
    form.setValue("children", children);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacityNormal, form.watch("adults"), form.watch("children")]);

  const router = useRouter();

  const [deleteClass] = useDeleteClassMutation();

  useEffect(() => {
    const deleteClassCreated = async () => {
      if (reservation?.id) {
        await deleteClass(reservation?.id);
        setReservation({ ...reservation, id: "" });
      }
    };

    deleteClassCreated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("date"), form.watch("schedule")]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setReservation({
      dateClass: values.date,
      totalAdults: values.adults,
      totalChildren: values.children,
      scheduleClass: values.schedule,
      languageClass: values.language,
      totalPrice:
        values.adults *
          (prices?.find((p) => p.classTypeUser === "ADULT")?.price || 0) +
        values.children *
          (prices?.find((p) => p.classTypeUser === "CHILD")?.price || 0),
    });
    router.push("/workshops/reservation");
  };

  // Funcion para calcular si la fecha es hoy
  const isToday = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  // Función para comparar si un horario está cerrado según los intervalos definidos
  const compareTimes = (time1: string, hasParticipants = false) => {
    if (!closeTime) return true; // Si no hay closeTime, deshabilitar por defecto

    const timeSchedule = parse(time1, "HH:mm", new Date());
    const newTime = addMinutes(
      new Date(),
      closeTime.closeBeforeStartInterval ?? 0,
    );
    const newTimeFinal = addMinutes(
      new Date(),
      closeTime.finalRegistrationCloseInterval ?? 0,
    );

    // Si no hay participantes, usar intervalo final
    if (!hasParticipants) {
      return timeSchedule < newTimeFinal;
    }

    return timeSchedule < newTime;
  };

  const { data: classFutures, isLoading: isLoadingClassFutures } =
    useGetClassesFuturesQuery({
      typeClass: "NORMAL" as TypeClass,
    });

  // Actualizar cálculo de disabledDates para que un día se considere cerrado únicamente si para cada
  // horario definido en schedules.NORMAL existe una clase en ese día y está cerrada.
  const disabledDates = useMemo(() => {
    if (!classFutures || !schedules?.NORMAL) return [];
    const groups = classFutures.reduce(
      (acc, curr) => {
        const dateKey = format(new Date(curr.dateClass), "yyyy-MM-dd");
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(curr);
        return acc;
      },
      {} as Record<string, ClassesDataAdmin[]>,
    );
    return Object.keys(groups).filter((dateKey) =>
      schedules.NORMAL.every((sch) =>
        groups[dateKey].some(
          (cls) => cls.scheduleClass === sch.startTime && cls.isClosed,
        ),
      ),
    );
  }, [classFutures, schedules]);
  // Handler para el cambio de horario: verifica tiempo de cierre y estado cerrado
  const handleScheduleChange = (newSchedule: string) => {
    const selectedDate = form.getValues("date");
    if (!selectedDate) {
      form.setValue("schedule", newSchedule);
      setReservation({ scheduleClass: newSchedule });
      return;
    }

    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const classesForDate = classFutures?.filter(
      (cls) => format(new Date(cls.dateClass), "yyyy-MM-dd") === dateKey,
    );
    const selectedClass = classesForDate?.find(
      (cls) => cls.scheduleClass === newSchedule,
    );
    // Verificar si el horario está cerrado por tiempo (solo si es hoy)
    if (isToday(selectedDate)) {
      if (!closeTime) {
        toast.error("The schedules cannot be verified at this time");
        form.setValue("schedule", "");
        setReservation({ scheduleClass: "" });
        return;
      }
      if (
        compareTimes(newSchedule, (selectedClass?.totalParticipants ?? 0) > 0)
      ) {
        const hasParticipants = (selectedClass?.totalParticipants ?? 0) > 0;
        const minutes = hasParticipants
          ? closeTime.closeBeforeStartInterval
          : closeTime.finalRegistrationCloseInterval;
        toast.error(
          `Registrations for this time are not allowed. You must register at least ${minutes} minutes in advance.`,
        );
        form.setValue("schedule", "");
        setReservation({ scheduleClass: "" });
        return;
      }
    }

    // Verificar si la clase está marcada como cerrada (para cualquier fecha)
    if (selectedClass?.isClosed) {
      toast.error("The selected time is closed. Please choose another date.");
      form.setValue("schedule", "");
      setReservation({ scheduleClass: "" });
      return;
    }

    form.setValue("schedule", newSchedule);
    setReservation({ scheduleClass: newSchedule });
  };

  const { data: prices, isLoading: isLoadingPrices } = usePricesQuery({
    typeCurrency: "USD",
    typeClass: "NORMAL",
  });

  useEffect(() => {
    // Limpiar schedule y classData cuando cambie la fecha
    if (form.getValues("date")) {
      form.setValue("schedule", "");
      form.setValue("language", "");
      setShowRecommendation(false);
      setClassData(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("date")]);

  // Reset classData cuando cambie el schedule
  useEffect(() => {
    if (form.watch("schedule")) {
      setClassData(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("schedule")]);

  const { isLoading: isLoadingLanguages, languageOptions } = useLanguages();

  const [existingClass, setExistingClass] = useState<boolean>(false);

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
          form.setValue("language", classResponse.data.languageClass);
          setExistingClass(true);
        } else {
          setClassData(undefined);
          setReservation({
            ...reservation,
            languageClass: "",
          });
          // Actualizar el valor del campo del formulario
          form.setValue("language", "");
          setExistingClass(false);
        }
      }
    };

    existClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("schedule"), form.watch("date")]);

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

  return (
    <Card className="m-2 border-none shadow">
      <CardHeader>
        <CardTitle className="font-bold">{t("title")}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-5"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("selectDate")}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "mx-auto w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>{t("pickDate")}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full sm:w-[40rem]">
                      {isLoadingClassFutures ? (
                        <PulsatingDots />
                      ) : (
                        <TwoMonthCalendar
                          value={field.value}
                          classes={classFutures}
                          onChange={(date) => {
                            field.onChange(date);
                            setOpen(false);
                            // Resetear la reservación pero mantener la nueva fecha
                            setReservation({
                              id: "",
                              typeClass: "NORMAL",
                              userName: "",
                              userEmail: "",
                              userPhone: "",
                              totalAdults: 1,
                              totalChildren: 0,
                              totalParticipants: 1,
                              totalPrice: 0,
                              totalPriceAdults: 0,
                              totalPriceChildren: 0,
                              languageClass: "",
                              dateClass: date,
                              scheduleClass: "",
                              comments: "",
                              allergies: "",
                              occasion: "",
                              typeCurrency: "USD",
                              methodPayment: "",
                            });
                          }}
                          disabledDates={disabledDates} // nueva prop para días bloqueados
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel></FormLabel>
                  <FormControl>
                    {isLoading || isLoadingCloseTime || !data || !closeTime ? (
                      <PulsatingDots />
                    ) : (
                      <ButtonSelect
                        value={field.value}
                        // Usar el handler para validar horario cerrado
                        onChange={handleScheduleChange}
                        options={data}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("language.label")}</FormLabel>
                  <FormControl>
                    {isLoadingLanguages || isLoadingLanguages ? (
                      <PulsatingDots />
                    ) : (
                      <ButtonSelect
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                          setShowRecommendation(
                            value === "español" && !classData,
                          );
                        }}
                        options={languageOptionsDisabled}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showRecommendation && !existingClass && (
              <Alert className="border-yellow-500 text-yellow-600">
                <Info className="stroke-yellow-500" />
                <AlertTitle>{t("language.recommended.title")}</AlertTitle>
                <AlertDescription>
                  {t("language.recommended.description")}
                  <a
                    href={`https://wa.me/+51${PHONE_NUMBER}`}
                    className="text-yellow-700 underline"
                  >
                    +51 {PHONE_NUMBER}
                  </a>
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-5">
              <h3 className="text-sm font-bold">{t("participants.title")}</h3>
              <ul className="space-y-4">
                <li className="grid grid-cols-2">
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {t("participants.adults")}
                    </span>
                    <span className="text-sm font-thin">
                      {t("participants.age")} 14 - 80
                    </span>
                    <span className="text-sm font-black">
                      {isLoadingPrices ? (
                        <Skeleton className="h-8 w-10" />
                      ) : (
                        `$${prices?.find((p) => p.classTypeUser === "ADULT")?.price || 0}`
                      )}
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Counter
                            name={field.name}
                            control={form.control}
                            min={counterMin}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </li>
                <li className="grid grid-cols-2">
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {t("participants.children")}
                    </span>
                    <span className="text-sm font-thin">
                      {t("participants.age")} 05 - 13
                    </span>
                    <span className="text-sm font-black">
                      {isLoadingPrices ? (
                        <Skeleton className="h-8 w-10" />
                      ) : (
                        `$${prices?.find((p) => p.classTypeUser === "CHILD")?.price || 0}`
                      )}
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                          <Counter
                            name={field.name}
                            control={form.control}
                            min={0}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </li>
              </ul>
            </div>
            <Button type="submit" className="w-full text-lg font-bold">
              {t("booknow")}
            </Button>
          </form>
        </Form>
        <Separator />
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-4">
          <h3 className="font-bold">{t("experience.title")}</h3>
          <div className="grid w-full grid-cols-[auto_1fr] gap-4 bg-secondary-foreground p-4 text-terciary">
            <UserRoundPen className="aspect-square shrink-0" />
            <div>
              <h4 className="font-black">{t("experience.private.title")}</h4>
              <p>{t("experience.private.description")}</p>

              <div className="mt-4 grid grid-cols-[0.3fr,1fr] gap-y-2">
                <h4 className="font-black">
                  {t("experience.private.capacity")}
                </h4>
                <span>{t("experience.info.capacity")}</span>

                <h4 className="mt-3 items-center font-black">
                  {t("experience.private.cost")}
                </h4>
                <div className="flex flex-col">
                  <span>{t("experience.info.costAdult")}</span>
                  <span>{t("experience.info.costChildren")}</span>
                </div>

                <h4 className="font-black">
                  {t("experience.private.location")}
                </h4>
                <span>{t("experience.info.location")}</span>

                <h4 className="font-black">{t("experience.private.time")}</h4>
                <span>{t("experience.info.time")}</span>

                <h4 className="font-black">
                  {t("experience.private.language")}
                </h4>
                <span>{t("experience.info.language")}</span>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-[auto_1fr] gap-4 bg-secondary-foreground p-4 text-terciary">
            <UsersRound />
            <div>
              <h4 className="font-black">{t("experience.group.title")}</h4>
              <p>{t("experience.group.description")}</p>

              <div className="mt-4 grid grid-cols-[0.3fr,1fr] gap-y-2">
                <h4 className="font-black">{t("experience.group.capacity")}</h4>
                <span>{t("experience.infogroup.capacity")}</span>

                <h4 className="mt-3 items-center font-black">
                  {t("experience.group.cost")}
                </h4>
                <div className="flex flex-col">
                  <span>{t("experience.infogroup.costAdult")}</span>
                  <span>{t("experience.infogroup.costChildren")}</span>
                </div>

                <h4 className="font-black">{t("experience.group.location")}</h4>
                <span>{t("experience.infogroup.location")}</span>

                <h4 className="font-black">{t("experience.group.time")}</h4>
                <span>{t("experience.infogroup.time")}</span>

                <h4 className="font-black">{t("experience.group.language")}</h4>
                <span>{t("experience.infogroup.language")}</span>
              </div>
            </div>
          </div>
          <p>{t("experience.contact")}</p>
          <a
            href={`https://wa.me/+51${PHONE_NUMBER}?text=Hello! I would like to get more information about chocolate workshops`}
            target="_blank"
            className="inline-flex w-full items-center justify-center gap-3 text-terciary"
          >
            <Phone />
            <span className="text-xl font-black">+51 {PHONE_NUMBER}</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

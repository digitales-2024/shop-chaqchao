import { useReservation } from "@/hooks/use-reservation";
import {
  useSchedulesAdminQuery,
  usePricesQuery,
  useGetClassesFuturesQuery,
  useGetClassesCapacityQuery,
  useClassByDateMutation,
  useDeleteClassMutation,
} from "@/redux/services/classApi";
import { ClassesDataAdmin, TypeClass } from "@/types/classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isSameDay } from "date-fns";
import {
  Phone,
  UserRoundPen,
  UsersRound,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: reservation.dateClass || undefined,
      schedule: reservation.scheduleClass || "",
      adults: capacityNormal?.minCapacity || 1,
      children: reservation.totalChildren || 0,
    },
  });

  // Establecer el valor inicial de adults cuando se carga la capacidad
  useEffect(() => {
    if (capacityNormal && !classData && !form.watch("date")) {
      form.setValue("adults", capacityNormal.minCapacity);
    }
  }, [capacityNormal]);
  const { isLoading, data: schedules } = useSchedulesAdminQuery();
  const [data, setData] = useState<Option[]>([]);
  const [counterMin, setCounterMin] = useState(1);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (schedules?.NORMAL) {
      setData(
        schedules?.NORMAL.map((s) => {
          return {
            value: s.startTime,
            label: s.startTime,
            disabled: isToday(form.watch("date")) && compareTimes(s.startTime),
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

      setClassData(response);
    };

    fetchClassData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("date"), form.watch("schedule")]);

  useEffect(() => {
    // Si hay una clase creada, el mínimo es 1 adulto
    if (classData) {
      const newMin = 1;
      setCounterMin(newMin);
      if (form.watch("adults") < newMin) {
        form.setValue("adults", newMin);
      }
      return;
    }

    // Si no hay clase creada, validamos capacidad mínima
    if (capacityNormal) {
      const totalParticipants = form.watch("children") + form.watch("adults");
      let newMin: number;

      // Si el total ya cumple la capacidad mínima, permite mínimo 1 adulto
      if (totalParticipants >= capacityNormal.minCapacity) {
        newMin = 1;
      } else {
        // Si no cumple, el mínimo de adultos debe ser la capacidad mínima
        newMin = capacityNormal.minCapacity;
      }

      setCounterMin(newMin);
      if (form.watch("adults") < newMin) {
        form.setValue("adults", newMin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData, form.watch("adults"), form.watch("children")]);

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
  }, [form.watch("date"), form.watch("schedule")]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setReservation({
      dateClass: values.date,
      totalAdults: values.adults,
      totalChildren: values.children,
      scheduleClass: values.schedule,
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

  // funcion para saber la hora actual formato 11:00
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Función para comparar si un horario es menor al actual por al menos 50 minutos
  const compareTimes = (time1: string) => {
    const [hour1, minute1] = time1.split(":").map(Number);
    const [hour2, minute2] = getCurrentTime().split(":").map(Number);

    // Convertir ambos horarios a minutos totales
    const totalMinutes1 = hour1 * 60 + minute1;
    const totalMinutes2 = hour2 * 60 + minute2;

    // Verificar si el horario seleccionado es menor al actual + 50 minutos
    return totalMinutes1 <= totalMinutes2 + 50;
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

  // Handler para el cambio de horario: si el horario seleccionado está cerrado, se muestra toast y se limpia
  const handleScheduleChange = (newSchedule: string) => {
    const selectedDate: Date = form.getValues("date");
    if (!selectedDate) return;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const classesForDate = classFutures?.filter(
      (cls) => format(new Date(cls.dateClass), "yyyy-MM-dd") === dateKey,
    );
    const selectedClass = classesForDate?.find(
      (cls) => cls.scheduleClass === newSchedule,
    );
    if (selectedClass && selectedClass.isClosed) {
      toast.error(
        "El horario seleccionado está cerrado. Por favor elige otra fecha.",
      );
      form.setValue("schedule", "");
    } else {
      form.setValue("schedule", newSchedule);
    }
  };

  const { data: prices, isLoading: isLoadingPrices } = usePricesQuery({
    typeCurrency: "USD",
    typeClass: "NORMAL",
  });

  useEffect(() => {
    // Limpiar schedule y classData cuando cambie la fecha
    if (form.getValues("date")) {
      form.setValue("schedule", "");
      setClassData(undefined);
      // Al cambiar la fecha, resetear a capacidad mínima si no hay clase
      if (capacityNormal && !classData) {
        const newMin = capacityNormal.minCapacity;
        setCounterMin(newMin);
        form.setValue("adults", newMin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("date")]);

  // Reset classData cuando cambie el schedule
  useEffect(() => {
    if (form.watch("schedule")) {
      setClassData(undefined);
      // Al cambiar el schedule, resetear a capacidad mínima si no hay clase
      if (capacityNormal && !classData) {
        const newMin = capacityNormal.minCapacity;
        setCounterMin(newMin);
        form.setValue("adults", newMin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("schedule")]);

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
                          onChange={(date) => {
                            field.onChange(date);
                            setOpen(false);
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
                    {isLoading || !data ? (
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
            <div className="space-y-5">
              <h3 className="text-sm font-bold">{t("participants.title")}</h3>
              <ul className="space-y-4">
                <li className="grid grid-cols-2">
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {t("participants.adults")}
                    </span>
                    <span className="text-sm font-thin">
                      {t("participants.age")} 13 - 80
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
                      {t("participants.age")} 05 - 12
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
            </div>
          </div>
          <div className="grid w-full grid-cols-[auto_1fr] gap-4 bg-secondary-foreground p-4 text-terciary">
            <UsersRound />
            <div>
              <h4 className="font-black">{t("experience.group.title")}</h4>
              <p>{t("experience.group.description")}</p>
            </div>
          </div>
          <p>{t("experience.contact")}</p>
          <a
            href="https://wa.me/+51958086581?text=Hello!"
            target="_blank"
            className="inline-flex w-full items-center justify-center gap-3 text-terciary"
          >
            <Phone />
            <span className="text-xl font-black">+51 958 086 581</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

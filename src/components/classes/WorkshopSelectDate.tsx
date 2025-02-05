import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import {
  Phone,
  UserRoundPen,
  UsersRound,
  Calendar as CalendarIcon,
} from "lucide-react";
import { TwoMonthCalendar } from "./TwoMonthCalendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Counter from "../ui/counter";
import { useSchedulesAdminQuery } from "@/redux/services/classApi";
import PulsatingDots from "../common/PulsatingDots";
import { ButtonSelect, Option } from "../ui/button-select";

const formSchema = z.object({
  date: z.date({
    message: "Selecciona una fecha",
  }),
  schedule: z.string().min(1, {
    message: "Selecciona un horario",
  }),
  adults: z.number(),
  children: z.number(),
});
export default function WorkshopSelectDate() {
  const t = useTranslations("class.schedule");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      schedule: "",
      adults: 1,
      children: 0,
    },
  });

  const { isLoading, data } = useSchedulesAdminQuery();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
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
                  <Popover>
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
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[40rem]">
                      <TwoMonthCalendar
                        value={field.value}
                        onChange={field.onChange}
                        // classes={classesFutures}
                      />
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
                        name={field.name}
                        control={form.control}
                        options={data?.NORMAL.map((s) => {
                          return {
                            value: s.startTime,
                            label: s.startTime,
                          } as Option;
                        })}
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
                    <span className="text-sm font-black">$30</span>
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
                            min={1}
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
                    <span className="text-sm font-black">$20</span>
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

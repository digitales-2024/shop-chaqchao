"use client";
import useCartDetail from "@/hooks/use-cart-detail";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  Edit,
  Receipt,
  ReceiptText,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { StepContact } from "./StepContact";
import { StepDateOrder } from "./StepDateOrder";
import { StepInvoice } from "./StepInvoice";
import { StepSomeonePickup } from "./StepSomeonePickup";

export const steps = [
  {
    title: "contact",
    content: <StepContact />,
    icon: User,
    iconCheck: UserCheck,
  },
  {
    title: "invoice",
    content: <StepInvoice />,
    icon: ReceiptText,
    iconCheck: Receipt,
  },
  {
    title: "date",
    content: <StepDateOrder />,
    icon: Calendar,
    iconCheck: CalendarCheck,
  },
  {
    title: "someone",
    content: <StepSomeonePickup />,
    icon: Users,
    iconCheck: Users,
  },
];
export const CheckoutSteps = () => {
  const {
    activeStep,
    completedSteps,
    editMode,
    handleEdit,
    contact,
    dateOrder,
  } = useCartDetail();
  const t = useTranslations("checkout");

  const locale = useLocale();

  return (
    <div className="w-full space-y-4">
      {steps.map(
        ({ title, content, icon: Icon, iconCheck: IconCheck }, index) => (
          <Card
            key={index}
            className={cn(
              activeStep === index ? "border border-primary" : "bg-slate-50",
              {
                "border border-emerald-500 bg-white":
                  completedSteps.includes(index),
              },
            )}
          >
            <CardHeader className="cursor-pointer p-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={cn("rounded-full border p-1", {
                      "border-emerald-500": completedSteps.includes(index),
                    })}
                  >
                    {completedSteps.includes(index) ? (
                      <IconCheck className="size-4 shrink-0 text-green-500" />
                    ) : (
                      <Icon
                        className={cn("size-4 shrink-0", {
                          "text-slate-400": activeStep !== index,
                        })}
                      />
                    )}
                  </div>
                  <span
                    className={cn("text-sm uppercase", {
                      "text-slate-400": activeStep !== index,
                      "text-emerald-500": completedSteps.includes(index),
                    })}
                  >
                    {t(`steps.${title}`)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {completedSteps.includes(index) && editMode !== index && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(index);
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      {t("edit")}
                    </Button>
                  )}
                  {activeStep === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </CardTitle>
              {contact && activeStep !== index && index === 0 && (
                <CardDescription className="inline-flex gap-4">
                  <span className="font-bold capitalize">{contact.name}</span>
                  <span className="font-bold">{contact.email}</span>
                </CardDescription>
              )}
              {dateOrder.fullDate && activeStep !== index && index === 1 && (
                <CardDescription className="inline-flex gap-4">
                  <span className="font-bold">
                    {format(dateOrder.fullDate, "PPPp", {
                      locale: locale === "es" ? es : undefined,
                    })}
                  </span>
                </CardDescription>
              )}
            </CardHeader>
            {activeStep === index && (
              <CardContent className="p-4">
                <div className="mb-4">{content}</div>
              </CardContent>
            )}
          </Card>
        ),
      )}
    </div>
  );
};

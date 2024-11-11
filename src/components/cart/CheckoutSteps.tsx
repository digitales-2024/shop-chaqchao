"use client";
import useCartDetail from "@/hooks/use-cart-detail";
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
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SelectDateOrder } from "./SelectDateOrder";
import { SelectInvoice } from "./SelectInvoice";
import { StepEmail } from "./StepEmail";

export const steps = [
  {
    title: "Login",
    content: <StepEmail />,
    icon: User,
    iconCheck: UserCheck,
  },
  {
    title: "Fecha de recogida",
    content: <SelectDateOrder />,
    icon: Calendar,
    iconCheck: CalendarCheck,
  },
  {
    title: "Facturación",
    content: <SelectInvoice />,
    icon: ReceiptText,
    iconCheck: Receipt,
  },
];
export const CheckoutSteps = () => {
  const { activeStep, completedSteps, editMode, handleEdit, login } =
    useCartDetail();
  const t = useTranslations("checkout");
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
                    {title}
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
              {login && activeStep !== index && (
                <CardDescription className="inline-flex gap-4">
                  <span className="font-bold capitalize">{login.name}</span>
                  <span className="font-bold">{login.email}</span>
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

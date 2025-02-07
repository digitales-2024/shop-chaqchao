"use client";
import { useCart } from "@/hooks/use-cart";
import useCartDetail from "@/hooks/use-cart-detail";
import useCartStore from "@/redux/store/cart";
import { InvoiceType } from "@/types";
import { getCodeCountry } from "@/utils/getCodeCountry";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CircleAlert } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { BusinessInfoCart } from "../business/BusinessInfoCart";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { CartEmpty } from "./CartEmpty";
import { ConfirmCheckout } from "./ConfirmCheckout";
import { TableCart } from "./TableCart";

export const DetailCheckout = () => {
  const { amountTotal, cartItems } = useCartStore();

  const { dateOrder, invoice, contact, someonePickup, shippingToAnotherCity } =
    useCartDetail();
  const t = useTranslations("checkout");
  const locale = useLocale();

  const { validateCart, validateItem, errorValidate } = useCart();

  return (
    <Card className="rounded-xl p-4 shadow-none">
      <CardHeader>
        <h2 className="text-3xl font-bold">{t("summary.title")}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <Separator />
        <div className="space-y-6">
          <p className="font-bold text-primary">{t("contact.title")}</p>
          <Separator />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">{t("contact.name")}</span>
              {contact.name ? (
                <span className="truncate font-bold capitalize">
                  {contact.name}
                </span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("contact.lastName")}
              </span>
              {contact.email ? (
                <span className="truncate font-bold">{contact.email}</span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("contact.email")}
              </span>
              {contact.email ? (
                <span className="truncate font-bold">{contact.email}</span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("contact.phone")}
              </span>
              {contact.phone ? (
                <span className="truncate font-bold">{contact.phone}</span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
          </div>
          <p className="font-bold text-primary">{t("invoice.title")}</p>
          <Separator />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("invoice.typeInvoice")}:
              </span>
              {invoice.typeInvoice ? (
                <span className="truncate font-bold">
                  {t(`invoice.${invoice.typeInvoice}`)}
                </span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("invoice.typeDoc")}:
              </span>
              {invoice.documentType ? (
                <span className="truncate font-bold">
                  {invoice.documentType}
                </span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">{t("invoice.doc")}:</span>
              {invoice.number ? (
                <span className="truncate font-bold">{invoice.number}</span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
          </div>
          {invoice.typeInvoice === InvoiceType.INVOICE && (
            <div className="grid grid-cols-1">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">
                  {t("invoice.nameBusiness")}:
                </span>
                {"nameBusiness" in invoice && invoice.nameBusiness ? (
                  <span className="truncate font-bold">
                    {invoice.nameBusiness}
                  </span>
                ) : (
                  <Skeleton className="h-8 w-full" />
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("invoice.country")}:
              </span>
              {invoice.country ? (
                <span className="truncate font-bold">
                  {getCodeCountry(invoice.country)}
                </span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("invoice.state")}:
              </span>
              {invoice.state ? (
                <span className="truncate font-bold">{invoice.state}</span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("invoice.city")}:
              </span>
              {invoice.city ? (
                <span className="truncate font-bold">{invoice.city}</span>
              ) : (
                <Skeleton className="h-8 w-full" />
              )}
            </div>
          </div>

          <p className="font-bold text-primary">{t("dateOrder.title")}</p>
          <Separator />
          <div className="grid grid-cols-1">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("dateOrder.fullDate")}:
              </span>
              <span className="font-bold">
                {dateOrder.fullDate ? (
                  format(dateOrder.fullDate, "PPPp", {
                    locale: locale === "es" ? es : undefined,
                  })
                ) : (
                  <Skeleton className="h-8 w-full" />
                )}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {t("dateOrder.quest")}:
              </span>
              <span className="font-bold">
                {someonePickup ? (locale === "es" ? "Si" : "Yes") : "No"}
                {shippingToAnotherCity
                  ? locale === "es"
                    ? "Si"
                    : "Yes"
                  : "No"}
              </span>
            </div>
          </div>
        </div>
        <Separator />
        {cartItems.length > 0 ? (
          <TableCart
            validateItem={validateItem}
            errorValidate={errorValidate}
          />
        ) : (
          <CartEmpty />
        )}
        <p className="inline-flex justify-between text-xl font-bold">
          {t("summary.total")}
          <span>S/. {amountTotal.toFixed(2)}</span>
        </p>
        <BusinessInfoCart />
        <div className="space-y-4 p-4">
          <h3 className="mb-2 flex items-center gap-2 text-lg font-black text-red-600">
            <CircleAlert className="size-6 shrink-0" />
            {t("checkout.messageTimePickup")}
          </h3>
          <h3 className="mb-2 text-red-600">
            {t("checkout.messageTimePickupLarge")}
          </h3>
        </div>
        <ConfirmCheckout validateCart={validateCart} />
      </CardContent>
    </Card>
  );
};

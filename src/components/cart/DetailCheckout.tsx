"use client";
import { useCart } from "@/hooks/use-cart";
import useCartDetail from "@/hooks/use-cart-detail";
import { useBusiness } from "@/hooks/useBusiness";
import useCartStore from "@/redux/store/cart";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { CartEmpty } from "./CartEmpty";
import { ConfirmCheckout } from "./ConfirmCheckout";
import { TableCart } from "./TableCart";

export const DetailCheckout = () => {
  const { amountTotal, cartItems } = useCartStore();
  const { business, isLoading } = useBusiness();

  const { dateOrder, invoice, login, someonePickup } = useCartDetail();
  const t = useTranslations("checkout.summary");
  const i = useTranslations("checkout.invoice");

  const { validateCart, validateItem, errorValidate } = useCart();

  return (
    <Card className="rounded-3xl border-slate-100 p-10 shadow-none">
      <CardHeader>
        <h2 className="text-3xl font-bold">{t("title")}</h2>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <Separator />
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {login.name ? (
              <span className="truncate font-bold capitalize">
                {login.name}
              </span>
            ) : (
              <Skeleton className="h-8 w-32" />
            )}
            {login.email ? (
              <span className="truncate font-bold">{login.email}</span>
            ) : (
              <Skeleton className="h-8 w-32" />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <span className="text-gray-400">{t("address")}:</span>
            <span className="font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                business.businessInfo.address
              )}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <span className="text-gray-400">{t("date")}:</span>
            <span className="font-bold">
              {dateOrder.fullDate ? (
                format(dateOrder.fullDate, "PPPp", { locale: es })
              ) : (
                <Skeleton className="h-8 w-32" />
              )}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <span className="text-gray-400">{t("typeInvoice")}:</span>
            <span className="font-bold">
              {invoice ? (
                i(invoice.typeInvoice)
              ) : (
                <Skeleton className="h-8 w-32" />
              )}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <span className="text-gray-400">{i("name")}:</span>
            {invoice.name ? (
              <span className="font-bold">{invoice.name}</span>
            ) : (
              <Skeleton className="h-8 w-32" />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <span className="text-gray-400">{t("someone")}:</span>
            <span className="font-bold">{someonePickup ? "Si" : "No"}</span>
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
          {t("total")}
          <span>S/. {amountTotal.toFixed(2)}</span>
        </p>
        <ConfirmCheckout validateCart={validateCart} />
      </CardContent>
    </Card>
  );
};

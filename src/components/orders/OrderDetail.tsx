"use client";
import { Izipay } from "@/assets/icons";
import { useOrders } from "@/hooks/use-orders";
import { BillingDocumentType, OrderClient } from "@/types/order";
import { numberToLetter } from "@/utils/numberToLetter";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Download, MoreVertical, PackageOpen } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Line } from "../common/Line";
import PulsatingDots from "../common/PulsatingDots";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface OrderDisplayProps {
  order: OrderClient | null;
}

export const statusColors: Record<OrderClient["orderStatus"], string> = {
  CONFIRMED: "border-blue-300 text-blue-300",
  PROCESSING: "border-cyan-500 text-cyan-500",
  COMPLETED: "border-green-500 text-green-500",
  CANCELLED: "border-rose-500 text-rose-500",
};

export const OrderDetail = ({ order }: OrderDisplayProps) => {
  const t = useTranslations("account.orders");

  const {
    order: orderDetail,
    isLoadingOrder,
    onDownloadPdf,
  } = useOrders(order?.id);
  const locale = useLocale();

  if (isLoadingOrder) {
    return <PulsatingDots />;
  }

  const pickupDate = new Date(
    order?.pickupTime?.toString().replace("Z", "") ?? new Date(),
  );
  const hour = pickupDate.getHours();
  const minute = pickupDate.getMinutes().toString().padStart(2, "0");
  const hour12 = hour % 12 || 12;
  const ampm = hour >= 12 ? "PM" : "AM";

  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-end p-2">
        <div className="inline-flex items-center justify-center gap-1">
          <Separator orientation="vertical" className="mx-2 h-6" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!orderDetail}>
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onSelect={() =>
                  order?.id && onDownloadPdf(order.id, order.pickupCode)
                }
              >
                <Download className="mr-2 h-4 w-4" />
                {t("download")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Line className="border-dashed" />
      {order ? (
        <ScrollArea>
          <div className="space-y-6 px-10">
            <div className="flex w-full flex-col items-center justify-center gap-1">
              <div>
                {orderDetail?.billingDocument.billingDocumentType ===
                ("INVOICE" as unknown as BillingDocumentType)
                  ? t("details.factura")
                  : t("details.boleta")}{" "}
              </div>
              <div className="group relative flex w-fit items-center gap-2 text-lg">
                <span className="font-thin uppercase text-slate-500">
                  {t("details.order")} #{" "}
                </span>
                <span className="truncate">{orderDetail?.pickupCode}</span>
              </div>
            </div>
            <Line className="border-dashed" />
            <div className="grid w-full gap-3 text-sm">
              <div className="font-semibold">{t("details.client.title")}</div>
              <dl className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.name")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.client.name} {orderDetail?.client.lastName}{" "}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.email")}
                  </dt>
                  <dd className="group/email font-normal">
                    {orderDetail?.client.email}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.phone")}
                  </dt>
                  <dd className="group/phone space-x-2 font-normal">
                    {orderDetail?.client.phone}
                  </dd>
                </div>
                <div></div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.typeDoc")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.billingDocument.typeDocument}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.doc")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.billingDocument.documentNumber}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.address")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.billingDocument.address ?? "--"}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.country")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.billingDocument.country ?? "--"}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.state")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.billingDocument.state ?? "--"}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <dt className="text-xs font-thin text-gray-500">
                    {t("details.client.city")}
                  </dt>
                  <dd className="font-normal capitalize">
                    {orderDetail?.billingDocument.city ?? "--"}
                  </dd>
                </div>
                {orderDetail?.billingDocument.businessName !== "" && (
                  <div className="flex flex-col items-start">
                    <dt className="text-xs font-thin text-gray-500">
                      {t("details.client.businessName")}
                    </dt>
                    <dd className="font-normal capitalize">
                      {orderDetail?.billingDocument.businessName ?? "--"}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <Line className="border-dashed" />
            <div className="w-full text-center text-xs font-thin">
              {`${format(pickupDate, "EEEE, dd MMMM", { locale: locale === "es" ? es : undefined })}, ${hour12}:${minute} ${ampm}`}
            </div>
            <Line className="border-dashed" />
            <div className="flex-1 px-0 py-2 sm:px-6">
              <div className="space-y-4">
                <div className="text-sm font-semibold">
                  {t("details.cart.title")}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="max-w-40">
                        {t("details.cart.product")}
                      </TableHead>
                      <TableHead>{t("details.cart.quantity")}</TableHead>
                      <TableHead>P.U</TableHead>
                      <TableHead className="text-right">
                        {t("details.cart.subTotal")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetail?.cart.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="flex items-center gap-2 truncate">
                          <Avatar className="rounded-md bg-slate-100">
                            {product.images.length > 0 ? (
                              <AvatarImage
                                src={product.images[0].url}
                                alt={product.name}
                              />
                            ) : (
                              <AvatarFallback>
                                <PackageOpen />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-muted-foreground">
                            {product.name}
                          </span>
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          {(product.price * product.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between font-semibold">
                    <span className="font-thin">{t("details.cart.total")}</span>
                    <span>S/. {(order?.totalAmount ?? 0).toFixed(2)}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-10 flex flex-col gap-2">
                {locale === "es" && (
                  <p className="text-center text-xs">
                    Son{" "}
                    {numberToLetter(
                      Number((order?.totalAmount ?? 0).toFixed(2)),
                    )}{" "}
                  </p>
                )}
                <div className="grid grid-cols-3 items-center gap-3">
                  <Line className="w-full border-dashed" />
                  <span className="text-center text-xs">
                    {t("details.cart.pay")}
                  </span>
                  <Line className="border-dashed" />
                </div>
                <li className="flex items-center justify-between font-semibold">
                  <span className="font-thin">
                    <Izipay className="h-4" />
                  </span>
                  <span>S/. {(order?.totalAmount ?? 0).toFixed(2)}</span>
                </li>
              </div>
              <ScrollBar orientation="horizontal" />
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          {t("empty")}
        </div>
      )}
    </div>
  );
};

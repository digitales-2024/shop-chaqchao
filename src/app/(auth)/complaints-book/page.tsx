"use client";

import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import { useRegisterClaim } from "@/hooks/use-register-claim";
import { ReclamationFormData, reclamationSchema } from "@/schemas/claimsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

export default function ReclamationForm() {
  const { handleRegisterClaim } = useRegisterClaim();
  const t = useTranslations("claims");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReclamationFormData>({
    resolver: zodResolver(reclamationSchema),
  });

  const onSubmit = (data: ReclamationFormData) => {
    handleRegisterClaim(data);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-4xl rounded-md border border-gray-300 bg-white p-4 md:p-6 lg:p-8"
      >
        <div className="mb-4 border-b border-gray-300 pb-4">
          <div className="flex flex-wrap justify-between gap-6">
            <div>
              <Label className="text-lg font-bold">{t("complaintsBook")}</Label>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="fechaDia">{t("day")}</Label>
                  <Input
                    id="fechaDia"
                    type="number"
                    {...register("fechaDia")}
                  />
                  {errors.fechaDia && (
                    <p className="text-sm text-red-500">
                      {errors.fechaDia.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="fechaMes">{t("month")}</Label>
                  <Input
                    id="fechaMes"
                    type="number"
                    {...register("fechaMes")}
                  />
                  {errors.fechaMes && (
                    <p className="text-sm text-red-500">
                      {errors.fechaMes.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="fechaAnio">{t("year")}</Label>
                  <Input
                    id="fechaAnio"
                    type="number"
                    {...register("fechaAnio")}
                  />
                  {errors.fechaAnio && (
                    <p className="text-sm text-red-500">
                      {errors.fechaAnio.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link href="/" className="flex w-full justify-center md:w-auto">
                <ChaqchaoLogo className="h-[80px] md:h-28" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-4 border-b border-gray-300 pb-4">
          <Label className="font-bold">{t("identificationConsumer")}</Label>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="claimantName">{t("name")}</Label>
              <Input id="claimantName" {...register("claimantName")} />
              {errors.claimantName && (
                <p className="text-sm text-red-500">
                  {errors.claimantName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="claimantAddress">{t("address")}</Label>
              <Input id="claimantAddress" {...register("claimantAddress")} />
              {errors.claimantAddress && (
                <p className="text-sm text-red-500">
                  {errors.claimantAddress.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="documentNumber">{t("identityCard")}</Label>
              <Input id="documentNumber" {...register("documentNumber")} />
              {errors.documentNumber && (
                <p className="text-sm text-red-500">
                  {errors.documentNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="claimantPhone">{t("phone")}</Label>
              <Controller
                name="claimantPhone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PhoneInput
                    defaultCountry="PE"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="claimantEmail">{t("email")}</Label>
              <Input id="claimantEmail" {...register("claimantEmail")} />
              {errors.claimantEmail && (
                <p className="text-sm text-red-500">
                  {errors.claimantEmail.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <Label htmlFor="claimantRepresentative">
              {t("representative")}
            </Label>
            <Input
              id="claimantRepresentative"
              {...register("claimantRepresentative")}
            />
          </div>
        </div>

        <div className="mb-4 border-b border-gray-300 pb-4">
          <Label className="font-bold">{t("identificationAsset")}</Label>
          <div className="mt-4">
            <Controller
              name="assetType"
              control={control}
              defaultValue="PRODUCT"
              render={({ field }) => (
                <RadioGroupPrimitive.Root
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <RadioGroupPrimitive.Item
                    value="PRODUCT"
                    id="PRODUCT"
                    className="group flex items-center space-x-2"
                  >
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 bg-white group-hover:border-gray-500 group-focus:ring-2 group-focus:ring-blue-500">
                      <RadioGroupPrimitive.Indicator className="h-3 w-3 rounded-full bg-blue-500" />
                    </div>
                    <Label htmlFor="PRODUCT" className="text-gray-700">
                      {t("product")}
                    </Label>
                  </RadioGroupPrimitive.Item>

                  <RadioGroupPrimitive.Item
                    value="SERVICE"
                    id="SERVICE"
                    className="group flex items-center space-x-2"
                  >
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 bg-white group-hover:border-gray-500 group-focus:ring-2 group-focus:ring-blue-500">
                      <RadioGroupPrimitive.Indicator className="h-3 w-3 rounded-full bg-blue-500" />
                    </div>
                    <Label htmlFor="SERVICE" className="text-gray-700">
                      {t("service")}
                    </Label>
                  </RadioGroupPrimitive.Item>
                </RadioGroupPrimitive.Root>
              )}
            />
            {errors.assetType && (
              <p className="text-sm text-red-500">{errors.assetType.message}</p>
            )}
          </div>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="assetDescription">{t("description")}</Label>
              <Input id="assetDescription" {...register("assetDescription")} />
              {errors.assetDescription && (
                <p className="text-sm text-red-500">
                  {errors.assetDescription.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="amountClaimed">{t("amountClaimed")}</Label>
              <Input
                id="amountClaimed"
                type="number"
                {...register("amountClaimed")}
              />
              {errors.amountClaimed && (
                <p className="text-sm text-red-500">
                  {errors.amountClaimed.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 border-gray-300 pb-4">
          <Label className="font-bold">{t("detailsComplaint")}</Label>
          <div className="mt-2">
            <Label htmlFor="claimDescription">{t("detail")}</Label>
            <textarea
              id="claimDescription"
              {...register("claimDescription")}
              className="w-full rounded border border-gray-300 p-2"
            />
            {errors.claimDescription && (
              <p className="text-sm text-red-500">
                {errors.claimDescription.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          {t("button")}
        </Button>
      </form>
    </div>
  );
}

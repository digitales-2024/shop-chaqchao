import Workshop from "@/assets/images/workshop_01.webp";
import { ReservationData } from "@/types/reservationData";
import { Calendar, Clock, Phone, User, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface ReservationSummaryProps {
  data: Partial<ReservationData>;
  currentStep?: number;
}

export const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  data,
  currentStep = 1,
}) => {
  const t = useTranslations("class.reservationSumary");

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
      {/* Encabezado */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          {t("abstract.title")}
        </h3>
        <div className="mx-auto my-2 h-1 w-16 rounded bg-primary"></div>
      </div>

      {/* Imagen */}
      <div className="mb-6 flex w-full">
        <div className="relative h-[180px] w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src={Workshop}
            alt="Workshop"
            sizes="(max-width: 768px) 100vw 160px"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Información de la reserva */}
      <div className="space-y-4 text-gray-700">
        {data.userName && (
          <div className="flex items-center">
            <User className="mr-3 h-5 w-5 text-orange-600" />
            <p>
              <span className="font-bold">{t("userName")}</span> {data.userName}
            </p>
          </div>
        )}
        {data.userEmail && (
          <div className="flex items-center">
            <svg
              className="mr-3 h-5 w-5 text-orange-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm1 0a5 5 0 11-10 0 5 5 0 0110 0zm-5 9a7 7 0 015.757-3.99c-.217-.37-.445-.733-.677-1.087C16.18 14.01 13.84 13 12 13c-1.84 0-4.18 1.01-5.08 3.018-.232.354-.46.717-.677 1.087A7 7 0 0112 21z"
              />
            </svg>
            <p>
              <span className="font-bold">{t("userEmail")}</span>{" "}
              {data.userEmail}
            </p>
          </div>
        )}
        {data.userPhone && (
          <div className="flex items-center">
            <Phone className="mr-3 h-5 w-5 text-orange-600" />
            <p>
              <span className="font-bold">{t("userPhone")}</span>{" "}
              {data.userPhone}
            </p>
          </div>
        )}
        <hr className="my-4" />
        {data.date && (
          <div className="flex items-center">
            <Calendar className="mr-3 h-5 w-5 text-green-600" />
            <p>
              <span className="font-bold">{t("dateClass")}</span>{" "}
              {data.date.toLocaleDateString()}
            </p>
          </div>
        )}
        {data.time && (
          <div className="flex items-center">
            <Clock className="mr-3 h-5 w-5 text-green-600" />
            <p>
              <span className="font-bold">{t("scheduleClass")}</span>{" "}
              {data.time}
            </p>
          </div>
        )}
        {data.language && (
          <div className="flex items-center">
            <Languages className="mr-3 h-5 w-5 text-green-600" />
            <p>
              <span className="font-bold">{t("languageClass")}</span>{" "}
              {data.language === "español"
                ? t("languages.spanish")
                : t("languages.english")}
            </p>
          </div>
        )}
        {currentStep >= 6 && data.participants !== 0 && (
          <div className="flex items-center">
            <User className="mr-3 h-5 w-5 text-green-600" />
            <p>
              <span className="font-bold">{t("participantsClass")}</span>{" "}
              {data.participants}
            </p>
          </div>
        )}
        {data.allergies && (
          <div className="flex items-center">
            <User className="mr-3 h-5 w-5 text-red-600" />
            <p>
              <span className="font-bold">{t("userAllergies")}</span>{" "}
              {data.allergies}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

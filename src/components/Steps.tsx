"use client";

import Workshop from "@/assets/images/workshop_01.webp";
import {
  useSchedulesQuery,
  useLanguagesQuery,
  usePricesQuery,
  // useCreateClassRegistrationMutation,
  // useConfirmClassPaymentMutation,
} from "@/redux/services/classApi";
import { PaypalTransactionData } from "@/types/paypal";
import {
  Steps1Props,
  Steps2Props,
  Steps3Props,
  Steps4Props,
  Steps5Props,
  Steps6Props,
  Steps7Props,
  ConfirmationProps,
  TypeCurrency,
} from "@/types/steps";
import { showToast, formatPhoneNumber, isValidEmail } from "@/utils/helpers";
import { addDays, format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Countdown from "react-countdown";

import PayPalButton from "@/components/class/PaypalButton";
import { LineTitle } from "@/components/common/LineTitle";
import { Calendar } from "@/components/ui/calendar";
import { NavigationButtons } from "@/components/ui/NavigationClassButtons";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { ReservationSummary } from "./ReservationSumary";

export function Step1({ onNext, updateData }: Steps1Props) {
  const handleNext = () => {
    updateData({
      confirmed: false,
    });
    onNext();
  };

  const t = useTranslations("class.step1");

  return (
    <div className="mx-auto w-full bg-white pb-48 pt-4">
      <div className="relative mb-6 py-4">
        <div className="flex items-center justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>
      <div className="mx-auto w-1/2 text-center">
        <p className="mb-12 text-sm leading-relaxed text-gray-700 sm:text-lg">
          {t("description")}
        </p>

        <button
          onClick={handleNext}
          className="h-12 w-36 rounded-full bg-primary px-0 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary/90 sm:w-44 sm:px-12 sm:text-lg"
        >
          {t("button").toUpperCase()}
        </button>
      </div>
    </div>
  );
}

export function Step2({
  onNext,
  onBack,
  updateData,
  reservationData,
}: Steps2Props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [emailError, setEmailError] = useState("");

  const t = useTranslations("class.step2");

  // Actualiza los valores en `reservationData` en tiempo real
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);
    updateData({ userName: value, userEmail, userPhone });
  };

  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserEmail(value);
    updateData({ userName, userEmail: value, userPhone });
  };

  const handleUserPhoneChange = (value: string) => {
    setUserPhone(value);
    updateData({ userName, userEmail, userPhone: value });
  };

  // Verifica si hay campos vacíos
  const handleNext = () => {
    if (!userName || !userEmail || !userPhone) {
      showToast(t("toast.fullFields"), "warning");
      setEmailError("");
      return;
    }

    // Luego, verifica si el correo es válido
    if (!isValidEmail(userEmail)) {
      showToast(t("toast.emailValidation"), "warning");
      return;
    }

    // Todos los campos están completos y el correo es válido
    setEmailError("");
    updateData({ userName, userEmail, userPhone });
    onNext();
  };
  return (
    <div className="mx-auto w-full bg-white pb-48 pt-4">
      <div className="relative mb-6 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <input
            type="text"
            placeholder={t("placeholder.name")}
            value={userName}
            onChange={handleUserNameChange}
            className="w-full rounded-md border px-4 py-3 text-gray-700 focus:outline-none"
          />

          <input
            type="email"
            placeholder={t("placeholder.email")}
            value={userEmail}
            onChange={handleUserEmailChange}
            className="w-full rounded-md border px-4 py-3 text-gray-700 focus:outline-none"
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}

          <PhoneInput
            defaultCountry="PE"
            value={userPhone}
            onChange={handleUserPhoneChange}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavigationButtons
              back={t("button.back")}
              next={t("button.next")}
              onNext={handleNext}
              onBack={onBack}
            />
          </div>
        </div>

        <div className="max-w-sm flex-1">
          <ReservationSummary data={reservationData} />
        </div>
      </div>
    </div>
  );
}

// Step 3: Escoger fecha
export function Step3({
  onNext,
  onBack,
  updateData,
  reservationData,
}: Steps3Props) {
  /* const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [datePickerDate, setDatePickerDate] = useState<Date | undefined>(
    undefined,
  ); */
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    reservationData.date || undefined,
  );
  const [datePickerDate, setDatePickerDate] = useState<Date | undefined>(
    undefined,
  );

  const t = useTranslations("class.step3");

  // Calcula los próximos 4 días empezando desde hoy
  const today = new Date();
  const nextDays = Array.from({ length: 4 }, (_, i) => addDays(today, i));

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    setDatePickerDate(undefined);
    updateData({ date: day });
  };

  const handleNext = () => {
    if (!selectedDate && !datePickerDate) {
      showToast(t("toast.fullFields"), "warning");
      return;
    }
    updateData({ date: datePickerDate || selectedDate });
    onNext();
  };

  const handleBack = () => {
    onBack();
  };
  return (
    <div className="mx-auto w-full bg-white px-4 pb-48 pt-4 sm:px-0">
      <div className="relative mb-6 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            {nextDays.map((day, index) => (
              <div
                key={day.getTime()}
                className="mx-3 flex flex-col items-center justify-center"
              >
                <span className="text-base font-bold sm:text-lg">
                  {index === 0
                    ? t("days.today")
                    : t(`days.${format(day, "EEE").toLowerCase()}`)}
                </span>
                <div
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14 ${
                    selectedDate && isSameDay(selectedDate, day)
                      ? "bg-primary text-white"
                      : "bg-[#F5F5F5] text-secondary hover:bg-primary hover:text-white"
                  } h-14 w-14 rounded sm:h-16 sm:w-16`}
                  onClick={() => handleDateSelect(day)}
                >
                  <span className="text-base font-bold sm:text-xl">
                    {format(day, "d", { locale: es })}
                  </span>
                </div>
                <span className="text-sm font-medium sm:text-base">
                  {format(day, "MMM", { locale: es }).toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          {/* Popover para DatePicker */}
          <div className="flex flex-col items-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="mb-4 mt-8 flex items-center rounded-full border-2 border-primary px-6 py-2 text-secondary transition-all hover:bg-primary hover:text-white">
                  <span>
                    {selectedDate
                      ? format(selectedDate, "PPP", { locale: es })
                      : t("moreDates")}
                  </span>
                  <CalendarIcon className="ml-2 h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="center" className="w-auto p-0">
                {/* <Calendar
                  selected={datePickerDate}
                  onSelect={(date: Date | undefined) => {
                    setSelectedDate(date);
                  }}
                  disabled={(date: Date) => date < new Date()}
                  initialFocus
                /> */}
                <Calendar
                  selected={datePickerDate}
                  onSelect={(date: Date | undefined) => {
                    setSelectedDate(date);
                    updateData({ date }); // Actualiza `reservationData` cuando se selecciona una fecha en el calendario
                  }}
                  disabled={(date: Date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
              <NavigationButtons
                back={t("button.back")}
                next={t("button.next")}
                onBack={handleBack}
                onNext={handleNext}
              />
            </div>
          </div>
        </div>

        <div className="max-w-sm flex-1">
          <ReservationSummary data={reservationData} />
        </div>
      </div>
    </div>
  );
}

// Step 4: Escoger horario
export function Step4({
  onNext,
  onBack,
  updateData,
  selectedDate,
  reservationData,
}: Steps4Props) {
  const [time, setTime] = useState(reservationData.time || "");

  const { data: schedules, isLoading, isError } = useSchedulesQuery();
  const t = useTranslations("class.step4");

  const handleTimeSelection = (selectedTime: string) => {
    setTime(selectedTime);
    updateData({ time: selectedTime }); // Actualizamos el tiempo en reservationData
  };

  const handleNext = () => {
    if (!time) {
      showToast(t("toast.fullFields"), "warning");
      return;
    }
    updateData({ time });
    onNext();
  };
  return (
    <div className="mx-auto w-full bg-white px-4 pb-48 pt-10 text-center sm:px-0">
      <div className="mb-6 flex justify-center space-x-10">
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : t("dateNotSelected")}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 text-center text-gray-500">
            {/* Horarios de reserva disponible */}
            <div className="">
              <p className="mb-6 text-base font-semibold text-secondary sm:text-lg">
                {t("subTitle")}
              </p>
              {isLoading ? (
                <p>{t("schedule.loading")}</p>
              ) : isError ? (
                <p>{t("schedule.loadingError")}</p>
              ) : schedules && schedules.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {schedules.map((schedule, index) => (
                    <button
                      key={index}
                      className={`rounded-full border px-6 py-2 text-base transition-all sm:text-lg ${
                        time === schedule.startTime
                          ? "bg-primary text-white"
                          : "border-primary text-primary"
                      } hover:bg-primary hover:text-white`}
                      onClick={() => handleTimeSelection(schedule.startTime)}
                    >
                      {schedule.startTime}
                    </button>
                  ))}
                </div>
              ) : (
                <p>{t("schedule.notAvailable")}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavigationButtons
              back={t("button.back")}
              next={t("button.next")}
              onBack={onBack}
              onNext={handleNext}
            />
          </div>
        </div>

        <div className="max-w-sm flex-1">
          <ReservationSummary data={reservationData} />
        </div>
      </div>
    </div>
  );
}

// Step5: Escoger el idioma
export function Step5({
  onNext,
  onBack,
  updateData,
  selectedDate,
  time,
  reservationData,
}: Steps5Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    reservationData.language || "",
  );

  const { data: languages, isLoading, isError } = useLanguagesQuery();
  const t = useTranslations("class.step5");

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    updateData({ language }); // Actualizamos el idioma en reservationData
  };

  const handleNext = () => {
    if (!selectedLanguage) {
      showToast(t("toast.fullFields"), "warning");
      return;
    }
    updateData({ language: selectedLanguage });
    onNext();
  };
  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : t("dateNotSelected")}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {time}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>

      {/* Selección de idiomas */}
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 text-center text-gray-500">
            <div>
              <p className="mb-6 text-base font-semibold text-secondary sm:text-lg">
                {t("subTitle")}
              </p>
              {isLoading ? (
                <p>{t("language.loading")}</p>
              ) : isError ? (
                <p>{t("language.loadingError")}</p>
              ) : languages && languages.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {languages.map((language, index) => (
                    <button
                      key={index}
                      className={`rounded-full border px-6 py-2 text-sm transition-all sm:text-lg ${
                        selectedLanguage === language.languageName
                          ? "bg-primary text-white"
                          : "border-primary text-primary"
                      } hover:bg-primary hover:text-white`}
                      onClick={() =>
                        handleLanguageSelection(language.languageName)
                      }
                    >
                      {language.languageName === "español"
                        ? t("languages.spanish")
                        : t("languages.english")}
                    </button>
                  ))}
                </div>
              ) : (
                <p>{t("language.notAvailabe")}</p>
              )}
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavigationButtons
              back={t("button.back")}
              next={t("button.next")}
              onBack={onBack}
              onNext={handleNext}
            />
          </div>
        </div>
        <div className="max-w-sm flex-1">
          <ReservationSummary data={reservationData} />
        </div>
      </div>
    </div>
  );
}

// Step6: Escoger cantidad de participantes
export function Step6({
  onNext,
  onBack,
  updateData,
  time,
  selectedDate,
  language,
  reservationData,
}: Steps6Props) {
  const [participants, setParticipants] = useState<number | null>(
    reservationData.participants || null,
  );
  const step = 6;
  const t = useTranslations("class.step6");

  const handleParticipantsSelection = (number: number) => {
    setParticipants(number);
    updateData({ participants: number });
  };

  const handleNext = () => {
    if (participants === null) {
      showToast(t("toast.fullFields"), "warning");
      return;
    }
    updateData({ participants });
    onNext();
  };

  const handleBack = () => {
    onBack();
  };
  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : t("dateNotSelected")}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {time}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {language?.toUpperCase()}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <div className="mb-6 flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <div
                key={number}
                onClick={() => handleParticipantsSelection(number)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg font-semibold transition-colors duration-300 sm:h-12 sm:w-12 ${
                  participants === number
                    ? "bg-primary text-white"
                    : "bg-[#F5F5F5] text-secondary hover:bg-primary hover:text-white"
                }`}
              >
                {number}
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <NavigationButtons
              back={t("button.back")}
              next={t("button.next")}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        </div>

        <div className="max-w-sm flex-1">
          <ReservationSummary data={reservationData} currentStep={step} />
        </div>
      </div>
    </div>
  );
}

// Step 7: Alergias y confirmación
export function Step7({
  onNext,
  onBack,
  userName,
  userEmail,
  userPhone,
  selectedDate,
  participants,
  time,
  language,
  updateData,
}: Steps7Props) {
  const [allergies, setAllergies] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [children, setChildren] = useState(0);
  const [adultPrice, setAdultPrice] = useState(30);
  const [childPrice, setChildPrice] = useState(20);
  const [totalParticipants, setTotalParticipants] = useState(participants);
  const [total, setTotal] = useState(participants * adultPrice);
  const [subTotal, setSubTotal] = useState(participants * adultPrice);
  const [classId, setClassId] = useState<string | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);

  const { data: prices } = usePricesQuery();
  const t = useTranslations("class.step7");
  /* const [createClassRegistration] = useCreateClassRegistrationMutation();
  const [confirmClassPayment] = useConfirmClassPaymentMutation(); */

  // Actualizando el número de participantes
  useEffect(() => {
    setTotalParticipants(participants + children);
  }, [children, participants]);

  // Obtener los precios de adultos y niños
  useEffect(() => {
    if (prices) {
      const adult = prices.find((p) => p.classTypeUser === "ADULT");
      const child = prices.find((p) => p.classTypeUser === "CHILD");
      setAdultPrice(adult ? adult.price : 0);
      setChildPrice(child ? child.price : 0);
    }
  }, [prices]);

  // Calculando el subtotal y el total
  useEffect(() => {
    const calculatedSubTotal =
      participants * adultPrice + children * childPrice;
    setSubTotal(calculatedSubTotal);
    setTotal(calculatedSubTotal);
  }, [participants, children, adultPrice, childPrice]);

  // Actualizando en numero de niños
  useEffect(() => {
    updateData({ children });
  }, [children, updateData]);

  // Actualizar `transactionDataRef` cuando cambien los datos de la reserva
  useEffect(() => {
    transactionDataRef.current = {
      userName,
      userEmail,
      userPhone,
      scheduleClass: time,
      languageClass: language || "",
      dateClass: selectedDate.toISOString(),
      totalAdults: participants,
      totalChildren: children,
      typeCurrency: TypeCurrency.Dolar,
      comments: hasAllergies ? allergies : "Ninguna",
      paypalAmount: total.toFixed(2),
      paypalCurrency: "USD",
    };
  }, [
    userName,
    userEmail,
    userPhone,
    time,
    language,
    selectedDate,
    participants,
    children,
    hasAllergies,
    allergies,
    total,
  ]);

  // Definir función para obtener los datos actualizados
  const getTransactionData = () => transactionDataRef.current;

  // Data para la transacciòn
  const transactionDataRef = useRef({
    userName,
    userEmail,
    userPhone,
    scheduleClass: time,
    languageClass: language || "",
    dateClass: selectedDate.toISOString(),
    totalAdults: participants,
    totalChildren: children,
    typeCurrency: TypeCurrency.Dolar,
    comments: hasAllergies ? allergies : "Ninguna",
    paypalAmount: total.toFixed(2),
    paypalCurrency: "",
  });

  const handleIncreaseChildren = () => {
    setChildren((prev) => prev + 1);
  };

  const handleDecreaseChildren = () => {
    setChildren((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleAllergiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAllergies = e.target.value;
    setAllergies(newAllergies);
    updateData({ allergies: newAllergies });
  };

  const registerClass = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          userEmail,
          userPhone,
          scheduleClass: time,
          languageClass: language || "",
          dateClass: selectedDate.toISOString(),
          totalAdults: participants,
          totalChildren: children,
          typeCurrency: TypeCurrency.Dolar,
          comments: hasAllergies ? allergies : "Ninguna",
          paypalOrderId: "",
          paypalOrderStatus: "",
          paypalAmount: "",
          paypalCurrency: "USD",
          paypalDate: "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        switch (result.message) {
          case "There are no more spots available.":
            showToast(t("toast.noPlaceAvailable"), "error");
            break;
          case "Invalid number of participants":
            if (totalParticipants < 2 || totalParticipants > 8) {
              showToast(t("toast.invalidNumberParticipantsRange"), "error");
            }
            break;
          case "Invalid number of participants":
            showToast(t("toast.invalidNumberParticipants"), "error");
            break;
          case "Class is close":
            showToast(t("toast.classIsClose"), "error");
            break;
          case "Registration is close":
            showToast(t("toast.registrationIsClose"), "error");
            break;
          case "Invalid class date":
            showToast(t("toast.invalidClassDate"), "error");
            break;
          default:
            return;
        }
        return;
      }

      showToast(t("toast.classRegisterSuccessfully"), "success");
      setClassId(result.data.id);
      setTimeout(() => setShowCountdown(true), 3000);
    } catch (error) {
      showToast(t("toast.errorRegisterClass"), "error");
      console.error("Error al registrar la clase:", error);
    }
  };

  /* const handleRegisterClass = async () => {
    const registrationData = {
      userName,
      userEmail,
      userPhone,
      scheduleClass: time,
      languageClass: language || "español",
      dateClass: selectedDate.toISOString(),
      totalAdults: participants,
      totalChildren: children,
      typeCurrency: "DOLAR",
      comments: hasAllergies ? allergies : "Ninguna",
      paypalOrderId: "",
      paypalOrderStatus: "",
      paypalAmount: "",
      paypalCurrency: "USD",
      paypalDate: "",
    };

    try {
      const result = await createClassRegistration(registrationData).unwrap();

      if (result.statusCode && result.statusCode !== 201) {
        switch (result.message) {
          case "There are no more spots available.":
            showToast(
              "No hay más cupos disponibles, Por favor escoga otra fecha u horario.",
              "error",
            );
            break;
          case "Invalid number of participants":
            if (totalParticipants < 2 || totalParticipants > 8) {
              showToast(
                "Número invalido de participantes, El número minimo de participantes debe ser 2.",
                "error",
              );
            }
            break;
          case "Invalid number of participants":
            showToast(
              "Número invalido de participantes, El número minimo de participantes debe ser 1.",
              "error",
            );
            break;
          case "Class is close":
            showToast(
              "La clase esta cerrada, Por favor escoga otra fecha u horario.",
              "error",
            );
            break;
          case "Registration is close":
            showToast(
              "La inscripción esta cerrada, Por favor eliga otra fecha u horario.",
              "error",
            );
            break;
          case "Invalid class date":
            showToast(
              "Fecha invalida, Por favor eliga otra fecha u horario.",
              "error",
            );
            break;
          default:
            return;
        }
        return;
      }

      // Si el registro es exitoso
      showToast(
        "Clase registrada exitosamente. Proceda con el pago.",
        "success",
      );
      setClassId(result.data.id);
      setTimeout(() => setShowCountdown(true), 2500);
    } catch (error) {
      showToast("Error al registrar la clase. Inténtalo de nuevo.", "error");
      console.error("Error al registrar la clase:", error);
    }
  }; */

  /* const handleConfirmPayment = async (paypalData: PaypalTransactionData) => {
    if (!classId) return;

    const paymentData = {
      paypalOrderId: paypalData.paypalOrderId,
      paypalOrderStatus: paypalData.paypalOrderStatus,
      paypalAmount: paypalData.paypalAmount,
      paypalCurrency: paypalData.paypalCurrency,
      paypalDate: paypalData.paypalDate,
    };

    try {
      const response = await confirmClassPayment({ classId, data: paymentData }).unwrap();
      if (!response.ok) {
        showToast("Error al registrar la clase. Inténtalo de nuevo.", "error");
        console.log(result.message);
        return;
      }

      showToast("Pago confirmado y clase registrada con éxito.", "success");
      setShowCountdown(false);
      onNext();
    } catch (error) {
      showToast("Error al confirmar el pago. Inténtalo de nuevo.", "error");
      console.error("Error al confirmar el pago:", error);
    }
  }; */

  const confirmPayment = async (paypalData: PaypalTransactionData) => {
    if (!classId) return;

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/classes/${classId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paypalOrderId: String(paypalData.paypalOrderId),
            paypalOrderStatus: String(paypalData.paypalOrderStatus),
            paypalAmount: paypalData.paypalAmount,
            paypalCurrency: String(paypalData.paypalCurrency),
            paypalDate: String(paypalData.paypalDate),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        showToast(t("toast.errorRegisterClass"), "error");
        console.log(result.message);
        return;
      }

      showToast(t("toast.paymentConfirmed"), "success");
      setShowCountdown(false);
      onNext();
    } catch (error) {
      showToast(t("toast.errorConfirmPayment"), "error");
      console.error("Error al confirmar el pago:", error);
    }
  };

  const countdownRenderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      setShowCountdown(false);
      setClassId(null);
      showToast(t("toast.timeOut"), "error");
      return null;
    } else {
      return (
        <div className="fixed right-5 top-5 z-50">
          <span className="fixed right-4 top-4 m-4 rounded-lg bg-red-500 p-3 text-lg font-bold text-white shadow-lg">
            {t("remainingTime")} {minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div className="font-bolf rounded-full border border-primary px-8 py-2 text-base font-bold text-primary sm:text-lg">
          {format(selectedDate, "eee'.' dd',' MMM'.'", {
            locale: es,
          }).toUpperCase()}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-base font-bold text-primary sm:text-lg">
          {time}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-base font-bold text-primary sm:text-lg">
          {totalParticipants} Personas
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-base font-bold text-primary sm:text-lg">
          {language?.toUpperCase()}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            {t("title")}
          </span>
          <LineTitle className="mx-4 flex-grow rotate-180 text-primary" />
        </div>
      </div>

      {/* Seccion de Niños */}
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="mb-6 flex items-center justify-between p-3 sm:p-0">
          <div>
            <p className="text-sm sm:text-lg">{t("children.detail")}</p>
            <p className="text-sm text-gray-500 sm:text-base">
              {t("children.detailPay")}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="rounded-full border border-primary px-3 py-1 text-sm font-bold sm:text-lg"
              onClick={handleDecreaseChildren}
            >
              {t("symbols.-")}
            </button>
            <span className="mx-2 text-lg sm:mx-3 sm:text-2xl">{children}</span>
            <button
              className="rounded-full border border-primary px-3 py-1 text-sm font-bold sm:text-lg"
              onClick={handleIncreaseChildren}
            >
              {t("symbols.+")}
            </button>
          </div>
        </div>

        {/* Selección de alergias */}
        <div className="mb-6 flex items-center justify-between p-3 text-left sm:p-0">
          <p className="text-sm font-semibold sm:text-lg">
            {t("allergies.title")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              className={`rounded-full border px-5 py-2 text-sm font-bold sm:px-8 sm:text-lg ${
                hasAllergies
                  ? "bg-primary text-white"
                  : "border-primary text-primary"
              }`}
              onClick={() => setHasAllergies(true)}
            >
              {t("allergies.button.si")}
            </button>
            <button
              className={`rounded-full border px-5 py-2 text-sm font-bold sm:px-8 sm:text-lg ${
                !hasAllergies
                  ? "bg-primary text-white"
                  : "border-primary text-primary"
              }`}
              onClick={() => setHasAllergies(false)}
            >
              {t("allergies.button.no")}
            </button>
          </div>
        </div>

        {/* Campo para especificar alergias */}
        {hasAllergies && (
          <textarea
            placeholder={t("allergies.placeholder")}
            value={allergies}
            onChange={handleAllergiesChange}
            className="m-3 mb-6 w-full rounded-md border p-2 text-gray-700 sm:m-0"
            rows={3}
          />
        )}

        {/* Resumen de la reserva */}
        <div className="mx-[15px] mb-6 max-w-lg rounded-md border border-gray-200 bg-white p-6 shadow-2xl sm:mx-auto">
          <h3 className="mb-4 text-lg font-semibold sm:text-2xl">
            {t("abstract.title")}
          </h3>
          <div className="mb-6 flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="relative mr-2 flex h-[140px] w-[140px] items-center sm:h-[160px] sm:w-[160px]">
                <Image
                  src={Workshop}
                  alt="Workshop"
                  className="mr-3 rounded-md"
                />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold sm:text-base">
                  {t("abstract.workshops")}
                  {format(selectedDate, "eee'.' dd',' MMM'.'", {
                    locale: es,
                  }).toUpperCase()}
                </p>
                <p className="text-xs font-semibold sm:text-base">
                  {totalParticipants} {t("abstract.people")} {time}
                </p>
              </div>
            </div>
          </div>

          {/* Detalle de subtotal */}
          <div className="mb-6">
            <h4 className="mb-6 text-base font-semibold sm:text-lg">
              {t("subtotalDetail.title")}
            </h4>
            <div className="flex justify-between text-gray-700">
              <p className="text-sm sm:text-base">
                <strong>
                  {" "}
                  {t("subtotalDetail.adults")} ({participants}):
                </strong>{" "}
                ${adultPrice} x {participants}
              </p>
              <p className="text-sm font-bold sm:text-base">
                ${(participants * adultPrice).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p className="text-sm sm:text-base">
                <strong>
                  {" "}
                  {t("subtotalDetail.children")} ({children}):
                </strong>{" "}
                ${childPrice} x {children}
              </p>
              <p className="text-sm font-bold sm:text-base">
                ${(children * childPrice).toFixed(2)}
              </p>
            </div>

            {/* Subtotal final */}
            <div className="mt-4 flex justify-between text-gray-700">
              <p className="text-base font-semibold sm:text-lg">
                {t("subtotalDetail.title")}
              </p>
              <p className="text-base font-bold sm:text-lg">
                ${subTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Linea horizontal */}
          <div className="my-4 border-t border-gray-300"></div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="text-sm font-semibold sm:text-base">
              {t("total")}
            </span>
            <span className="text-base font-bold sm:text-lg">${total}</span>
          </div>

          {/* Linea horizontal */}
          <div className="my-4 mb-10 border-t border-gray-300"></div>

          {/* Checkbox para términos y condiciones */}
          <div className="mb-8 flex items-center space-x-3 font-commingSoon">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="form-checkbox h-5 w-5 rounded border-primary text-primary"
            />
            <label className="text-xs text-gray-700 sm:text-sm">
              {t("terms.accord")}
              <span className="text-primary">{t("terms.terms")}</span>
            </label>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="h-9 w-60 rounded-full bg-primary px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary sm:w-auto sm:text-xl"
              onClick={onBack}
            >
              {t("buttons.back")}
            </button>
            <button
              className="h-9 w-60 rounded-full bg-primary px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary sm:w-auto sm:text-xl"
              /* onClick={
                confirmed
                  ? handleRegisterClass
                  : () =>
                      showToast(
                        "Acepte los terminos y politicas para continuar",
                        "info",
                      )
              } */
              onClick={() => {
                {
                  confirmed
                    ? registerClass()
                    : showToast(t("toast.acceptTerms"), "info");
                }
              }}
            >
              {t("buttons.register")}
            </button>

            {/* Temporizador */}
            {showCountdown && (
              <Countdown
                date={Date.now() + 5 * 60 * 1000}
                renderer={countdownRenderer}
              />
            )}

            {/* Paypal Button */}
            <div className="flex items-center justify-center">
              {confirmed && showCountdown && classId !== null && (
                <PayPalButton
                  getTransactionData={getTransactionData}
                  onNext={onNext}
                  // onPaymentSuccess={handleConfirmPayment}
                  onPaymentSuccess={confirmPayment}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Confirmación final
export function Confirmation({ data }: ConfirmationProps) {
  const totalParticipants = data.participants + data.children;
  console.log("Data Confirmation:", data);
  const t = useTranslations("class.confirmation");

  return (
    <div className="mx-auto my-12 rounded-lg bg-white py-8 text-center shadow-lg">
      {/* Información general */}
      <div className="mb-8 flex flex-wrap justify-center gap-8">
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {data.date
            ? format(data.date, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : t("dateNotSelected")}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {totalParticipants} {t("people")}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {data.time}
        </div>
        <div className="rounded-full border border-primary px-8 py-2 text-sm font-bold text-primary sm:text-lg">
          {data.language.toUpperCase()}
        </div>
      </div>

      {/* Mensaje de confirmación */}
      <div className="mb-8 bg-primary py-3 text-white">
        <h2 className="font-commingSoon text-lg font-bold sm:text-2xl">
          {t("confirmation")}
        </h2>
      </div>

      {/* Detalles de la reserva */}
      <div className="grid grid-cols-1 gap-6 rounded-lg bg-white px-6 py-8 shadow-lg sm:grid-cols-2 sm:px-16 lg:px-20">
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-4 text-base font-semibold text-gray-800 sm:text-lg">
            {t("detail.title")}
          </h3>
          <p className="mb-2 text-base font-medium text-gray-700">
            <span className="mr-2 text-base sm:text-lg">👤</span>{" "}
            {data.userName}
          </p>
          <p className="mb-2 text-base font-medium text-gray-700">
            <span className="mr-2 text-base sm:text-lg">✉️</span>{" "}
            {data.userEmail}
          </p>
          <p className="mb-2 text-base font-medium text-gray-700">
            <span className="mr-2 text-base sm:text-lg">📞</span>{" "}
            {formatPhoneNumber(data.userPhone)}
          </p>
          <p className="text-base font-medium text-gray-700">
            <span className="mr-2 text-base sm:text-lg">👥</span>{" "}
            {data.participants} {t("detail.adults")}, {data.children}{" "}
            {t("detail.children")}
          </p>
          <p className="mt-4 text-sm text-gray-500">
            {t("detail.considerations.title")}
          </p>
          <p className="text-xs text-gray-600 sm:text-sm">
            {t("detail.considerations.message")}
          </p>
        </div>

        {/* Alergias */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-4 text-base font-semibold text-gray-800 sm:text-lg">
            {t("allergies.title")}
          </h3>
          <p className="text-sm font-medium text-gray-700 sm:text-base">
            <span className="font-bold">{t("allergies.allergie")}</span>
            {data.allergies
              ? `${t("allergies.allergie")}: ${data.allergies}`
              : t("allergies.none")}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChaqchaoLogo } from "@/assets/images/ChaqchaoLogo";
import Workshop from "@/assets/images/workshop_01.webp";
import {
  useRegisterClass,
  useConfirmClassPayment,
} from "@/hooks/use-class-registration";
import {
  useSchedulesQuery,
  useLanguagesQuery,
  usePricesQuery,
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
          className="h-12 w-36 rounded-full bg-primary py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary/90 sm:w-44 sm:text-lg"
        >
          {t("button")}
        </button>
      </div>
    </div>
  );
}

// Step2: Datos del usuario (Name, Email, Phone)
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
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
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
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
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
                <Calendar
                  selected={datePickerDate}
                  onSelect={(date: Date | undefined) => {
                    setSelectedDate(date);
                    updateData({ date });
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
  reservationData,
}: Steps4Props) {
  const [time, setTime] = useState(reservationData.time || "");

  const { data: schedules, isLoading, isError } = useSchedulesQuery();
  const t = useTranslations("class.step4");

  const handleTimeSelection = (selectedTime: string) => {
    setTime(selectedTime);
    updateData({ time: selectedTime });
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
    <div className="mx-auto w-full bg-white px-4 pb-48 pt-4 sm:px-0">
      <div className="relative mb-6 mt-0 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
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
  reservationData,
}: Steps5Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    reservationData.language || "",
  );

  const { data: languages, isLoading, isError } = useLanguagesQuery();
  const t = useTranslations("class.step5");

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language);
    updateData({ language });
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
    <div className="mx-auto w-full bg-white pb-48 pt-4 text-center">
      <div className="relative mb-6 mt-0 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
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
    <div className="mx-auto w-full bg-white pb-48 pt-4 text-center">
      <div className="relative mb-6 mt-0 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
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

  const {
    handleRegisterClass,
    classId,
    showCountdown,
    setShowCountdown,
    isLoading,
  } = useRegisterClass();
  const { confirmClassPayment, isLoading: isConfirmLoading } =
    useConfirmClassPayment();

  const { data: prices } = usePricesQuery();
  const t = useTranslations("class.step7");

  // Data for the transaction
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

  // Get updated data
  const getTransactionData = () => transactionDataRef.current;

  // Increasing the number of children
  const handleIncreaseChildren = () => {
    setChildren((prev) => prev + 1);
  };

  // Decrease the number of children
  const handleDecreaseChildren = () => {
    setChildren((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Update allergies
  const handleAllergiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAllergies = e.target.value;
    setAllergies(newAllergies);
    updateData({ allergies: newAllergies });
  };

  // Register a class
  const registerClass = async () => {
    const payload = {
      userName,
      userEmail,
      userPhone,
      scheduleClass: time,
      languageClass: language || "",
      dateClass: selectedDate.toISOString(),
      totalAdults: participants,
      totalChildren: children,
      typeCurrency: "DOLAR",
      comments: hasAllergies ? allergies : "Ninguna",
      paypalOrderId: "",
      paypalOrderStatus: "",
      paypalAmount: total.toFixed(2),
      paypalCurrency: "USD",
      paypalDate: "",
    };

    await handleRegisterClass(payload);
  };

  // Validate Payment
  const confirmPayment = async (paypalData: PaypalTransactionData) => {
    if (!classId) {
      showToast(t("toast.errorRegisterClass"), "error");
      return;
    }
    await confirmClassPayment(classId, paypalData);
  };

  // Function to stop the timer
  const cancelCountdown = () => {
    setShowCountdown(false);
    const message = t("toast.paymentCancelled");
    showToast(message, "error");
  };

  // Timer
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
      showToast(t("toast.timeOut"), "error");
      setShowCountdown(false);
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

  // Updating the number of participants
  useEffect(() => {
    setTotalParticipants(participants + children);
  }, [children, participants]);

  // Get adult and child prices
  useEffect(() => {
    if (prices) {
      const adult = prices.find((p) => p.classTypeUser === "ADULT");
      const child = prices.find((p) => p.classTypeUser === "CHILD");
      setAdultPrice(adult ? adult.price : 0);
      setChildPrice(child ? child.price : 0);
    }
  }, [prices]);

  // Calculate subtotal and total
  useEffect(() => {
    const calculatedSubTotal =
      participants * adultPrice + children * childPrice;
    setSubTotal(calculatedSubTotal);
    setTotal(calculatedSubTotal);
  }, [participants, children, adultPrice, childPrice]);

  // Update the number of children
  useEffect(() => {
    updateData({ children });
  }, [children, updateData]);

  // Update `transactionDataRef` when reservation data changes
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

  return (
    <div className="mx-auto w-full bg-white pb-48 pt-4 text-center">
      <div className="relative mb-6 mt-0 py-4">
        <div className="relative flex justify-center">
          <LineTitle className="mx-4 flex-grow text-primary" />
          <span className="bg-white px-4 text-lg font-bold sm:text-2xl">
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
        <div className="mx-[15px] mb-6 max-w-lg rounded-md border border-gray-200 bg-white p-6 sm:mx-auto">
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
          <div className="mb-8 flex items-center space-x-3">
            <label className="flex cursor-pointer items-center text-xs text-gray-700 sm:text-sm">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="form-checkbox mr-2 h-5 w-5 rounded border-primary text-primary"
              />
              <p className="text-left">
                {t("terms.accord")}
                <span className="text-primary">{t("terms.terms")}</span>
              </p>
            </label>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:flex-row">
            <button
              className="h-9 w-60 rounded-full bg-primary px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary sm:w-auto sm:text-xl"
              onClick={onBack}
            >
              {t("buttons.back")}
            </button>
            <button
              className="h-9 w-60 rounded-full bg-primary px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary sm:w-auto sm:text-xl"
              onClick={() => {
                {
                  confirmed
                    ? registerClass()
                    : showToast(t("toast.acceptTerms"), "info");
                }
              }}
              disabled={isLoading || isConfirmLoading}
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
              {confirmed && showCountdown && classId && (
                <PayPalButton
                  getTransactionData={getTransactionData}
                  onNext={onNext}
                  onPaymentSuccess={confirmPayment}
                  onCancel={cancelCountdown}
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
  const total = data.participants * 30 + data.children * 20;
  const t = useTranslations("class.confirmation");

  return (
    <div className="mx-auto my-12 w-[80%] max-w-4xl rounded-lg border border-gray-300 bg-white shadow-lg sm:w-full">
      {/* Encabezado */}
      <div className="flex items-start gap-4 border-b border-gray-300 p-4 sm:items-center sm:justify-between md:items-start">
        <div>
          <h1 className="mb-3 text-2xl font-bold text-gray-800">
            {t("detail.title")}
          </h1>
          <p className="mb-3 text-sm text-gray-600">
            <strong>{t("companyName")}</strong>Chaqchao Chocolate Factory
          </p>
          <p className="mb-3 text-sm text-gray-600">
            <strong>{t("phone")}</strong>958 086 581
          </p>
          <p className="mb-3 text-sm text-gray-600">
            <strong>{t("userEmail")}</strong>caja@chaqchao-chocolates.com
          </p>
        </div>
        <div className="mx-auto flex-shrink-0 sm:mx-0">
          <ChaqchaoLogo className="w-20 md:w-32" fill="white" />
        </div>
      </div>

      {/* Información General */}
      <div className="grid grid-cols-1 gap-4 border-b border-gray-300 p-4 text-sm text-gray-700 sm:grid-cols-2">
        <div>
          <p className="mb-3">
            <strong>{t("userName")}</strong> {data.userName}
          </p>
          <p className="mb-3">
            <strong>{t("userEmail")}</strong> {data.userEmail}
          </p>
          <p className="mb-3">
            <strong>{t("userPhone")}</strong>{" "}
            {formatPhoneNumber(data.userPhone)}
          </p>
          <p className="mb-3">
            <strong>{t("languageClass")}</strong> {data.language}
          </p>
          <p className="mb-3">
            <strong>{t("dateClass")}</strong>{" "}
            {format(data.date || new Date(), "dd/MM/yyyy", { locale: es })}
          </p>
        </div>
        <div>
          <p className="mb-3">
            <strong>{t("scheduleClass")}</strong> {data.time}
          </p>
          <p className="mb-3">
            <strong>{t("participantsClass")}</strong> {data.participants}{" "}
            {t("detail.adults")}, {data.children} {t("detail.children")}
          </p>
          <p className="mb-3">
            <strong>{t("userAllergies")}</strong>{" "}
            {data.allergies ? data.allergies : t("allergies.none")}
          </p>
          <p className="mb-3">
            <strong>{t("state")}</strong> Completed
          </p>
        </div>
      </div>

      {/* Detalles de Reserva */}
      <div className="overflow-x-auto p-4">
        <table className="w-full border border-gray-300 text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-r border-gray-300 p-2">
                {t("description")}
              </th>
              <th className="border-r border-gray-300 p-2">{t("quantity")}</th>
              <th className="border-r border-gray-300 p-2">{t("price")}</th>
              <th className="border-r border-gray-300 p-2">
                {t("typeCurrency")}
              </th>
              <th className="p-2">{t("amount")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r border-gray-300 p-2">
                {t("numberAdults")}
              </td>
              <td className="border-r border-gray-300 p-2 text-center">
                {data.participants}
              </td>
              <td className="border-r border-gray-300 p-2 text-center">30</td>
              <td className="border-r border-gray-300 p-2 text-center">USD</td>
              <td className="pr-5 text-right sm:pr-11">
                ${data.participants * 30}
              </td>
            </tr>
            <tr>
              <td className="border-r border-gray-300 p-2">
                {t("numberChildren")}
              </td>
              <td className="border-r border-gray-300 p-2 text-center">
                {data.children}
              </td>
              <td className="border-r border-gray-300 p-2 text-center">20</td>
              <td className="border-r border-gray-300 p-2 text-center">USD</td>
              <td className="pr-5 text-right sm:pr-11">
                ${data.children * 20}
              </td>
            </tr>
            <tr className="font-bold">
              <td className="border-r border-gray-300 p-2">Total</td>
              <td colSpan={5} className="pl-2 pr-5 text-right sm:pr-11">
                ${total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

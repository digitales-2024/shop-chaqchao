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
} from "@/types/steps";
import { showToast, formatPhoneNumber, isValidEmail } from "@/utils/helpers";
import { addDays, format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Countdown from "react-countdown";

import PayPalButton from "@/components/class/PaypalButton";
import { Calendar } from "@/components/ui/calendar";
import { NavigationButtons } from "@/components/ui/NavigationClassButtons";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function Step1({ onNext, updateData }: Steps1Props) {
  const handleNext = () => {
    updateData({
      confirmed: false,
    });
    onNext();
  };

  return (
    <div className="mx-auto w-full bg-white pb-48 pt-4">
      <div className="relative mb-6 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            HAZ UNA RESERVA
          </span>
        </div>
      </div>
      <div className="mx-auto w-1/2 text-center">
        <p className="mb-12 font-comfortaa text-sm leading-relaxed text-gray-700 sm:text-lg">
          ¡Puede reservar nuestra clase en nuestra tienda o reservarla con
          anticipación simplemente rellenando el siguiente formulario y pagando
          a través de PayPal! Nuestro equipo confirmará su reserva y pago por
          correo electrónico.
        </p>

        <button
          onClick={handleNext}
          className="h-12 w-36 rounded-full bg-[#D78428] px-0 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038] sm:w-44 sm:px-12 sm:text-lg"
        >
          RESERVA
        </button>
      </div>
    </div>
  );
}

export function Step2({ onNext, onBack, updateData }: Steps2Props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fullData, setFullData] = useState(false);

  // Verifica si hay campos vacíos
  const handleNext = () => {
    if (!userName || !userEmail || !userPhone) {
      showToast(
        "Por favor, complete todos los campos para continuar",
        "warning",
      );
      setEmailError("");
      setFullData(true);
      return;
    }

    // Luego, verifica si el correo es válido
    if (!isValidEmail(userEmail)) {
      showToast("Por favor, ingrese un correo electrónico válido", "warning");
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
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            INFORMACIÓN DE CONTACTO
          </span>
        </div>
      </div>
      <div className="mx-auto w-1/2 space-y-6 text-center">
        <input
          type="text"
          placeholder="Nombre completo"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full rounded-md border px-4 py-3 text-gray-700 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full rounded-md border px-4 py-3 text-gray-700 focus:outline-none"
        />
        {emailError && <p className="text-sm text-red-500">{emailError}</p>}

        <PhoneInput
          defaultCountry="PE"
          value={userPhone}
          onChange={(value) => setUserPhone(value || "")}
        />

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <NavigationButtons
            onNext={handleNext}
            onBack={onBack}
            isNextDisabled={fullData}
          />
        </div>
      </div>
    </div>
  );
}

// Step 3: Escoger fecha
export function Step3({ onNext, onBack, updateData }: Steps3Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [datePickerDate, setDatePickerDate] = useState<Date | undefined>(
    undefined,
  );
  const [fullData, setFullData] = useState(false);

  // Calcula los próximos 4 días empezando desde hoy
  const today = new Date();
  const nextDays = Array.from({ length: 4 }, (_, i) => addDays(today, i));

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    setDatePickerDate(undefined);
  };

  const handleNext = () => {
    if (!selectedDate && !datePickerDate) {
      showToast("Por favor, selecciona una fecha para continuar", "warning");
      return;
    }
    updateData({ date: datePickerDate || selectedDate });
    setFullData(true);
    onNext();
  };

  const handleBack = () => {
    onBack();
  };
  return (
    <div className="mx-auto w-full bg-white px-4 pb-48 pt-4 sm:px-0">
      <div className="relative mb-6 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            ESCOJA EL DÍA
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-4">
        {nextDays.map((day, index) => (
          <div
            key={day.getTime()}
            className="mx-3 flex flex-col items-center justify-center"
          >
            <span className="text-base font-bold sm:text-lg">
              {index === 0
                ? "HOY"
                : format(day, "EEE", { locale: es }).toUpperCase()}
            </span>
            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 sm:h-14 sm:w-14 ${
                selectedDate && isSameDay(selectedDate, day)
                  ? "bg-[#D78428] text-white"
                  : "bg-[#F5F5F5] text-[#A45C40] hover:bg-[#D78428] hover:text-white"
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
            <button className="mb-4 mt-8 flex items-center rounded-full border-2 border-[#D78428] px-6 py-2 text-[#A45C40] transition-all hover:bg-[#D78428] hover:text-white">
              <span>
                {selectedDate
                  ? format(selectedDate, "PPP", { locale: es })
                  : "MÁS FECHAS"}
              </span>
              <CalendarIcon className="ml-2 h-5 w-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-auto p-0">
            <Calendar
              selected={datePickerDate}
              onSelect={(date: Date | undefined) => {
                setSelectedDate(date);
              }}
              disabled={(date: Date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-center">
          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            isNextDisabled={fullData}
          />
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
}: Steps4Props) {
  const [time, setTime] = useState("");
  const [fullData, setFullData] = useState(false);

  const { data: schedules, isLoading, isError } = useSchedulesQuery();

  const handleNext = () => {
    if (!time) {
      showToast("Por favor, selecciona un horario para continuar.", "warning");
      return;
    }
    updateData({ time });
    setFullData(true);
    onNext();
  };
  return (
    <div className="mx-auto w-full bg-white px-4 pb-48 pt-10 text-center sm:px-0">
      <div className="mb-6 flex justify-center space-x-10">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no sleccionada"}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            HORARIOS DISPONIBLES
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 text-center text-gray-500">
        {/* Horarios de reserva disponible */}
        <div className="">
          <p className="mb-6 text-base font-semibold text-[#A45C40] sm:text-lg">
            Escoja el Horario
          </p>
          {isLoading ? (
            <p>Cargando horarios...</p>
          ) : isError ? (
            <p>Error al cargar horarios</p>
          ) : schedules && schedules.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {schedules.map((schedule, index) => (
                <button
                  key={index}
                  className={`rounded-full border px-6 py-2 text-base transition-all sm:text-lg ${
                    time === schedule.startTime
                      ? "bg-[#D78428] text-white"
                      : "border-[#D78428] text-[#D78428]"
                  } hover:bg-[#D78428] hover:text-white`}
                  onClick={() => setTime(schedule.startTime)}
                >
                  {schedule.startTime}
                </button>
              ))}
            </div>
          ) : (
            <p>No hay horarios disponibles</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <NavigationButtons
          onBack={onBack}
          onNext={handleNext}
          isNextDisabled={fullData}
        />
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
}: Steps5Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [fullData, setFullData] = useState(false);

  const { data: languages, isLoading, isError } = useLanguagesQuery();

  const handleNext = () => {
    if (!selectedLanguage) {
      showToast("Por favor, selecciona un idioma para continuar.", "warning");
      return;
    }
    updateData({ language: selectedLanguage });
    setFullData(true);
    onNext();
  };
  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no seleccionada"}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {time}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            SELECCIONA EL IDIOMA
          </span>
        </div>
      </div>

      {/* Selección de idiomas */}
      <div className="grid grid-cols-1 text-center text-gray-500">
        <div>
          <p className="mb-6 text-base font-semibold text-[#A45C40] sm:text-lg">
            Idiomas Disponible
          </p>
          {isLoading ? (
            <p>Cargando idiomas...</p>
          ) : isError ? (
            <p>Error al cargar idiomas.</p>
          ) : languages && languages.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((language, index) => (
                <button
                  key={index}
                  className={`rounded-full border px-6 py-2 text-sm transition-all sm:text-lg ${
                    selectedLanguage === language.languageName
                      ? "bg-[#D78428] text-white"
                      : "border-[#D78428] text-[#D78428]"
                  } hover:bg-[#D78428] hover:text-white`}
                  onClick={() => setSelectedLanguage(language.languageName)}
                >
                  {language.languageName.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            <p>No hay idiomas disponibles.</p>
          )}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <NavigationButtons
          onBack={onBack}
          onNext={handleNext}
          isNextDisabled={fullData}
        />
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
}: Steps6Props) {
  const [participants, setParticipants] = useState<number | null>(null);
  const [fullData, setFullData] = useState(false);

  const handleNext = () => {
    if (participants === null) {
      showToast(
        "Por favor, selecciona la cantidad de participantes para continuar.",
        "warning",
      );
      return;
    }
    updateData({ participants });
    setFullData(true);
    onNext();
  };

  const handleBack = () => {
    onBack();
  };
  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no seleccionada"}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {time}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {language?.toUpperCase()}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            CANTIDAD DE ADULTOS
          </span>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <div
            key={number}
            onClick={() => setParticipants(number)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg font-semibold transition-colors duration-300 sm:h-12 sm:w-12 ${
              participants === number
                ? "bg-[#D78428] text-white"
                : "bg-[#F5F5F5] text-[#A45C40] hover:bg-[#D78428] hover:text-white"
            }`}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <NavigationButtons
          onBack={handleBack}
          onNext={handleNext}
          isNextDisabled={fullData}
        />
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

  const enum TypeCurrency {
    Sol = "SOL",
    Dolar = "DOLAR",
  }

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
    TypeCurrency.Dolar,
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
      showToast(
        "El tiempo para realizar el pago ha expirado y su cupo fue cancelado",
        "error",
      );
      return null;
    } else {
      return (
        <div className="fixed right-5 top-5 z-50">
          <span className="fixed right-4 top-4 m-4 rounded-lg bg-red-500 p-3 text-lg font-bold text-white shadow-lg">
            Tiempo restante para realizar el pago: {minutes}:
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
        <div className="font-bolf rounded-full border border-[#D78428] px-8 py-2 text-base font-bold text-[#D78428] sm:text-lg">
          {format(selectedDate, "eee'.' dd',' MMM'.'", {
            locale: es,
          }).toUpperCase()}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-base font-bold text-[#D78428] sm:text-lg">
          {time}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-base font-bold text-[#D78428] sm:text-lg">
          {totalParticipants} Personas
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-base font-bold text-[#D78428] sm:text-lg">
          {language?.toUpperCase()}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            PERSONALIZA EXPERIENCIA
          </span>
        </div>
      </div>

      {/* Seccion de Niños */}
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="mb-6 flex items-center justify-between p-3 sm:p-0">
          <div>
            <p className="text-sm sm:text-lg">Niños mayores de 14 años</p>
            <p className="text-sm text-gray-500 sm:text-base">
              Ya pagan como adulto*
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="rounded-full border border-[#D78428] px-3 py-1 text-sm font-bold sm:text-lg"
              onClick={handleDecreaseChildren}
            >
              -
            </button>
            <span className="mx-2 text-lg sm:mx-3 sm:text-2xl">{children}</span>
            <button
              className="rounded-full border border-[#D78428] px-3 py-1 text-sm font-bold sm:text-lg"
              onClick={handleIncreaseChildren}
            >
              +
            </button>
          </div>
        </div>

        {/* Selección de alergias */}
        <div className="mb-6 flex items-center justify-between p-3 text-left sm:p-0">
          <p className="text-sm font-semibold sm:text-lg">
            Alergias o restricciones alimentarias
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              className={`rounded-full border px-5 py-2 text-sm font-bold sm:px-8 sm:text-lg ${
                hasAllergies
                  ? "bg-[#D78428] text-white"
                  : "border-[#D78428] text-[#D78428]"
              }`}
              onClick={() => setHasAllergies(true)}
            >
              SÍ
            </button>
            <button
              className={`rounded-full border px-5 py-2 text-sm font-bold sm:px-8 sm:text-lg ${
                !hasAllergies
                  ? "bg-[#D78428] text-white"
                  : "border-[#D78428] text-[#D78428]"
              }`}
              onClick={() => setHasAllergies(false)}
            >
              NO
            </button>
          </div>
        </div>

        {/* Campo para especificar alergias */}
        {hasAllergies && (
          <textarea
            placeholder="Especifique que alergias"
            value={allergies}
            onChange={handleAllergiesChange}
            className="m-3 mb-6 w-full rounded-md border p-2 text-gray-700 sm:m-0"
            rows={3}
          />
        )}

        {/* Resumen de la reserva */}
        <div className="mx-[15px] mb-6 max-w-lg rounded-md border border-gray-200 bg-white p-6 shadow-2xl sm:mx-auto">
          <h3 className="mb-4 text-lg font-semibold sm:text-2xl">
            Resumen de tu reserva
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
                  WORKSHOP,{" "}
                  {format(selectedDate, "eee'.' dd',' MMM'.'", {
                    locale: es,
                  }).toUpperCase()}
                </p>
                <p className="text-xs font-semibold sm:text-base">
                  {totalParticipants} PERSONAS - {time}
                </p>
              </div>
            </div>
          </div>

          {/* Detalle de subtotal */}
          <div className="mb-6">
            <h4 className="mb-6 text-base font-semibold sm:text-lg">
              Subtotal
            </h4>
            <div className="flex justify-between text-gray-700">
              <p className="text-sm sm:text-base">
                <strong> Adultos ({participants}):</strong> ${adultPrice} x{" "}
                {participants}
              </p>
              <p className="text-sm font-bold sm:text-base">
                ${(participants * adultPrice).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p className="text-sm sm:text-base">
                <strong> Niños ({children}):</strong> ${childPrice} x {children}
              </p>
              <p className="text-sm font-bold sm:text-base">
                ${(children * childPrice).toFixed(2)}
              </p>
            </div>

            {/* Subtotal final */}
            <div className="mt-4 flex justify-between text-gray-700">
              <p className="text-base font-semibold sm:text-lg">Subtotal</p>
              <p className="text-base font-bold sm:text-lg">
                ${subTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Linea horizontal */}
          <div className="my-4 border-t border-gray-300"></div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="text-sm font-semibold sm:text-base">Total</span>
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
              className="form-checkbox h-5 w-5 rounded border-[#D78428] text-[#D78428]"
            />
            <label className="text-xs text-gray-700 sm:text-sm">
              Estoy de acuerdo con los{" "}
              <span className="text-[#D78428]">
                Términos y Políticas de Privacidad.
              </span>
            </label>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="h-9 w-60 rounded-full bg-[#D78428] px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038] sm:w-auto sm:text-xl"
              onClick={onBack}
            >
              Atras
            </button>
            <button
              className="h-9 w-60 rounded-full bg-[#D78428] px-10 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038] sm:w-auto sm:text-xl"
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
                    : showToast(
                        "Acepte los terminos y politicas para continuar",
                        "info",
                      );
                }
              }}
            >
              Registrar Clase
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

  return (
    <div className="mx-auto my-12 rounded-lg bg-white py-8 text-center shadow-lg">
      {/* Información general */}
      <div className="mb-8 flex flex-wrap justify-center gap-8">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {data.date
            ? format(data.date, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no seleccionada"}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {totalParticipants} Personas
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {data.time}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-sm font-bold text-[#D78428] sm:text-lg">
          {data.language.toUpperCase()}
        </div>
      </div>

      {/* Mensaje de confirmación */}
      <div className="mb-8 bg-[#D78428] py-3 text-white">
        <h2 className="font-commingSoon text-lg font-bold sm:text-2xl">
          ¡RESERVA CONFIRMADA!
        </h2>
      </div>

      {/* Detalles de la reserva */}
      <div className="grid grid-cols-1 gap-6 rounded-lg bg-white px-6 py-8 shadow-lg sm:grid-cols-2 sm:px-16 lg:px-20">
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-4 text-base font-semibold text-gray-800 sm:text-lg">
            Detalles de la Reserva
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
            {data.participants} ADULTO(S), {data.children} NIÑO(S)
          </p>
          <p className="mt-4 text-sm text-gray-500">CONSIDERACIONES</p>
          <p className="font-comfortaa text-xs text-gray-600 sm:text-sm">
            *Llegar 5 min antes
          </p>
        </div>

        {/* Alergias */}
        <div className="rounded-lg bg-gray-50 p-6 shadow-md">
          <h3 className="mb-4 text-base font-semibold text-gray-800 sm:text-lg">
            Alergias
          </h3>
          <p className="text-sm font-medium text-gray-700 sm:text-base">
            {data.allergies ? `SÍ: ${data.allergies}` : "NINGUNA"}
          </p>
        </div>
      </div>
    </div>
  );
}

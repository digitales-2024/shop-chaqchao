import {
  useSchedulesQuery,
  useLanguagesQuery,
  usePricesQuery,
} from "@/redux/services/classApi";
import { ReservationData } from "@/types/reservationData";
import { addDays, format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Calendar } from "@/components/ui/calendar";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface Step1Props {
  onNext: () => void;
  updateData: (data: Partial<ReservationData>) => void;
}

export function Step1({ onNext, updateData }: Step1Props) {
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
          <span className="bg-white px-4 font-commingSoon text-xl font-bold sm:text-2xl">
            HAZ UNA RESERVA
          </span>
        </div>
      </div>
      <div className="mx-auto w-1/2 text-center">
        <p className="mb-12 font-comfortaa text-base leading-relaxed text-gray-700 sm:text-lg">
          ¡Puede reservar nuestra clase en nuestra tienda o reservarla con
          anticipación simplemente rellenando el siguiente formulario y pagando
          a través de PayPal! Nuestro equipo confirmará su reserva y pago por
          correo electrónico.
        </p>

        <button
          onClick={handleNext}
          className="h-12 w-44 rounded-full bg-[#D78428] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
        >
          RESERVA
        </button>
      </div>
    </div>
  );
}

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
}

export function Step2({ onNext, onBack, updateData }: Step2Props) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    // Primero, verifica si hay campos vacíos
    if (!userName || !userEmail || !userPhone) {
      setShowWarning(true); // Muestra el popup si falta algún campo
      setEmailError("");
      return;
    }

    // Luego, verifica si el correo es válido
    if (!isValidEmail(userEmail)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      setShowWarning(true); // Muestra el popup de advertencia si el email es inválido
      return;
    }

    // Todos los campos están completos y el correo es válido
    setEmailError("");
    setShowWarning(false);
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
          <span className="bg-white px-4 font-commingSoon text-xl font-bold sm:text-2xl">
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
          <button
            onClick={onBack}
            className="rounded-full bg-[#D78428] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          >
            ATRÁS
          </button>
          <button
            onClick={handleNext}
            className="rounded-full bg-[#D78428] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          >
            SIGUIENTE
          </button>
        </div>
      </div>

      {/* Popup de Advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 font-semibold text-red-500">
              Por favor, complete todos los campos para continuar.
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="mt-4 rounded-full bg-[#D78428] px-6 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
}

// Step 3: Escoger fecha
export function Step3({ onNext, onBack, updateData }: Step3Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [datePickerDate, setDatePickerDate] = useState<Date | undefined>(
    undefined,
  );
  const [showWarning, setShowWarning] = useState(false);

  // Calcula los próximos 4 días empezando desde hoy
  const today = new Date();
  const nextDays = Array.from({ length: 4 }, (_, i) => addDays(today, i));

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    setDatePickerDate(undefined);
  };

  const handleNext = () => {
    if (!selectedDate && !datePickerDate) {
      setShowWarning(true); // Muestra el popup si no se selecciona ninguna fecha
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
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-xl font-bold sm:text-2xl">
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
            <span className="text-xl font-bold sm:text-2xl">
              {index === 0 ? "Hoy" : format(day, "EEE", { locale: es })}
            </span>
            <div
              className={`flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ${
                selectedDate && isSameDay(selectedDate, day)
                  ? "bg-[#D78428] text-white"
                  : "bg-[#F5F5F5] text-[#A45C40] hover:bg-[#D78428] hover:text-white"
              } h-14 w-14 rounded sm:h-16 sm:w-16`}
              onClick={() => handleDateSelect(day)}
            >
              <span className="text-xl font-bold">
                {format(day, "d", { locale: es })}
              </span>
            </div>
            <span className="text-xs">
              {format(day, "MMM", { locale: es })}
            </span>
          </div>
        ))}
      </div>

      {/* Popover para DatePicker */}
      <div className="flex flex-col items-center">
        <Popover>
          <PopoverTrigger asChild>
            <button className="mb-4 mt-8 flex items-center rounded-full border border-[#A45C40] px-6 py-2 text-[#A45C40] transition-all hover:bg-[#A45C40] hover:text-white">
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
          <button
            className="rounded-full bg-[#D78428] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            onClick={handleBack}
          >
            ATRÁS
          </button>

          <button
            className="rounded-full bg-[#D78428] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            onClick={handleNext}
          >
            SIGUIENTE
          </button>
        </div>
      </div>

      {/* Popup de Advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 font-semibold text-red-500">
              Por favor, selecciona una fecha para continuar.
            </p>
            <button
              onClick={() => setShowWarning(false)} // Cierra el popup
              className="mt-4 rounded-full bg-[#D78428] px-6 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { time: string }) => void;
  selectedDate: Date;
}

// Step 4: Escoger horario
export function Step4({
  onNext,
  onBack,
  updateData,
  selectedDate,
}: Step4Props) {
  const [time, setTime] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const { data: schedules, isLoading, isError } = useSchedulesQuery();

  const handleNext = () => {
    if (!time) {
      setShowWarning(true);
      return;
    }
    updateData({ time });
    onNext();
  };

  return (
    <div className="mx-auto w-full bg-white px-4 pb-48 pt-10 text-center sm:px-0">
      <div className="mb-6 flex justify-center space-x-10">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
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
          <span className="bg-white px-4 font-commingSoon text-xl font-bold sm:text-2xl">
            HORARIOS DISPONIBLES
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 text-center text-gray-500">
        {/* Horarios de reserva disponible */}
        <div className="">
          <p className="mb-6 font-semibold text-[#A45C40]">
            Reserva Disponible
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
        <button
          className="rounded-full bg-[#D78428] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          onClick={onBack}
        >
          ATRÁS
        </button>

        <button
          className="rounded-full bg-[#D78428] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          onClick={handleNext}
        >
          SIGUIENTE
        </button>

        {/* Popup de Advertencia */}
        {showWarning && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="rounded-lg bg-white p-6 text-center shadow-lg">
              <p className="mb-4 font-semibold text-red-500">
                Por favor, selecciona un horario para continuar.
              </p>
              <button
                onClick={() => setShowWarning(false)} // Cierra el popup
                className="mt-4 rounded-full bg-[#D78428] px-6 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface Step5 {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
  selectedDate: Date;
  time: string;
}

// Step5: Escoger el idioma
export function Step5({
  onNext,
  onBack,
  updateData,
  selectedDate,
  time,
}: Step5) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [showWarning, setShowWarning] = useState(false);

  const { data: languages, isLoading, isError } = useLanguagesQuery();

  const handleNext = () => {
    if (!selectedLanguage) {
      setShowWarning(true);
      return;
    }
    updateData({ language: selectedLanguage });
    onNext();
  };

  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-6">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no seleccionada"}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
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
          <p className="mb-6 font-semibold text-[#A45C40]">
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
                  className={`rounded-full border px-6 py-2 text-base transition-all sm:text-lg ${
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
        <button
          className="rounded-full bg-[#D78428] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          onClick={onBack}
        >
          ATRÁS
        </button>

        <button
          className="rounded-full bg-[#D78428] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          onClick={handleNext}
        >
          SIGUIENTE
        </button>
      </div>

      {/* Popup de Advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 font-semibold text-red-500">
              Por favor, selecciona un idioma para continuar.
            </p>
            <button
              onClick={() => setShowWarning(false)} // Cierra el popup
              className="mt-4 rounded-full bg-[#D78428] px-6 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: { participants: number }) => void;
  selectedDate: Date;
  time: string;
  language: string | undefined;
}

// Step6: Escoger cantidad de participantes
export function Step6({
  onNext,
  onBack,
  updateData,
  time,
  selectedDate,
  language,
}: Step6Props) {
  const [participants, setParticipants] = useState<number | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleNext = () => {
    if (participants === null) {
      setShowWarning(true); //  Mostrar el popup si no hay selecciòn de participantes
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
      <div className="mb-6 flex flex-wrap justify-center gap-5">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {selectedDate
            ? format(selectedDate, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no seleccionada"}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {time}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {language?.toUpperCase()}
        </div>
      </div>

      <div className="relative mb-6 mt-8 py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 font-commingSoon text-lg font-bold sm:text-2xl">
            CANTIDAD DE PARTICIPANTES
          </span>
        </div>
      </div>
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <div
            key={number}
            onClick={() => setParticipants(number)}
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-lg font-semibold transition-colors duration-300 ${
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
        <button
          className="rounded-full bg-[#D78428] px-12 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          onClick={handleBack}
        >
          ATRÁS
        </button>

        <button
          className="rounded-full bg-[#D78428] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
          onClick={handleNext}
        >
          SIGUIENTE
        </button>
      </div>

      {/* Popup de Advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 font-semibold text-red-500">
              Por favor, selecciona la cantidad de participantes para continuar.
            </p>
            <button
              onClick={() => setShowWarning(false)} // Cierra el popup
              className="mt-4 rounded-full bg-[#D78428] px-6 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<ReservationData>) => void;
  selectedDate: Date;
  participants: number;
  time: string;
  language: string | undefined;
  handleSubmit: () => Promise<void>;
}

// Step 7: Alergias y confirmación
export function Step7({
  onNext,
  onBack,
  selectedDate,
  participants,
  time,
  language,
  updateData,
  handleSubmit,
}: Step7Props) {
  const [allergies, setAllergies] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [children, setChildren] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(participants);
  const [showWarning, setShowWarning] = useState(false);
  const { data: prices } = usePricesQuery();

  const [adultPrice, setAdultPrice] = useState(0);
  const [childPrice, setChildPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Actualizando el número de participantes
    setTotalParticipants(participants + children);
  }, [children, participants]);

  useEffect(() => {
    // Obtener los precios de adultos y niños del endpoint
    if (prices) {
      const adult = prices.find((p) => p.classTypeUser === "ADULT");
      const child = prices.find((p) => p.classTypeUser === "CHILD");
      setAdultPrice(adult ? adult.price : 0);
      setChildPrice(child ? child.price : 0);
    }
  }, [prices]);

  useEffect(() => {
    // Calculando el subtotal y el total dependiendo de los precios y la cantidad de niños y adulots
    const calculatedSubTotal =
      participants * adultPrice + children * childPrice;
    setSubTotal(calculatedSubTotal);
    setTotal(calculatedSubTotal);
  }, [participants, children, adultPrice, childPrice]);

  const handleIncreaseChildren = () => {
    setChildren((prev) => {
      const newChildren = prev + 1;
      updateData({ children: newChildren });
      return newChildren;
    });
  };

  const handleDecreaseChildren = () => {
    setChildren((prev) => {
      if (prev > 0) {
        const newChildren = prev - 1;
        updateData({ children: newChildren });
        return newChildren;
      }
      return prev;
    });
  };

  const handleAllergiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAllergies = e.target.value;
    setAllergies(newAllergies);
    updateData({ allergies: newAllergies });
  };

  const handleReservation = async () => {
    if (!confirmed) {
      setShowWarning(true);
      return;
    }
    updateData({ children, allergies, confirmed });
    await handleSubmit();
    onNext();
  };

  return (
    <div className="mx-auto w-full bg-white pb-48 pt-10 text-center">
      {/* Información seleccionada */}
      <div className="mb-6 flex flex-wrap justify-center gap-5">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {format(selectedDate, "eee'.' dd',' MMM'.'", {
            locale: es,
          }).toUpperCase()}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {time}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {totalParticipants} Personas
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
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
            <p className="text-sm text-gray-500">Ya pagan como adulto*</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="rounded-full border border-[#D78428] px-3 py-1 text-sm sm:text-lg"
              onClick={handleDecreaseChildren}
            >
              -
            </button>
            <span className="mx-3">{children}</span>
            <button
              className="rounded-full border border-[#D78428] px-3 py-1 text-sm sm:text-lg"
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
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              className={`rounded-full border px-6 py-2 text-sm sm:px-8 sm:text-lg ${
                hasAllergies
                  ? "bg-[#D78428] text-white"
                  : "border-[#D78428] text-[#D78428]"
              }`}
              onClick={() => setHasAllergies(true)}
            >
              SÍ
            </button>
            <button
              className={`rounded-full border px-5 py-2 text-sm sm:px-8 sm:text-lg ${
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
        <div className="mx-[15px] mb-6 max-w-lg rounded-md border border-gray-200 bg-white p-6 shadow-md sm:mx-auto">
          <h3 className="mb-4 text-lg font-semibold sm:text-2xl">
            Resumen de tu reserva
          </h3>
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center">
              <Image
                src=""
                alt="Workshop"
                width={80}
                height={80}
                className="mr-4 rounded-md"
              />
              <div>
                <p className="mb-1 text-xs font-semibold sm:text-sm">
                  WORKSHOP, {selectedDate.toDateString()}
                </p>
                <p className="text-xs sm:text-sm">
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
          <div className="mb-8 flex items-center space-x-4 font-commingSoon">
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
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="rounded-full bg-[#D78428] px-[75px] py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038] sm:text-lg"
              onClick={onBack}
            >
              ATRÁS
            </button>

            <button
              className="rounded-full bg-[#D78428] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038] sm:text-lg"
              onClick={handleReservation}
            >
              REALIZAR RESERVA
            </button>
          </div>
        </div>
      </div>

      {/* Popup de Advertencia */}
      {showWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4 font-semibold text-red-500">
              Por favor acepta los términos para continuar.
            </p>
            <button
              onClick={() => setShowWarning(false)}
              className="mt-4 rounded-full bg-[#D78428] px-6 py-2 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface ConfirmationProps {
  data: {
    date: Date | null;
    participants: number;
    children: number;
    language: string;
    time: string;
    allergies: string;
    confirmed: boolean;
    userName: string;
    userEmail: string;
    userPhone: string;
  };
}

// Función para formatear el número de teléfono
const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\+\d{2})(\d{9})/, "$1 $2");
};

// Confirmación final
export function Confirmation({ data }: ConfirmationProps) {
  const totalParticipants = data.participants + data.children;

  return (
    <div className="mx-auto my-12 rounded-lg bg-white py-8 text-center shadow-lg">
      {/* Información general */}
      <div className="mb-8 flex flex-wrap justify-center gap-8">
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {data.date
            ? format(data.date, "eee'.' dd',' MMM'.'", {
                locale: es,
              }).toUpperCase()
            : "Fecha no seleccionada"}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {totalParticipants} Personas
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {data.time}
        </div>
        <div className="rounded-full border border-[#D78428] px-8 py-2 text-lg text-[#D78428]">
          {data.language.toUpperCase()}
        </div>
      </div>

      {/* Mensaje de confirmación */}
      <div className="mb-8 bg-[#D78428] py-3 text-white">
        <h2 className="font-commingSoon text-lg font-bold sm:text-3xl">
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

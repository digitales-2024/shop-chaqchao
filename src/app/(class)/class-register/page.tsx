"use client";

import { useCreateClassRegistrationMutation } from "@/redux/services/classApi";
import { ReservationData } from "@/types/reservationData";
import React, { useState } from "react";

import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  Step7,
  Confirmation,
} from "@/components/Steps";

interface ApiError {
  data?: {
    message?: string;
  };
}

export default function ReservationPage() {
  const [step, setStep] = useState(1); // Estado para manejar los pasos
  const [isReservationSuccessful, setIsReservationSuccessful] = useState(false); // Estado para verificar éxito
  const [reservationData, setReservationData] = useState<ReservationData>({
    date: null,
    participants: 1,
    children: 0,
    time: "",
    allergies: "",
    confirmed: false,
    language: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    typeCurrency: "DOLAR",
  });

  const [createClassRegistration] = useCreateClassRegistrationMutation();

  const updateData = (data: Partial<ReservationData>) => {
    setReservationData((prev) => ({ ...prev, ...data }));
  };

  // Maneja el siguiente paso
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  // Maneja el paso anterior
  const previousStep = () => setStep((prevStep) => prevStep - 1);

  const formatPhoneNumber = (phone: string): string => {
    // Asegurarse de que el número comience con + y contenga un espacio entre el código y el número principal
    return phone.replace(/(\+\d{2})(\d{9})/, "$1 $2");
  };

  const handleSubmit = async () => {
    // Transformación de datos para el endpoint
    const formattedData = {
      userName: reservationData.userName,
      userEmail: reservationData.userEmail,
      userPhone: formatPhoneNumber(reservationData.userPhone),
      scheduleClass: reservationData.time,
      languageClass: reservationData.language || "español",
      dateClass: reservationData.date ? reservationData.date.toISOString() : "",
      totalAdults: reservationData.participants || 0,
      totalChildren: reservationData.children || 0,
      typeCurrency: "DOLAR",
      comments: reservationData.allergies || "Ninguna",
    };
    try {
      const result = await createClassRegistration(formattedData).unwrap();
      console.log("Reserva creada con éxito", result);
      alert("Reserva creada con éxito");
      setIsReservationSuccessful(true);
      nextStep(); // Avanza al paso final
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.data?.message || "Error al crear la reserva";
      alert(errorMessage);
      setIsReservationSuccessful(false);
      setStep(2);
    }
  };

  return (
    <div className="reservation-page">
      {/* Paso 1: Inicio */}
      {step === 1 && <Step1 onNext={nextStep} updateData={updateData} />}

      {/* Paso 2: Datos del Usuario */}
      {step === 2 && (
        <Step2
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
        />
      )}

      {/* Paso 3: Escoger fecha */}
      {step === 3 && (
        <Step3
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
        />
      )}

      {/* Paso 4: Escoger horario */}
      {step === 4 && reservationData.date && (
        <Step4
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          selectedDate={reservationData.date}
        />
      )}

      {/* Paso 5: Escoger idioma */}
      {step === 5 && reservationData.date && (
        <Step5
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          selectedDate={reservationData.date}
          time={reservationData.time}
        />
      )}

      {/* Paso 6: Escoger cantidad de participantes */}
      {step === 6 && reservationData.date && (
        <Step6
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          selectedDate={reservationData.date}
          time={reservationData.time}
          language={reservationData.language}
        />
      )}

      {/* Paso 7: Alergias y confirmación */}
      {step === 7 && reservationData.date && (
        <Step7
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          selectedDate={reservationData.date}
          time={reservationData.time}
          language={reservationData.language}
          participants={reservationData.participants}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Paso 8: Resumen de la Reserva */}
      {step === 8 && isReservationSuccessful && (
        <Confirmation
          data={{
            date: reservationData.date,
            participants: reservationData.participants,
            children: reservationData.children || 0,
            language: reservationData.language || "",
            time: reservationData.time,
            allergies: reservationData.allergies,
            confirmed: reservationData.confirmed,
            userName: reservationData.userName,
            userEmail: reservationData.userEmail,
            userPhone: reservationData.userPhone,
          }}
        />
      )}
    </div>
  );
}

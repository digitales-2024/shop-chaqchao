"use client";

import { ReservationData } from "@/types/reservationData";
import React, { useCallback, useState } from "react";

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

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [reservationData, setReservationData] = useState<ReservationData>({
    date: null,
    participants: 1,
    children: 0,
    time: "",
    allergies: "",
    confirmed: false,
    language: "",
    schedule: "",
    userName: "",
    userEmail: "",
    userPhone: "",
    typeCurrency: "DOLAR",
    totalAmount: 0,
  });

  // Manejo de los Steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => prevStep - 1);
  const updateData = useCallback((data: Partial<ReservationData>) => {
    setReservationData((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  return (
    <div>
      {/* Paso 1: Inicio */}
      {step === 1 && <Step1 onNext={nextStep} updateData={updateData} />}

      {/* Paso 2: Datos del Usuario */}
      {step === 2 && (
        <Step2
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          reservationData={reservationData}
        />
      )}

      {/* Paso 3: Escoger fecha */}
      {step === 3 && (
        <Step3
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          reservationData={reservationData}
        />
      )}

      {/* Paso 4: Escoger horario */}
      {step === 4 && reservationData.date && (
        <Step4
          onNext={nextStep}
          onBack={previousStep}
          updateData={updateData}
          selectedDate={reservationData.date}
          reservationData={reservationData}
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
          reservationData={reservationData}
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
          reservationData={reservationData}
        />
      )}

      {/* Paso 7: Alergias y confirmación */}
      {step === 7 && reservationData.date && (
        <Step7
          onNext={() => setStep(8)}
          onBack={previousStep}
          updateData={updateData}
          userName={reservationData.userName}
          userEmail={reservationData.userEmail}
          userPhone={reservationData.userPhone}
          selectedDate={reservationData.date}
          time={reservationData.time}
          language={reservationData.language}
          participants={reservationData.participants}
        />
      )}

      {/* Paso 8: Resumen de la Reserva */}
      {step === 8 && (
        <Confirmation
          data={{
            date: reservationData.date || new Date(),
            participants: reservationData.participants,
            children: reservationData.children || 0,
            language: reservationData.language || "",
            schedule: reservationData.schedule || "",
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

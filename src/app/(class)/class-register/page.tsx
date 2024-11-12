"use client";

// import { useCreateClassRegistrationMutation } from "@/redux/services/classApi";
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

/* interface ApiError {
  data?: {
    message?: string;
  };
} */

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  // const [isReservationSuccessful, setIsReservationSuccessful] = useState(false);
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
    totalAmount: 0,
  });

  // const [createClassRegistration] = useCreateClassRegistrationMutation();

  // Manejo de los Steps
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => prevStep - 1);

  /* const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/(\+\d{2})(\d{9})/, "$1 $2");
  }; */

  // Transformación de datos para el endpoint
  /* const handleSubmit = async () => {
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
      paypalOrderId: "",
      paypalOrderStatus: "",
      paypalAmount: "",
      paypalCurrency: "USD",
      paypalDate: "",
    };
    try {
      const result = await createClassRegistration(formattedData).unwrap();
      console.log("Reserva creada con éxito", result);
      setIsReservationSuccessful(true);
      setStep(8);
      // nextStep();
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError.data?.message || "Error al crear la reserva";
      console.error("Error:", errorMessage);
      setIsReservationSuccessful(false);
      setStep(2);
    }
  }; */

  const updateData = useCallback((data: Partial<ReservationData>) => {
    setReservationData((prevData) => ({
      ...prevData,
      ...data, // Actualiza solo los valores cambiados
    }));
  }, []);

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
          // onNext={handleSubmit}
          onBack={previousStep}
          updateData={updateData}
          userName={reservationData.userName}
          userEmail={reservationData.userEmail}
          userPhone={reservationData.userPhone}
          selectedDate={reservationData.date}
          time={reservationData.time}
          language={reservationData.language}
          participants={reservationData.participants}
          // handleSubmit={handleSubmit}
        />
      )}

      {/* Paso 8: Resumen de la Reserva */}
      {step === 8 /* && isReservationSuccessful */ && (
        <Confirmation
          data={{
            date: reservationData.date || new Date(),
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

import React from "react";

interface ReservationSummaryProps {
  date: string;
  participants: number;
  time: string;
  total: number;
}

export function ReservationSummary({
  date,
  participants,
  time,
  total,
}: ReservationSummaryProps) {
  return (
    <div className="max-w-lg rounded-md border border-gray-200 bg-white p-6 shadow-md">
      {/* Título */}
      <h3 className="mb-4 text-2xl font-semibold">Resumen de tu reserva</h3>

      {/* Sección de la imagen y descripción */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Workshop"
            className="mr-4 h-20 w-20 rounded-md"
          />
          <div>
            <p className="text-sm font-semibold">
              WORKSHOP, {date.toUpperCase()}
            </p>
            <p className="text-sm">
              {participants} PERSONAS - {time}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-600">TOTAL PARCIAL</p>
          <p className="text-lg font-bold">${total}</p>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="my-4 border-t border-gray-300"></div>

      {/* Total */}
      <div className="flex items-center justify-between text-gray-700">
        <span className="font-semibold">Total</span>
        <span className="text-lg font-bold">${total}</span>
      </div>

      {/* Casilla de verificación de términos y condiciones */}
      <div className="mt-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 rounded border-gray-300 text-[#D78428]"
          />
          <span className="ml-2 text-sm text-gray-700">
            Estoy de acuerdo con los{" "}
            <span className="text-[#D78428]">
              Términos y Políticas de Privacidad
            </span>
            .
          </span>
        </label>
      </div>

      {/* Botón de realizar reserva */}
      <div className="mt-6">
        <button className="w-full rounded-full bg-[#D78428] px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]">
          REALIZAR RESERVA
        </button>
      </div>
    </div>
  );
}

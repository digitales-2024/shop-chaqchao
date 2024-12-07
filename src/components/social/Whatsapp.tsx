"use client";
import { WhatsApp } from "@/assets/icons";

export default function WhatsAppButton() {
  const phoneNumber = "123456789"; // Reemplaza esto con tu número de WhatsApp
  const message = "Hola, me gustaría obtener más información."; // Mensaje predefinido (opcional)

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 p-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 sm:p-4"
      aria-label="Chatear por WhatsApp"
    >
      <WhatsApp className="size-5 sm:size-10" />
    </button>
  );
}

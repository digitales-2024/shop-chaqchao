import { socket } from "@/socket/socket";
import { useEffect, useState } from "react";

import { StaticMessage } from "./StaticMessage";

const messages = [
  {
    highlight: "Lo siento, el local se encuentra cerrado.",
    message: " ¡Regrese pronto!",
  },
  {
    highlight: "Nos encontramos fuera del horario de atención.",
    message: " lo esperamos mañana.",
  },
  {
    highlight: "Gracias por visitarnos.",
    message: " Mañana podra realizar sus compras.",
  },
];

const BusinessSchedule: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState<{
    highlight: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al WebSocket!");
    });

    socket.on(
      "business-schedule-updated",
      (data: { businessId: string; isOpen: boolean }) => {
        console.log(
          `Received update for business ${data.businessId}: isOpen = ${data.isOpen}`,
        );

        if (!data.isOpen) {
          // Seleccionar un mensaje aleatorio al cerrar
          const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];
          setCurrentMessage(randomMessage);
        } else {
          setCurrentMessage(null); // Limpiar el mensaje si el negocio está abierto
        }
      },
    );

    socket.on("disconnect", () => {
      console.log("Desconectado del WebSocket");
    });

    return () => {
      socket.off("business-schedule-updated");
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {currentMessage && <StaticMessage {...currentMessage} />}
    </div>
  );
};

export { BusinessSchedule };
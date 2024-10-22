import { socket } from "@/socket/socket";
import { useEffect, useState } from "react";

const BusinessSchedule: React.FC = () => {
  const [businessStates, setBusinessStates] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    // Escuchar el evento de estado de negocio actualizado
    socket.on("connect", () => {
      console.log("Conectado al WebSocket!"); // Mensaje al conectar
    });

    socket.on(
      "business-schedule-updated",
      (data: { businessId: string; isOpen: boolean }) => {
        setBusinessStates((prev) => ({
          ...prev,
          [data.businessId]: data.isOpen,
        }));
        console.log(`Business ID: ${data.businessId}, isOpen: ${data.isOpen}`);
      },
    );

    socket.on("disconnect", () => {
      console.log("Desconectado del WebSocket"); // Mensaje al desconectar
    });

    return () => {
      socket.off("business-schedule-updated");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(businessStates).map(([businessId, isOpen]) => (
        <div
          key={businessId}
          className={`rounded-lg border p-4 shadow-md ${isOpen ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"}`}
        >
          <div
            className={`flex items-center ${isOpen ? "text-green-600" : "text-red-600"}`}
          >
            <span className="mr-2">
              {isOpen ? (
                <span role="img" aria-label="open" className="text-2xl">
                  🟢
                </span> // Ícono para "abierto"
              ) : (
                <span role="img" aria-label="closed" className="text-2xl">
                  🔴
                </span> // Ícono para "cerrado"
              )}
            </span>
            <span className="font-medium">
              El negocio está {isOpen ? "abierto" : "cerrado"}.
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export { BusinessSchedule };

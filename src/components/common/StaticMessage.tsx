import React from "react";

interface StaticMessageProps {
  message: string;
  highlight: string; // Parte que se mostrará en negrita y color rojo-anaranjado
}

const StaticMessage: React.FC<StaticMessageProps> = ({
  message,
  highlight,
}) => {
  return (
    <div className="my-8 rounded-full border-l-4 border-rose-600 p-6 px-5 text-lg shadow-md">
      <span className="font-bold text-rose-600">{highlight}</span>
      <span className="text-gray-600"> {message}</span>
    </div>
  );
};

export { StaticMessage };

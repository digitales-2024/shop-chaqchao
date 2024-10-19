"use client";
import { useProfile } from "@/hooks/use-profile";
import React from "react";

const ProfileComponent = () => {
  const { clienteData } = useProfile();

  const handleButtonClick = () => {
    console.log(clienteData);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Obtener Perfil</button>
    </div>
  );
};

export default ProfileComponent;

import React from "react";

interface NavigationButtonsProps {
  onNext: () => void;
  onBack: () => void;
  isNextDisabled?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onBack,
  isNextDisabled,
}) => (
  <>
    <button
      onClick={onBack}
      className="w-36 rounded-full bg-[#D78428] px-0 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
    >
      ATRÁS
    </button>
    <button
      onClick={onNext}
      disabled={isNextDisabled}
      className="w-36 rounded-full bg-[#D78428] px-0 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#8c5038]"
    >
      SIGUIENTE
    </button>
  </>
);

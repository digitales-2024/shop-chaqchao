import React from "react";

interface NavigationButtonsProps {
  back: string;
  next: string;
  onNext: () => void;
  onBack: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  back,
  next,
  onNext,
  onBack,
}) => (
  <>
    <button
      onClick={onBack}
      className="w-36 rounded-full bg-primary px-0 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary/90"
    >
      {back}
    </button>
    <button
      onClick={onNext}
      className="w-36 rounded-full bg-primary px-0 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-secondary/90"
    >
      {next}
    </button>
  </>
);

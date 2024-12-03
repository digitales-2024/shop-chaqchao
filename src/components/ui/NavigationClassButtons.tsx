import React from "react";

import { Button } from "./button";

interface NavigationButtonsProps {
  back: string;
  next: string;
  onNext?: () => void;
  onBack?: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  back,
  next,
  onNext,
  onBack,
}) => (
  <>
    {onBack && (
      <Button
        onClick={onBack}
        className="w-36 rounded-full bg-primary px-0 py-3 text-base font-semibold"
      >
        {back}
      </Button>
    )}
    {onNext && (
      <Button
        onClick={onNext}
        className="w-36 rounded-full bg-primary px-0 py-3 text-base font-semibold"
      >
        {next}
      </Button>
    )}
  </>
);

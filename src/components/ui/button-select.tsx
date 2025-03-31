import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SimplifiedButtonSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export function ButtonSelect({
  value,
  onChange,
  options,
}: SimplifiedButtonSelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          variant={value === option.value ? "default" : "outline"}
          className={cn(
            "capitalize transition-all",
            value === option.value && "ring-2 ring-primary ring-offset-2",
          )}
          disabled={option.disabled}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

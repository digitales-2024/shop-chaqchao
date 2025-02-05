"use client";
import { useController, type Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
}

interface ButtonSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
}

export function ButtonSelect({ name, control, options }: ButtonSelectProps) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: options[0]?.value,
  });

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          variant={value === option.value ? "default" : "outline"}
          className={cn(
            "transition-all",
            value === option.value && "ring-2 ring-primary ring-offset-2",
          )}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

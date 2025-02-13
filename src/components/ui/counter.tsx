/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useController, type Control } from "react-hook-form";

interface CounterProps {
  name: string;
  control: Control<any>;
  min?: number;
  max?: number;
  step?: number;
}

export default function Counter({
  name,
  control,
  min = 0,
  max = 100,
  step = 1,
}: CounterProps) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    rules: { min, max },
    defaultValue: min,
  });

  const increment = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };
  return (
    <div className="flex w-fit items-center space-x-2 rounded-full border border-neutral-200">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
        onClick={decrement}
        aria-label="decrement quantity"
        type="button"
      >
        <Minus className="h-4 w-4 text-gray-600" />
      </motion.button>
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-8 text-center text-lg font-semibold"
      >
        {value}
      </motion.span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="increment quantity"
        className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
        onClick={increment}
        type="button"
      >
        <Plus className="h-4 w-4 text-gray-600" />
      </motion.button>
    </div>
  );
}

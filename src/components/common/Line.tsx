"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

const Line = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 border",
        orientation === "horizontal"
          ? "h-[1px] w-full border-t-gray-200 dark:border-t-gray-700"
          : "h-full w-[1px] border-l-gray-200 dark:border-l-gray-700",
        className,
      )}
      {...props}
    />
  ),
);
Line.displayName = SeparatorPrimitive.Root.displayName;

export { Line };

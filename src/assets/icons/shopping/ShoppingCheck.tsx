import { SVGProps } from "react";

import { cn } from "@/lib/utils";
export const ShoppingCheck = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 22"
    {...props}
    className={cn("size-5", className)}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 5 3-4h12l3 4M1 5v14a2 2 0 0 0 2 2h7M1 5h18m0 7V5m-5 4a4 4 0 1 1-8 0m6 9 2 3 5-6"
    />
  </svg>
);

import "@/styles/button-hero.css";
import useCartStore from "@/redux/store/cart";
import { ShoppingBag } from "lucide-react";
import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
export const ButtonCart = ({
  onClick,
  className,
  ...props
}: Readonly<{
  onClick?: () => void;
  className?: string;
}> &
  ComponentProps<"button">) => {
  const { cartItems } = useCartStore();
  return (
    <button
      onClick={onClick}
      className={cn(
        "group/cart group relative size-10 rounded-full bg-neutral-200 p-px",
        className,
      )}
      {...props}
    >
      <span
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{ transform: "translateZ(0)" }}
      >
        <span
          className="pointer-events-none absolute inset-0 select-none"
          style={{
            animation: "10s ease-in-out infinite alternate border-translate",
          }}
        >
          <span
            className="block size-24 -translate-x-1/2 -translate-y-1/3 blur-xl"
            style={{
              background: "linear-gradient(135deg, #cccccc, #f5833f, #F5833F)",
            }}
          />
        </span>
      </span>
      <span
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          animation: "10s ease-in-out infinite alternate border-glow-translate",
        }}
      >
        <span
          className="z-0 block h-full w-12 -translate-x-1/2 rounded-full blur-xl"
          style={{
            animation: "10s ease-in-out infinite alternate border-glow-scale",
            background: "linear-gradient(135deg, #cccccc, #f5833f, #F5833F)",
          }}
        />
      </span>

      <div className="absolute -bottom-2 -right-2 z-10">
        <span className="relative transition-transform group-hover:rotate-[360deg] group-hover:scale-105">
          <Badge className="inline-flex size-5 shrink-0 items-center justify-center">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </Badge>
          <span
            className="absolute left-1/2 top-1/2 size-11 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-lg dark:opacity-30"
            style={{
              animation: "14s ease-in-out infinite alternate star-shine",
              background:
                "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
            }}
          />
        </span>
      </div>

      <span className="relative z-[1] flex aspect-square w-full shrink-0 items-center justify-center rounded-full bg-neutral-50/90">
        <ShoppingBag className="group-hover/cart:animate-tada" />
      </span>
    </button>
  );
};

import "@/styles/button-hero.css";
import { Package } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
export const ButtonProducts = ({
  href,
  children,
  className,
  ...props
}: Readonly<{
  children?: string;
  href: string;
  className?: string;
}> &
  ComponentProps<"a">) => {
  return (
    <Link
      href={href}
      className={cn("group relative rounded-full bg-secondary p-px", className)}
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
              background: "linear-gradient(135deg, #7A69F9, #F26378, #F5833F)",
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
            background: "linear-gradient(135deg, #7A69F9, #F26378, #F5833F)",
          }}
        />
      </span>

      <span className="relative z-[1] flex w-full items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 pl-2">
        <span className="relative transition-transform group-hover:rotate-[360deg] group-hover:scale-105">
          <Package
            className="text-white dark:opacity-100"
            style={{
              animation:
                "14s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate star-rotate",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 size-11 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-lg dark:opacity-30"
            style={{
              animation: "14s ease-in-out infinite alternate star-shine",
              background:
                "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
            }}
          />
        </span>

        {children && (
          <span className="ml-1.5 transform-gpu truncate text-3xl text-transparent text-white transition group-hover:scale-105">
            {children}
          </span>
        )}
      </span>
    </Link>
  );
};

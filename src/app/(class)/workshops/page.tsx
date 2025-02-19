"use client";

import { ReservationSummary } from "@/components/classes/ReservationSumary";
import { StepsClass } from "@/components/classes/Steps";

export default function ReservationPage() {
  return (
    <section className="relative">
      <div className="hero absolute bottom-0 right-0 top-0 z-[1] h-full w-full opacity-10" />
      <div className="absolute bottom-0 right-0 top-0 z-[2] h-full w-full bg-gradient-radial from-transparent via-white to-white" />
      <div className="container relative z-[3] mx-auto flex flex-col-reverse items-center justify-center gap-4 sm:grid sm:grid-cols-2">
        <ReservationSummary />
        <StepsClass />
      </div>
    </section>
  );
}

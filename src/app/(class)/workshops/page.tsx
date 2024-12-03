"use client";

import { ReservationSummary } from "@/components/classes/ReservationSumary";
import { StepsClass } from "@/components/classes/Steps";
import Meteors from "@/components/core/Meteors";

export default function ReservationPage() {
  return (
    <section className="relative">
      <Meteors number={20} />
      <div className="container mx-auto grid min-h-screen grid-cols-2 items-center justify-center gap-4 py-32">
        <ReservationSummary />
        <StepsClass />
      </div>
    </section>
  );
}

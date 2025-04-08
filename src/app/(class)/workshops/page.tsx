"use client";

import { WorkshopInfo } from "@/components/classes/WorkshopInfo";
import WorkshopSelectDate from "@/components/classes/WorkshopSelectDate";

export default function ReservationPage() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_200px_200px]">
        <img
          src="/images/workshop_01.webp"
          alt="chaqchao factory"
          width={1920}
          height={1080}
          className="w-full"
        />
        <img
          src="/images/workshop_02.webp"
          alt="chaqchao factory"
          width={500}
          height={800}
          className="hidden h-full object-cover object-center sm:flex"
        />
        <img
          src="/images/workshop_03.webp"
          alt="chaqchao factory"
          width={1920}
          height={1080}
          className="hidden h-full object-cover object-center sm:flex"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <WorkshopInfo />
        <WorkshopSelectDate />
      </div>
    </section>
  );
}

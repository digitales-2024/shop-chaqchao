import { Featured } from "@/components/home/Featured";
import { Hero } from "@/components/home/Hero";
import { Recommend } from "@/components/home/Recommend";
import { Workshops } from "@/components/home/Workshops";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <Hero />
      <div className="container mx-auto space-y-20">
        <Workshops />
        <Recommend />
        <Featured />
      </div>
    </div>
  );
}

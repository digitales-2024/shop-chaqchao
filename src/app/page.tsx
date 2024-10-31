import { Featured } from "@/components/home/Featured";
import { Hero } from "@/components/home/Hero";
import { Recommend } from "@/components/home/Recommend";
import { Workshops } from "@/components/home/Workshops";

import LayoutShop from "./(shop)/layout";

export default function Home() {
  return (
    <LayoutShop>
      <div className="flex flex-col gap-20">
        <Hero />
        <Workshops />
        <Recommend />
        <Featured />
      </div>
    </LayoutShop>
  );
}

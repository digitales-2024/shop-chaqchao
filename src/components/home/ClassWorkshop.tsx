import PlaceholderChocolate from "@/assets/images/placeholder-chocolate.webp";
import PlaceholderCoffe from "@/assets/images/placeholder-coffe.webp";
import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import Image from "next/image";

import { BentoGrid } from "../core/BentoGrid";
import { HeroVideoDialog } from "../core/HeroVideoDialog";
import { InView } from "../core/InView";

export const ClassWorkshop = () => {
  return (
    // <div className="mx-auto my-12 grid w-full max-w-7xl grid-flow-dense grid-cols-2 gap-6 rounded-md p-4">
    <BentoGrid className="h-full auto-rows-auto grid-cols-3 grid-rows-2">
      <div className="col-span-2 col-start-1 row-start-1 auto-rows-auto">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateY: -100,
            },
            visible: {
              translateY: 0,
              opacity: 1,
            },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <HeroVideoDialog
            thumbnailSrc={PlaceholderCoffe.src}
            videoSrc="https://pub-843b15cc9c5d4932b34855ee68a2f5be.r2.dev/cafe.mp4"
            animationStyle="from-center"
            thumbnailAlt="Chaqchao Chocolate"
          />
        </InView>
      </div>
      <div className="col-start-3 row-start-1 auto-rows-auto">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateX: 100,
            },
            visible: {
              translateX: 0,
              opacity: 1,
            },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <Image
            src={ChaqchaoWorkshop01}
            alt="Christian Church, Eastern Europe"
            className="h-full w-full rounded-3xl object-cover"
          />
        </InView>
      </div>
      <div className="col-start-1 row-start-2 auto-rows-auto">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateX: -100,
            },
            visible: {
              translateX: 0,
              opacity: 1,
            },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <Image
            src={ChaqchaoWorkshop02}
            alt="Christian Church, Eastern Europe"
            className="h-full w-full rounded-3xl object-cover object-right"
          />
        </InView>
      </div>
      <div className="col-span-2 col-start-2 row-start-2 auto-rows-auto">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateY: 100,
            },
            visible: {
              translateY: 0,
              opacity: 1,
            },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <HeroVideoDialog
            thumbnailSrc={PlaceholderChocolate.src}
            videoSrc="https://pub-843b15cc9c5d4932b34855ee68a2f5be.r2.dev/chocolate.mp4"
            animationStyle="from-center"
            thumbnailAlt="Chaqchao Chocolate"
          />
        </InView>
      </div>
    </BentoGrid>
  );
};

import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import ChaqchaoWorkshop03 from "@/assets/images/workshop_03.webp";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { InView } from "../core/InView";

export const ClassWorkshop = () => {
  const images = [
    {
      src: ChaqchaoWorkshop01.src,
      alt: "Chaqchao Workshop 01",
    },
    {
      src: ChaqchaoWorkshop02.src,
      alt: "Chaqchao Workshop 02",
    },
    {
      src: ChaqchaoWorkshop03.src,
      alt: "Chaqchao Workshop 03",
    },
  ];

  return (
    <div className="mx-auto my-12 grid w-full max-w-7xl grid-flow-dense grid-cols-2 gap-6 rounded-md p-4">
      {images.map(({ src, alt }, idx) => (
        <InView
          key={idx}
          variants={{
            hidden: {
              opacity: 0,
              translateX: (idx === 1 && 100) || 0,
              translateY: idx === 0 ? -100 : idx === 2 ? 100 : 0,
            },
            visible: {
              translateX: 0,
              translateY: (idx === 0 && 0) || 0,
              opacity: 1,
            },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={cn("col-span-1 grid-flow-dense overflow-hidden", {
            "row-span-2": idx === 0,
            "row-span-1": idx !== 0,
          })}
        >
          <Image
            className="h-full rounded-3xl object-cover"
            width={400}
            height={400}
            src={src}
            alt={alt}
          />
        </InView>
      ))}
    </div>
  );
};

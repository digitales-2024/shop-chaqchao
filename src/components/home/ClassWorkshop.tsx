import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import ChaqchaoWorkshop03 from "@/assets/images/workshop_03.webp";
import Image from "next/image";

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
    <div className="flex w-full flex-col items-center justify-end gap-20">
      {images.map(({ src, alt }, idx) => (
        <InView
          key={idx}
          variants={{
            hidden: { filter: "blur(10px)", opacity: 0 },
            visible: { filter: "blur(0px)", opacity: 1 },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            className="mb-4 size-full rounded-lg object-contain"
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

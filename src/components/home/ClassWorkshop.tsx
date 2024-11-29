import ChaqchaoWorkshop01 from "@/assets/images/workshop_01.webp";
import ChaqchaoWorkshop02 from "@/assets/images/workshop_02.webp";
import ChaqchaoWorkshop03 from "@/assets/images/workshop_03.webp";
import Image from "next/image";

import { InView } from "../core/InView";

export const ClassWorkshop = () => {
  return (
    <div className="flex w-full flex-row items-center justify-end gap-20">
      <div className="inline-flex items-end">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateX: -50,
            },
            visible: {
              opacity: 1,
              translateX: 0,
            },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewOptions={{ margin: "0px 0px -350px 0px" }}
          className="overflow-hidden"
        >
          <Image
            src={ChaqchaoWorkshop01}
            alt="Chaqchao Workshop 01"
            className="h-auto w-[30rem] rounded-3xl"
          />
        </InView>
      </div>
      <div className="flex flex-col gap-20">
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateX: 50,
            },
            visible: {
              opacity: 1,
              translateX: 0,
            },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewOptions={{ margin: "0px 0px -350px 0px" }}
          className="overflow-hidden"
        >
          <Image
            src={ChaqchaoWorkshop02}
            alt="Chaqchao Workshop 01"
            className="h-auto w-[30rem] rounded-3xl"
          />
        </InView>
        <InView
          variants={{
            hidden: {
              opacity: 0,
              translateX: 50,
            },
            visible: {
              opacity: 1,
              translateX: 0,
            },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewOptions={{ margin: "0px 0px -350px 0px" }}
          className="overflow-hidden"
        >
          <Image
            src={ChaqchaoWorkshop03}
            alt="Chaqchao Workshop 01"
            className="h-auto w-[30rem] rounded-3xl"
          />
        </InView>
      </div>
    </div>
  );
};

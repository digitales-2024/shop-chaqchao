"use client";
import { useClass } from "@/hooks/use-class";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ClassClient } from "@/types";
import { useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Separator } from "../ui/separator";
import { ClassesDetail } from "./ClassesDetail";
import { ClassesList } from "./ClassesList";

interface ClassesClientProps {
  defaultLayout: number[] | undefined;
}

export const ClassesClient = ({
  defaultLayout = [30, 50],
}: ClassesClientProps) => {
  const [classSelect, setClassSelect] = useState<ClassClient | null>(null);
  const isDesktop = useMediaQuery("(min-width: 624px)");

  const { data: classes } = useClass();

  if (isDesktop) {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:classess=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="w-full items-stretch"
      >
        <ResizablePanel defaultSize={defaultLayout[0]} minSize={30}>
          <ClassesList
            items={classes}
            classSelect={classSelect}
            setClassSelect={setClassSelect}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <ClassesDetail classClient={classSelect} />
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <ClassesList
        items={classes}
        classSelect={classSelect}
        setClassSelect={setClassSelect}
      />
      <Separator />
      <ClassesDetail classClient={classSelect} />
    </div>
  );
};

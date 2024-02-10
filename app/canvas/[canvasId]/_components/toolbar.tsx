import {
  Circle,
  MousePointer2,
  Pencil,
  Redo,
  Square,
  StickyNote,
  Type,
  Undo,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./tool-button";

export const Toolbar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          icon={MousePointer2}
          label="Select"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Type}
          label="Text"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={StickyNote}
          label="Sticky Note"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Square}
          label="Rectangle"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Circle}
          label="Ellipses"
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          icon={Pencil}
          label="Pen"
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          icon={Undo}
          label="Undo"
          onClick={() => {}}
          isDisabled={true}
        />
        <ToolButton
          icon={Redo}
          label="Redo"
          onClick={() => {}}
          isDisabled={true}
        />
      </div>
    </div>
  );
};

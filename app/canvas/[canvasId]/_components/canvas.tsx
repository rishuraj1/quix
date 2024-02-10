"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import { useSelf } from "@/liveblocks.config";

interface CanvasProps {
  canvasId: string;
}

export const Canvas = ({ canvasId }: CanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info canvasId={canvasId} />
      <Participants />
      <Toolbar />
    </main>
  );
};

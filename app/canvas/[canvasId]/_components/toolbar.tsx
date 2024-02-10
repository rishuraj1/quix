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
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          icon={MousePointer2}
          label="Select"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.None,
            })
          }
          isActive={
            canvasState?.mode === CanvasMode.None ||
            canvasState?.mode === CanvasMode?.Translating ||
            canvasState?.mode === CanvasMode?.Resizing ||
            canvasState?.mode === CanvasMode?.Pressing ||
            canvasState?.mode === CanvasMode?.SelectionNet
          }
        />
        <ToolButton
          icon={Type}
          label="Text"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState?.mode === CanvasMode.Inserting &&
            canvasState?.layerType === LayerType.Text
          }
        />
        <ToolButton
          icon={StickyNote}
          label="Sticky Note"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          isActive={
            canvasState?.mode === CanvasMode.Inserting &&
            canvasState?.layerType === LayerType.Note
          }
        />
        <ToolButton
          icon={Square}
          label="Rectangle"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            canvasState?.mode === CanvasMode.Inserting &&
            canvasState?.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          icon={Circle}
          label="Ellipses"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState?.mode === CanvasMode.Inserting &&
            canvasState?.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          icon={Pencil}
          label="Pen"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState?.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          icon={Undo}
          label="Undo"
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          icon={Redo}
          label="Redo"
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

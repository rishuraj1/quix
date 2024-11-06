import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calcFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBasedOnHeight, fontSizeBasedOnWidth);
};

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handlerContentChange = (e: ContentEditableEvent) =>
    updateValue(e.target.value);

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        cursor: "move",
        backgroundColor: fill ? colorToCSS(fill) : "#000",
      }}
      className="drop-shadow-xl shadow-md"
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handlerContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center",
          "text-center outline-none",
          font.className,
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : "#000",
          fontSize: `${calcFontSize(width, height)}px`,
        }}
      />
    </foreignObject>
  );
};

export { Note };
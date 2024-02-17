"use client";

import { Hint } from "@/components/hint";
import { colorToCSS } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
  lastUsedColor: Color;
}

export const ColorPicker = ({ onChange, lastUsedColor }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[400px] pr-2 mr-2 border-r border-neutral-200">
      <Hint label="Choose Color" align="center" side="top" sideOffset={14}>
        <input
          type="color"
          value={colorToCSS(lastUsedColor)}
          className="rounded-full w-8 h-8 cursor-pointer"
          onChange={(e) => {
            const color = e.target.value;
            onChange({
              r: parseInt(color.slice(1, 3), 16),
              g: parseInt(color.slice(3, 5), 16),
              b: parseInt(color.slice(5, 7), 16),
            });
            console.log(color);
          }}
        />
      </Hint>
      <ColorButton onClick={onChange} color={{ r: 255, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 255, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 255 }} />
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="rounded-full w-6 h-6"
        style={{
          backgroundColor: colorToCSS(color),
        }}
      />
    </button>
  );
};

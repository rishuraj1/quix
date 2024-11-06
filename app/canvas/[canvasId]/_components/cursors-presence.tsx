"use client";

import { memo } from "react";

import {
  useOthers,
  useOthersConnectionIds,
  useOthersMapped,
} from "@/liveblocks.config";
import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import { Path } from "./path";
import { colorToCSS } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return <>{ids?.map((id) => <Cursor key={id} connectionId={id} />)}</>;
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow,
  );

  return (
    <>
      {others.map(([Key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={Key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCSS(other.penColor) : "black"}
            />
          );
        }
        return null;
      })}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";

"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";

import { RoomProvider } from "@/liveblocks.config";
import { Layer } from "@/types/canvas";

interface RoomProps {
  children: ReactNode;
  RoomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, RoomId, fallback }: RoomProps) => {
  return (
    <RoomProvider
      id={RoomId}
      initialPresence={{
        cursor: null,
        selection: [],
      }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList<string>(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

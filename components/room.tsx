"use client";

import { ReactNode } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";

interface RoomProps {
  children: ReactNode;
  RoomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, RoomId, fallback }: RoomProps) => {
  return (
    <RoomProvider id={RoomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

"use client";

import { Loader } from "lucide-react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export const Loading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Player src={"/loader.json"} autoplay loop />
    </main>
  );
};

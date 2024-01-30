import Image from "next/image";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center">
      <Image
        src="/logo.svg"
        width={120}
        height={120}
        alt="logo"
        className="animate-pulse"
      />
    </div>
  );
};

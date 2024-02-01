"use client";

import { Button } from "@/components/ui/button";
import { Player } from "@lottiefiles/react-lottie-player";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyCanvases = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.canvas.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      title: "Untitled",
      orgId: organization?.id,
    });
  };

  return (
    <div className="flex h-[calc(100%-80px)] justify-center items-center flex-col gap-5">
      <Player
        src={"/noResult.json"}
        background="transparent"
        autoplay
        loop
        className="w-[200px] h-[200px]"
      />
      <p className="text-zinc-700 justify-center text-center">
        No canvases found.
      </p>
      <Button disabled={pending} variant={"outline"} onClick={onClick}>
        Create a canvas
      </Button>
    </div>
  );
};

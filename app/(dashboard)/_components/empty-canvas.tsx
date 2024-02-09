"use client";

import { Button } from "@/components/ui/button";
import { Player } from "@lottiefiles/react-lottie-player";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyCanvases = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.canvas.create);
  const router = useRouter();

  const onClick = () => {
    if (!organization) return;

    mutate({
      title: "Untitled",
      orgId: organization?.id,
    })
      .then((id) => {
        toast.success("Canvas created!");
        router.push(`/canvas/${id}`);
      })
      .catch((err) => {
        toast.error("Failed to create canvas.");
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
        No canvases yet. Create one to get started!
      </p>
      <Button disabled={pending} variant={"outline"} onClick={onClick}>
        Create a canvas
      </Button>
    </div>
  );
};

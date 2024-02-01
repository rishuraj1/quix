"use client";

import { Player } from "@lottiefiles/react-lottie-player";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateOrganization } from "@clerk/nextjs";

export const EmptyOrg = () => {
  return (
    <div className="flex flex-col items-center justify-center lg:gap-0">
      <Player
        autoplay
        loop
        src="/notFound.json"
        className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
      ></Player>
      <h1 className="text-3xl font-bold text-zinc-700">No organizations</h1>
      <p className="text-muted-foreground flex items-center justify-center text-center">
        You don&apos;t have any organizations yet. Create one to get started.
      </p>

      <div className="lg:mt-6 mt-14">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"lg"} className="text-zinc-700">
              Create organization
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent flex border-none lg:max-w-[500px] max-w-[480px]">
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

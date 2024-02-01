import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Player } from "@lottiefiles/react-lottie-player";
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

export const EmptyCanvases = () => {
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
      <div className="justify-center flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Create a canvas</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a canvas</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

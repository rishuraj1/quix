"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Menu } from "lucide-react";

interface InfoProps {
  canvasId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ canvasId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.canvas.get, {
    id: canvasId as Id<"canvases">,
  });
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.4 h-12 flex items-center shadow-md">
      <Hint
        label="Go to home page"
        align="center"
        side="bottom"
        sideOffset={10}
      >
        <Button variant={"canvas"} className="px-2" asChild>
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className,
              )}
            >
              Quix
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Rename canvas" align="center" side="bottom" sideOffset={10}>
        <Button
          variant={"canvas"}
          className="text-base font-normal"
          onClick={() => onOpen(data?._id as string, data?.title as string)}
        >
          {data?.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={data?._id as string}
        title={data?.title as string}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"canvas"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

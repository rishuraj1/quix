"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewCanvasButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewCanvasButton = ({ orgId, disabled }: NewCanvasButtonProps) => {
  const { mutate, pending } = useApiMutation(api.canvas.create);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Canvas created!");
        // TODO: navigate to canvas
      })
      .catch((err) => {
        toast.error("Failed to create canvas.");
      });
  };

  return (
    <button
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 hover:bg-blue-800 rounded-md lg:hover:scale-110 transition ease-in-out duration-500 flex flex-col py-6 overflow-hidden items-center gap-2 justify-center",
        (pending || disabled) && "opacity-50 bg-blue-600 cursor-not-allowed",
      )}
      disabled={pending || disabled}
      onClick={onClick}
    >
      <Plus className="text-white w-12 h-12 stroke-1" />
      <p className="text-sm text-white font-light">New canvas</p>
    </button>
  );
};

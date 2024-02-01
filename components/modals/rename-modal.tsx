"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/use-rename-modal";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.canvas.update);
  const { isOpen, initialValues, onClose } = useRenameModal();
  const [title, setTitle] = useState(initialValues?.title);

  useEffect(() => {
    setTitle(initialValues?.title);
  }, [initialValues?.title]);

  const clearInput = () => {
    setTitle("");
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Canvas renamed");
        onClose();
      })
      .catch(() => {
        toast.error("Failed to rename canvas");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename canvas</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new name for the canvas.</DialogDescription>
        <form onSubmit={onSubmit} className="relative">
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Canvas name"
            disabled={pending}
          />
          {title && (
            <Button
              type="button"
              className="absolute 
                                          top-0 right-0"
              variant={"ghost"}
              onClick={clearInput}
            >
              <X className="text-zinc-700 w-4 h-4" />
            </Button>
          )}
          <DialogFooter className="mt-2 flex gap-2">
            <DialogClose asChild>
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

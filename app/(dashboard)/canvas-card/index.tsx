"use client";

import { formatDistanceToNow } from "date-fns";
import { Overlay } from "./overlay";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface CanvasCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  orgId: string;
  isFavourite: boolean;
  createdAt: number;
}

export const CanvasCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  orgId,
  isFavourite,
  createdAt,
}: CanvasCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavourite, pending: pendingFavourite } = useApiMutation(
    api.canvas.favourite,
  );
  const { mutate: onUnfavourite, pending: pendingUnfavourite } = useApiMutation(
    api.canvas.unfavourite,
  );

  const toggleFavourite = () => {
    if (isFavourite) {
      onUnfavourite({ id }).catch(() =>
        toast.error("Failed to unfavourite canvas"),
      );
    } else {
      onFavourite({ id, orgId }).catch(() =>
        toast.error("Failed to favourite canvas"),
      );
    }
  };

  return (
    <Link href={`/canvas/${id}`}>
      <div className="group aspect-[100/127] border rounded-md flex flex-col justify-between overflow-hidden  lg:hover:scale-110 transition ease-in-out duration-500">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right" sideOffset={8}>
            <button className="absolute top-1 right-1 py-2 px-3 outline-none lg:opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="text-blue-600 lg:text-white lg:opacity-75 hover:opacity-100 transition-opacity w-6 h-6" />
            </button>
          </Actions>
        </div>
        <Footer
          isFavourite={isFavourite}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          title={title}
          onClick={toggleFavourite}
          disabled={pendingFavourite || pendingUnfavourite}
        />
      </div>
    </Link>
  );
};

CanvasCard.Skeleton = function CanvasCardSkeleton() {
  return (
    <div className="group aspect-[100/127] rounded-md overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

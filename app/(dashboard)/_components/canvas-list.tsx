"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { EmptyCanvases } from "./empty-canvas";
import { EmptyFavourites } from "./empty-favourites";
import { EmptySearch } from "./empty-search";
import { CanvasCard } from "../canvas-card";
import { NewCanvasButton } from "./new-canvas-button";

interface CanvasListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const CanvasList = ({ orgId, query }: CanvasListProps) => {
  const data = useQuery(api?.canvases.get, { orgId });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl text-zinc-900">
          {query?.favourites ? "Favourites" : "Team canvases"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewCanvasButton orgId={orgId} disabled />
          <CanvasCard.Skeleton />
          <CanvasCard.Skeleton />
          <CanvasCard.Skeleton />
          <CanvasCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query?.search) {
    return <EmptySearch search={query?.search} />;
  }

  if (!data?.length && query?.favourites) {
    return <EmptyFavourites />;
  }

  if (!data?.length) {
    return <EmptyCanvases />;
  }

  return (
    <div>
      <h2 className="text-3xl text-zinc-900">
        {query?.favourites ? "Favourites" : "Team canvases"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {!query?.favourites && <NewCanvasButton orgId={orgId} />}
        {data?.map((canvas) => (
          <CanvasCard
            key={canvas?._id}
            id={canvas?._id}
            title={canvas?.title}
            imageUrl={canvas?.imageUrl}
            authorId={canvas?.authorId}
            authorName={canvas?.authorName}
            createdAt={canvas?._creationTime}
            orgId={canvas?.orgId}
            isFavourite={false}
          />
        ))}
      </div>
    </div>
  );
};

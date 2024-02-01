import { EmptyCanvases } from "./empty-canvas";
import { EmptyFavourites } from "./empty-favourites";
import { EmptySearch } from "./empty-search";

interface CanvasListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const CanvasList = ({ orgId, query }: CanvasListProps) => {
  const data = []; //change to api call

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
      <h1>Canvas List</h1>
      <p>Org ID: {orgId}</p>
      <p>Query: {JSON.stringify(query)}</p>
    </div>
  );
};

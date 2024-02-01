import { Player } from "@lottiefiles/react-lottie-player";

interface EmptySearchProps {
  search: string;
}

export const EmptySearch = ({ search }: EmptySearchProps) => {
  return (
    <div className="flex h-full justify-center items-center flex-col gap-5">
      <Player
        src={"/notFound.json"}
        background="transparent"
        autoplay
        loop
        className="w-[200px] h-[200px]"
      />
      <p className="">
        No canvases found for{" "}
        <span className="font-bold text-zinc-700">{search}</span>
      </p>
    </div>
  );
};

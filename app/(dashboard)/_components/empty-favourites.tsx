import { Player } from "@lottiefiles/react-lottie-player";

export const EmptyFavourites = () => {
  return (
    <div className="flex h-full justify-center items-center flex-col gap-5">
      <Player
        src={"/noResult.json"}
        background="transparent"
        autoplay
        loop
        className="w-[200px] h-[200px]"
      />
      <p className="">No favourite canvases found</p>
    </div>
  );
};

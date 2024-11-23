import { Slide } from '../../../store/playlist';

type PlaylistSlideBox = Slide & {
  index: number;
};

export default function PlaylistSlideBox({ text }: PlaylistSlideBox) {
  // TODO: on rag over card concat data if type add else add bg

  // TODO: add remove drag effect

  // TODO: add focus slide effect

  return (
    <button className="flex flex-shrink-0 justify-center items-center h-full w-[300px] text-lg overflow-y-auto border-l-2 border-r-2 border-[--border-two]">
      {text}
    </button>
  );
}

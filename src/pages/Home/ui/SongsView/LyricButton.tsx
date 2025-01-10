import { useEffect, useMemo, useState } from 'react';
import { addSlide, Slide } from '../../../../store/playlist';
import { FileEntry } from '@tauri-apps/api/fs';
import { readToSlides } from '../../../../lib/file';

export default function LyricsButton({
  name,
  path,
  index,
}: { index: number } & FileEntry) {
  const prettyName = useMemo(() => name?.split('.')[0], [name]);
  const [slides, setSlides] = useState<Slide[]>([]);

  const addSlideOnDBClick = async () => {
    if (slides.length > 0) {
      slides.forEach((slide) => addSlide(slide));
    }
  };

  useEffect(() => {
    const getContentFromFile = async () => {
      const slides: Slide[] | null = await readToSlides(path);

      if (!slides) return;

      setSlides(slides);
    };

    getContentFromFile();
  }, [index, name]);

  return (
    <button
      onDoubleClick={addSlideOnDBClick}
      className="flex flex-col items-start w-full border-2 border-[--border-one]  p-0.5 px-1 text-start hover:border-[--ac-one] hover:bg-[--ac-one] hover:text-[--text-two] duration-100 transition-all ease-linear space-y-1"
    >
      {prettyName}
    </button>
  );
}

import { useMemo, useState } from 'react';
import { Verse } from '../../../../api/requests';
import VerseContainer from './VerseContainer';
import { cn } from '../../../../lib/css';

type ChapterContainer = {
  book_name: string;
  chapter_name: string;
  chapter_num: string;
  verses: Verse;
};

export default function ChapterContainer({
  book_name,
  chapter_name,
  chapter_num,
  verses,
}: ChapterContainer) {
  const [isActive, setIsActive] = useState(false);

  const formattedVerses = useMemo(
    () =>
      Object.entries(verses).map((data) => ({
        verse_num: data[0],
        text: data[1],
      })),
    []
  );

  const toggle = () => setIsActive((prev) => !prev);

  return (
    <div className="flex flex-col items-start border-b-2 border-[--border-two]">
      <button
        onClick={toggle}
        id={`${book_name}:${chapter_name}`}
        className={`w-full p-0.5 px-1 pl-2 text-start hover:border-[--border-one] hover:bg-[--ac-two] hover:text-[--text-two] duration-100 transition-all ease-linear first-letter:capitalize ${cn(isActive, 'border-[--ac-one] bg-[--ac-one] text-[--text-two]')}`}
      >
        {book_name + ' ' + chapter_num}
      </button>
      <div
        className={`flex flex-col w-full border-t-2 border-[--border-one] overflow-hidden ${cn(isActive, 'scale-100', ' hidden scale-0')}`}
      >
        {formattedVerses.map((data, index) => (
          <VerseContainer
            key={index}
            book_name={book_name}
            chapter_name={chapter_name}
            chapter_num={chapter_name}
            verse_num={data.verse_num}
            text={data.text || ''}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { Verse } from '../../../../api/requests';
import VerseContainer from './VerseContainer';
import { cn } from '../../../../lib/css';
import { SearchResult } from '../../../../lib/fuzz';

type ChapterContainer = {
  book_name: string;
  chapter_name: string;
  chapter_num: string;
  verses: Verse;
  searchResults: SearchResult;
  scrollHandler: (targetTop: HTMLElement | null) => void;
};

export default function ChapterContainer({
  book_name,
  chapter_name,
  chapter_num,
  verses,
  searchResults,
  scrollHandler,
}: ChapterContainer) {
  const id = `${book_name}:${chapter_name}`;
  const cBRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (cBRef.current == null) return;
    if (searchResults.chapter == id) {
      setIsActive(searchResults.chapter == id);
      scrollHandler(cBRef.current);
    } else {
      setIsActive(false);
    }
  }, [searchResults.chapter]);

  return (
    <div className="flex flex-col items-start border-b-2 border-[--border-two]">
      <button
        onClick={toggle}
        ref={cBRef}
        id={id}
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
            searchResults={searchResults}
            scrollHandler={scrollHandler}
          />
        ))}
      </div>
    </div>
  );
}

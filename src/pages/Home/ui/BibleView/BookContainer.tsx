import { useMemo, useState } from 'react';
import { Book } from '../../../../api/requests';
import ChapterContainer from './ChapterContainer';
import { cn } from '../../../../lib/css';

type BookContainer = Book & {};

export default function BookContainer({ book_name, chapters }: BookContainer) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const formattedChapters = useMemo(
    () =>
      Object.entries(chapters).map((data) => ({
        book_name,
        chapter_name: `chapter ${data[0]}`,
        chapter_num: data[0],
        verses: data[1],
      })),
    []
  );

  const toggle = () => setIsActive((prev) => !prev);

  return (
    <div className="flex flex-col items-start border-2 border-[--border-one]">
      <button
        onClick={toggle}
        id={`${book_name}`}
        className={`w-full p-0.5 px-1 text-start hover:border-[--ac-one] hover:bg-[--ac-one] hover:text-[--text-two] duration-100 transition-all ease-linear ${cn(isActive, "bg-[--ac-two] text-[--text-two]")} duration-200 transition-all ease-linear`}
      >
        {book_name}
      </button>
      {isActive && (
        <div className="flex flex-col w-full border-t-2 border-[--bg-one]">
          {formattedChapters.map((data, index) => (
            <ChapterContainer key={index} {...data} />
          ))}
        </div>
      )}
    </div>
  );
}

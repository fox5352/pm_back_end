import { useEffect, useMemo, useRef, useState } from 'react';
import { Bible, Book, Verse } from '../../../api/requests';

import styles from './bibleview.module.css';
import { cn } from '../../../lib/css';

export default function BibleView() {
  const snapShotOfBible = useMemo(
    () => Bible.getBibleData,
    [Bible.getBibleData]
  );

  return (
    <div className={styles.body}>
      <div className={styles.input_container}>
        <input className={styles.input} type="text" />
      </div>
      <div className={styles.bible_view_content}>
        {snapShotOfBible.map((book, index) => (
          <BookContainer key={index} {...book} />
        ))}
      </div>
    </div>
  );
}

type BookContainer = Book & {};

function BookContainer({ book_name, chapters }: BookContainer) {
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
        className="w-full p-0.5 px-1 text-start hover:border-[--ac-one] hover:bg-[--ac-one] hover:text-[--text-two] duration-100 transition-all ease-linear"
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
// verses: {1: 'And Jehovah spake unto Moses,}

type ChapterContainer = {
  book_name: string;
  chapter_name: string;
  chapter_num: string;
  verses: Verse;
};

function ChapterContainer({
  book_name,
  chapter_name,
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
        className={`w-full p-0.5 px-1 text-start hover:border-[--border-one] hover:bg-[--ac-one] hover:text-[--text-two] duration-100 transition-all ease-linear first-letter:capitalize ${cn(isActive, 'border-[--ac-one] bg-[--ac-one] text-[--text-two]')}`}
      >
        {chapter_name}
      </button>
      <div
        className={`flex flex-col w-full border-t-2 border-[--border-one] overflow-hidden ${cn(isActive, 'scale-100', ' hidden scale-0')}`}
      >
        {formattedVerses.map((data, index) => (
          <VerseContainer
            key={index}
            book_name={book_name}
            chapter_name={chapter_name}
            verse_num={data.verse_num}
            text={data.text || ''}
          />
        ))}
      </div>
    </div>
  );
}

type VerseContainer = {
  book_name: string;
  chapter_name: string;
  verse_num: string;
  text: string;
};

function VerseContainer({
  book_name,
  chapter_name,
  verse_num,
  text,
}: VerseContainer) {
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      if (!pRef.current) return;
      event.dataTransfer?.setData(
        'text/plain',
        pRef.current?.textContent || 'test'
      );
      pRef.current.style.opacity = '0.5';
    };
    const handleDragEnd = (event: DragEvent) => {
      if (pRef.current) pRef.current.style.opacity = '1';
    };

    if (pRef.current) {
      pRef.current.addEventListener('dragstart', handleDragStart);

      pRef.current.addEventListener('dragend', handleDragEnd);
    }
    return () => {
      pRef.current?.removeEventListener('dragstart', handleDragStart);
      pRef.current?.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  return (
    <p
      ref={pRef}
      id={`${book_name}:${chapter_name}:${verse_num}`}
      draggable
      className="w-full p-0.5 px-2 text-start border-b-2 border-[--border-two] hover:bg-[--ac-two] hover:text-[--text-two] duration-100 transition-all ease-linear"
    >
      {text}
    </p>
  );
}

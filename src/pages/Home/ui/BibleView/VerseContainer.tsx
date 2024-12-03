import { useEffect, useRef } from 'react';

export type Verse = {
  book_name: string;
  chapter_name: string;
  chapter_num: string;
  verse_num: string;
  text: string;
};

export type VerseContainer = Verse;

export default function VerseContainer({
  book_name,
  chapter_name,
  chapter_num,
  verse_num,
  text,
}: VerseContainer) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleDragStart = (event: DragEvent) => {
    if (!pRef.current) return;
    const data = {
      type: 'add_verse',
      payload: {
        book_name,
        chapter_name,
        chapter_num,
        verse_num,
        text,
      },
    };

    event.dataTransfer?.setData('text/plain', JSON.stringify(data));

    pRef.current.style.opacity = '0.5';
  };
  const handleDragEnd = (event: DragEvent) => {
    event.preventDefault();
    if (pRef.current) pRef.current.style.opacity = '1';
  };

  useEffect(() => {
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
      className="w-full p-0.5 px-2 pl-3 text-start border-b-2 border-[--border-two] hover:bg-[--ac-two] hover:text-[--text-two] duration-100 transition-all ease-linear"
    >
      {verse_num}: {text}
    </p>
  );
}

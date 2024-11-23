import { useEffect, useRef } from 'react';

type VerseContainer = {
  book_name: string;
  chapter_name: string;
  verse_num: string;
  text: string;
};

export default function VerseContainer({
  book_name,
  chapter_name,
  verse_num,
  text,
}: VerseContainer) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const handleDragStart = (event: DragEvent) => {
    if (!pRef.current) return;
    const data = {
      type: 'add_text',
      payload: pRef.current?.textContent,
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
      className="w-full p-0.5 px-2 text-start border-b-2 border-[--border-two] hover:bg-[--ac-two] hover:text-[--text-two] duration-100 transition-all ease-linear"
    >
      {text}
    </p>
  );
}

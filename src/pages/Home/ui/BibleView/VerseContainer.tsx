import React, { useRef } from 'react';

import {
  addSlide,
  updateSlide,
  getListItem,
  Slide,
  Content,
  getIndex,
} from '../../../../store/playlist';

export type Verse = {
  book_name: string;
  chapter_name: string;
  chapter_num: string;
  verse_num: string;
  text: string;
};

export type VerseContainer = Verse & {};

export default function VerseContainer({
  book_name,
  chapter_name,
  chapter_num,
  verse_num,
  text,
}: VerseContainer) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const addSlideOnDBClick = async () => {
    const newText: Content[] = [
      {
        tag: 'h2',
        content: `${book_name} ${chapter_num}:${verse_num}`,
      },
      { tag: 'p', content: text },
    ];

    const newSlide: Slide = {
      id: `${Math.round(Math.random() * 999)}${Math.round(Math.random() * 999)}`,
      text: newText,
      bg: null,
    };

    const index = await getIndex();

    if (index !== null) {
      const res: Slide | null = await getListItem(index);

      if (res === null) {
        addSlide(newSlide);
      } else {
        const newText: Content[] = [
          {
            tag: 'h2',
            content: `${book_name} ${chapter_num}:${verse_num}`,
          },
          { tag: 'p', content: text },
        ];

        const updatedSlide: Slide = {
          ...res,
          text: [...res.text, ...newText],
        };

        updateSlide(updatedSlide);
      }
    } else {
      addSlide(newSlide);
    }
  };

  const handleDragStart = (event: React.DragEvent) => {
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
  const handleDragEnd = (event: React.DragEvent) => {
    event.preventDefault();
    if (pRef.current) pRef.current.style.opacity = '1';
  };

  return (
    <p
      ref={pRef}
      id={`${book_name}:${chapter_name}:${verse_num}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDoubleClick={addSlideOnDBClick}
      className="w-full p-0.5 px-2 pl-3 text-start border-b-2 border-[--border-two] hover:bg-[--ac-two] hover:text-[--text-two] duration-100 transition-all ease-linear"
    >
      {verse_num}: {text}
    </p>
  );
}

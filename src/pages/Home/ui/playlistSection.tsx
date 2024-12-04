import React, { useEffect, useRef, useState } from 'react';

import { Slide, addSlide, getList, VerseSlide } from '../../../store/playlist';
import PlaylistSlideBox from './PlaylistSlideBox';

export default function PlaylistSection() {
  const [list, setList] = useState<Slide[]>([]);
  // refs
  const playlistRef = useRef<HTMLDivElement>(null);
  // stores

  useEffect(() => {
    let timer: any = undefined;
    if (!timer) {
      timer = setInterval(async () => {
        setList(await getList());
      }, 250);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  // handlers for drag and drop events
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;
    playlistRef.current.style.border = '2px solid orange';
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;
    playlistRef.current.style.border = '';
  };

  const handleDragDrop = (event: React.DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;

    //color waring success
    playlistRef.current.style.border = '2px solid green';
    setTimeout(() => {
      if (!playlistRef.current) return;
      playlistRef.current.style.border = '';
    }, 600);

    //extract data
    const data = JSON.parse(event.dataTransfer?.getData('text/plain') || '');

    if (data?.type === 'add_verse') {
      const {
        payload: { book_name, chapter_num, verse_num, text },
      }: VerseSlide = data;

      const slide: Slide = {
        id: `${Math.round(Math.random() * 999)}${Math.round(Math.random() * 999)}`,
        text: [
          { tag: 'h2', content: `${book_name} ${chapter_num}:${verse_num}` },
          { tag: 'p', content: text },
        ],
        bg: null,
      };

      addSlide(slide);
    } else if (data.type === 'add_bg') {
      return;
    }
  };


  return (
    <div
      ref={playlistRef}
      id="playlist-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragDrop}
      className={`flex h-[35vh] px-0.5 border-t-2 border-[--border-one] overflow-x-auto duration-200 transition-all ease-linear `}
    >
      {list.map((data, index) => (
        <PlaylistSlideBox key={data.id} index={index} {...data} />
      ))}
      <div className="flex flex-grow h-full min-w-40 overflow-hidden border-2 border-green-500"></div>
    </div>
  );
}

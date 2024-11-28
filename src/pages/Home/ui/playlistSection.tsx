import { useEffect, useRef, useState } from 'react';

import { Slide, usePlaylist, VerseSlide } from '../../../store/playlist';
import { cn } from '../../../lib/css';
import PlaylistSlideBox from './PlaylistSlideBox';

export default function PlaylistSection() {
  // refs
  const playlistRef = useRef<HTMLDivElement>(null);
  // stores
  const { list, addSlide } = usePlaylist();

  // handlers for drag and drop events
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;
    playlistRef.current.style.border = '2px solid orange';
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault;
    if (!playlistRef.current) return;
    playlistRef.current.style.border = '';
  };

  const handleDragDrop = (event: DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;

    //color waring success
    playlistRef.current.style.border = '2px solid green';
    setTimeout(() => {
      if (!playlistRef.current) return;
      playlistRef.current.style.border = '';
    }, 600);

    //extract data
    const data = JSON.parse(
      event.dataTransfer?.getData('text/plain') || ''
    );

    if (data?.type === 'add_verse') {
      const { payload: {
        book_name, chapter_num,
        verse_num, text }
      }: VerseSlide = data;

      const slide: Slide = {
        id: `${Math.round(Math.random() * 999)}${Math.round(Math.random() * 999)}`,
        text: [
          { tag: "h2", content: `${book_name} ${chapter_num}:${verse_num}` },
          { tag: 'p', content: text }
        ],
        bg: null,
      };

      addSlide(slide);
    } else if (data.type === 'add_bg') {
      return;
    }
  };

  useEffect(() => {
    if (playlistRef.current) {
      playlistRef.current.addEventListener('dragover', handleDragOver);
      playlistRef.current.addEventListener('dragleave', handleDragLeave);
      playlistRef.current.addEventListener('drop', handleDragDrop);
    }

    return () => {
      playlistRef.current?.removeEventListener('dragover', handleDragOver);
      playlistRef.current?.removeEventListener('dragleave', handleDragLeave);
      playlistRef.current?.removeEventListener('drop', handleDragDrop);
    };
  }, []);


  return (
    <div
      ref={playlistRef}
      id="playlist-container"
      className={`flex h-[35vh] px-0.5 border-t-2 border-[--border-one] overflow-x-auto duration-200 transition-all ease-linear `}
    >
      {list.map((data, index) => (
        <PlaylistSlideBox key={data.id} index={index} {...data} />
      ))}
      <div className='flex flex-grow h-full min-w-40 overflow-hidden border-2 border-green-500'></div>
    </div>
  );
}

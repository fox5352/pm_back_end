import { useEffect, useRef, useState } from 'react';

import { usePlaylist } from '../../../store/playlist';
import { cn } from '../../../lib/css';
import PlaylistSlideBox from './PlaylistSlideBox';

export default function PlaylistSection() {
  // refs
  const playlistRef = useRef<HTMLDivElement>(null);
  // local state
  const [isDragging, setIsDragging] = useState(false);
  // stores
  const { list, addSlide } = usePlaylist();

  // handlers for drag and drop events
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;
    setIsDragging(true);
    playlistRef.current.style.border = '2px solid orange';
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault;
    if (!playlistRef.current) return;
    setIsDragging(false);
    playlistRef.current.style.border = '';
  };

  const handleDragDrop = (event: DragEvent) => {
    event.preventDefault();
    if (!playlistRef.current) return;

    setIsDragging(false);

    //color waring success
    playlistRef.current.style.border = '2px solid green';
    setTimeout(() => {
      if (!playlistRef.current) return;
      playlistRef.current.style.border = '';
    }, 600);

    //extract data
    const data: { type: string; payload: string } = JSON.parse(
      event.dataTransfer?.getData('text/plain') || ''
    );

    if (data.type === 'add_text') {
      const slide = {
        id: `${Math.round(Math.random() * 999)}${Math.round(Math.random() * 999)}`,
        text: data.payload,
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

  useEffect(() => {
    console.log(list);
  }, [list]);

  return (
    <div
      ref={playlistRef}
      id="playlist-container"
      className={`flex h-[35vh] px-0.5 border-t-2 border-[--border-one] overflow-x-auto duration-200 transition-all ease-linear ${cn(isDragging, 'pl-10')}`}
    >
      {list.map((data, index) => (
        <PlaylistSlideBox key={data.id} index={index} {...data} />
      ))}
    </div>
  );
}

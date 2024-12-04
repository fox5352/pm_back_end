import { useEffect, useRef, useState } from 'react';
import {
  Content,
  Slide,
  VerseSlide,
  setIndex,
  removeSlide,
  updateSlide,
  getIndex,
} from '../../../store/playlist';
import { cn } from '../../../lib/css';

type PlaylistSlideBox = Slide & {
  index: number;
};

export default function PlaylistSlideBox({
  id,
  index,
  text,
}: PlaylistSlideBox) {
  const [playlistIndex, setPlaylistIndex] = useState<number | null>(null);
  // refs
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer: any = undefined;
    if (!timer) {
      timer = setInterval(async () => {
        setPlaylistIndex(await getIndex());
      }, 250);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  const toggleCurrentSlide = () => {
    if (playlistIndex == index) {
      setIndex(null);
    } else {
      setIndex(index);
    }
  };

  // handle drag functions
  // TODO: on drag over card concat data if type add else add bg
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!buttonRef.current) return;

    buttonRef.current.style.border = '2px solid orange';
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    if (!buttonRef.current) return;
    buttonRef.current.style.border = '';
  };

  const handleDragDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!buttonRef.current) return;

    //color waring success
    buttonRef.current.style.border = '2px solid green';
    setTimeout(() => {
      if (!buttonRef.current) return;
      buttonRef.current.style.border = '';
    }, 600);

    //extract data
    const data = JSON.parse(event.dataTransfer?.getData('text/plain') || '');

    if (data?.type === 'add_verse') {
      const { payload } = data as VerseSlide;
      const newText: Content[] = [
        {
          tag: 'h2',
          content: `${payload.book_name} ${payload.chapter_num}:${payload.verse_num}`,
        },
        { tag: 'p', content: payload.text },
      ];

      const slide: Slide = {
        id,
        text: [...text, ...newText],
        bg: null,
      };

      updateSlide(slide);
    } else if (data?.type === 'add_bg') {
      // TODO: add bg update
      return;
    }
  };

  const handleDragStart = () => {
    if (!buttonRef.current) return;
    if (playlistIndex == index) {
      setIndex(null);
    }
    removeSlide(id);
  };

  const handleDBClick = () => {
    toggleCurrentSlide();
    removeSlide(id);
  };

  const mapper = (data: Content) => {
    const id = `${Math.round(Math.random() * 999)}-${Math.round(Math.random() * 999)}`;
    const { tag, content } = data;


    switch (tag) {
      case 'h2':
        return (
          <h2 key={id} className="text-xl font-semibold">
            {content}
          </h2>
        );
      case 'h1':
        return (
          <h1 key={id} className="text-xl font-semibold">
            {content}
          </h1>
        );
      case 'p':
        return (
          <p key={id} className="text-md">
            {content}
          </p>
        );
      default:
        return <div key={id}>{content}</div>;
    }
  };

  return (
    <button
      draggable
      ref={buttonRef}
      onDragStart={handleDragStart}
      className={`flex flex-col flex-shrink-0 justify-center items-center space-y-0.5 h-full w-[300px] text-lg overflow-y-auto border-l-2 border-r-2 border-b-2 border-[--border-two] ${cn(playlistIndex == index, 'bg-[--ac-one] text-[--text-two] !border-[--border-one]')} duration-200 transition-all ease-linear relative`}
    >
      <div
        onClick={toggleCurrentSlide}
        onDoubleClick={handleDBClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        className="absolute top-0 left-0 w-full h-full"
      />
      {text.map(mapper)}
    </button>
  );
}

import { useEffect, useRef } from 'react';
import { Slide, usePlaylist } from '../../../store/playlist';
import { cn } from '../../../lib/css';

type PlaylistSlideBox = Slide & {
  index: number;
};

export default function PlaylistSlideBox({
  id,
  index,
  text,
}: PlaylistSlideBox) {
  // refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  //store
  const {
    setIndex,
    removeSlide,
    updateSlide,
    index: playlistIndex,
  } = usePlaylist();

  const toggleCurrentSlide = () => {
    if (playlistIndex === index) {
      setIndex(null);
    } else {
      setIndex(index);
    }
  };

  // handle drag functions
  // TODO: on drag over card concat data if type add else add bg
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (!buttonRef.current) return;
    buttonRef.current.style.border = '2px solid orange';
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault;
    if (!buttonRef.current) return;
    buttonRef.current.style.border = '';
  };

  const handleDragDrop = (event: DragEvent) => {
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
    const data: { type: string; payload: string } = JSON.parse(
      event.dataTransfer?.getData('text/plain') || ''
    );

    if (data.type === 'add_text') {
      const slide = {
        id,
        text: text + '\n' + data.payload,
      };

      updateSlide(slide);
    } else if (data.type === 'add_bg') {
      // TODO: add bg update
      return;
    }
  };

  const handleDragStart = (event: DragEvent) => {
    event.preventDefault();
    if (!buttonRef.current) return;
    if (playlistIndex == index) {
      setIndex(null);
    }
    removeSlide(id);
  };

  useEffect(() => {
    buttonRef.current?.addEventListener('drag', handleDragStart);

    buttonRef.current?.addEventListener('dragover', handleDragOver);
    buttonRef.current?.addEventListener('dragleave', handleDragLeave);
    buttonRef.current?.addEventListener('drop', handleDragDrop);

    return () => {
      buttonRef.current?.removeEventListener('drag', handleDragStart);

      buttonRef.current?.removeEventListener('dragover', handleDragOver);
      buttonRef.current?.removeEventListener('dragleave', handleDragLeave);
      buttonRef.current?.removeEventListener('drop', handleDragDrop);
    };
  }, []);

  return (
    <button
      draggable
      ref={buttonRef}
      onClick={toggleCurrentSlide}
      className={`flex flex-shrink-0 justify-center items-center h-full w-[300px] text-lg overflow-y-auto border-l-2 border-r-2 border-b-2 border-[--border-two] ${cn(playlistIndex == index, 'bg-[--ac-one] text-[--text-two] !border-[--border-one]')} duration-200 transition-all ease-linear`}
    >
      {text}
    </button>
  );
}

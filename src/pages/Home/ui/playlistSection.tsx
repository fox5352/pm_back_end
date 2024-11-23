import { useEffect, useRef } from 'react';

export default function PlaylistSection() {
  const playlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      if (!playlistRef.current) return;
      event.preventDefault();
      playlistRef.current.style.border = '2px solid orange';
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault;
      if (!playlistRef.current) return;
      playlistRef.current.style.border = '';
    };

    const handleDragDrop = (event: DragEvent) => {
      if (!playlistRef.current) return;
      event.preventDefault();

      //color waring success
      playlistRef.current.style.border = '2px solid green';
      setTimeout(() => {
        if (!playlistRef.current) return;
        playlistRef.current.style.border = '';
      }, 600);

      //extract data
      const text = event.dataTransfer?.getData('text/plain') || '';
      // TODO: extract data from string into json
    };

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
      className="flex h-[34vh] border-t-2 border-[--border-one] duration-200 transition-all ease-linear"
    ></div>
  );
}

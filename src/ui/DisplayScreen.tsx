import { useEffect, useRef, useState } from 'react';
import { Content, getList, getIndex, getBg, Slide } from '../store/playlist';

import { get_is_live } from '../store/display';

export type DisplayScreen = {
  className?: string;
  preview?: boolean;
};

export default function DisplayScreen({
  className,
  preview = false,
}: DisplayScreen) {
  // display state
  const [isLive, setIsLive] = useState(false);
  // playlist state
  const [list, setList] = useState<Slide[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [bg, setBg] = useState<string | null>(null);

  // refs
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // local state
  const [text, setText] = useState<Content[] | null>(null);

  useEffect(() => {
    let timer: any = undefined;
    if (!timer) {
      timer = setInterval(async () => {
        setIsLive(await get_is_live());
        setList(await getList()); // update playlist State
        setIndex(await getIndex()); // update currentSlide State
        setBg(await getBg()); // update bg State
      }, 250);
    }

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      if (!isLive && preview == false) {
        return;
      }

      if (index == null || !list[index]) {
        setText(null);
        return;
      }

      const slideData = list[index];

      if (slideData) {
        setText(slideData.text);

        // if bg is valid local then check for store bg
        if (bg) {
          bodyRef.current.style.backgroundImage = `src(${slideData.bg})`;
        } else if (bg) {
          bodyRef.current.style.backgroundImage = `src(${bg})`;
        }
        //
      }
    }
  }, [isLive, bodyRef, list, index, preview, bg]);

  const mapper = (data: Content) => {
    const id = `${Math.round(Math.random() * 999)}-${Math.round(Math.random() * 999)}`;
    const { tag, content } = data;

    switch (tag) {
      case 'h2':
        return (
          <h2 key={id} className="text-2xl mt-2 font-semibold">
            {content}
          </h2>
        );
      case 'h1':
        return (
          <h1 key={id} className="text-2xl mt-2 font-semibold">
            {content}
          </h1>
        );
      case 'p':
        return (
          <p key={id} className="text-xl">
            {content}
          </p>
        );
    }
  };

  return (
    <div
      ref={bodyRef}
      className={`flex flex-col flex-grow justify-center items-center w-full h-full px-4 py-3 text-center ${className}`}
    >
      {text && text.map(mapper)}
    </div>
  );
}

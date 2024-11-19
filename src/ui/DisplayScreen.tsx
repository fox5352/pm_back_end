import { useEffect, useRef, useState } from "react";
import { usePlaylist } from "../store/playlist";
import { useDisplay } from "../store/diaplay";

export type DisplayScreen = {
  className?: string;
};

export default function DisplayScreen({ className }: DisplayScreen) {
  // refs
  const bodyRef = useRef<HTMLDivElement | null>(null)

  // local state
  const [text, setText] = useState("")

  // stores
  const { list, index, bg } = usePlaylist()
  const { isLive } = useDisplay()

  useEffect(() => {
    if (bodyRef.current && isLive) {
      const res = list[index]
      if (res) {
        //
        setText(res.text)

        // if bg is valid local then check for store bg
        if (bg) {
          bodyRef.current.style.backgroundImage = `src(${res.bg})`
        } else if (bg) {
          bodyRef.current.style.backgroundImage = `src(${bg})`
        }

        //
      }
    }

  }, [bodyRef, list, index, isLive, bg])

  return (<div ref={bodyRef} className={`${className}`}>{text}</div>);
}

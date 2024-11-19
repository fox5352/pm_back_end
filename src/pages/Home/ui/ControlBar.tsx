import { useState } from "react"

import { cn } from "../../../lib/css.ts"

import Button from "./ControlButton.tsx"
import useTheme from "../../../hooks/useTheme.tsx"

export default function ControlBar() {
  const [isLive, setIsLive] = useState<boolean>(false)
  const [theme, toggleTheme] = useTheme();

  const toggle = () => setIsLive(prev => !prev)

  return (
    <div className="flex justify-start items-center gap-x-1 w-full px-1.5 py-1 border-b-2 border-[--border-one]">
      <Button onClick={toggleTheme}>{theme}</Button>
      <Button onClick={toggle} className={cn(isLive, "!bg-rose-600", "!bg-stone-500")}>Live</Button>
    </div>
  )
}

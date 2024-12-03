import { cn } from '../../../lib/css.ts';

import Button from './ControlButton.tsx';
import useTheme from '../../../hooks/useTheme.tsx';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { get_is_live } from '../../../store/display.ts';

export default function ControlBar() {
  const [isLive, setIsLive] = useState(false);
  const [theme, toggleTheme] = useTheme();

  const toggleHandler = () => {
    invoke('toggle_is_live');
  };

  useEffect(() => {
    let timer: any = undefined;

    if (!timer) {
      timer = setInterval(async () => {
        const res = await get_is_live();

        if (res == null) return;

        setIsLive(res); // update isLive State
      }, 250);
    }
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex justify-start items-center gap-x-1 w-full px-1.5 py-1 border-b-2 border-[--border-one]">
      <Button onClick={toggleTheme}>{theme}</Button>
      <Button
        onClick={toggleHandler}
        className={cn(isLive, '!bg-rose-600', '!bg-stone-500')}
      >
        Live
      </Button>
    </div>
  );
}

import { cn } from '../../../lib/css.ts';

import Button from './ControlButton.tsx';
import useTheme from '../../../hooks/useTheme.tsx';
import { useDisplay } from '../../../store/display.ts';

export default function ControlBar() {
  const { isLive, toggleIsLive } = useDisplay();
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="flex justify-start items-center gap-x-1 w-full px-1.5 py-1 border-b-2 border-[--border-one]">
      <Button onClick={toggleTheme}>{theme}</Button>
      <Button
        onClick={toggleIsLive}
        className={cn(isLive, '!bg-rose-600', '!bg-stone-500')}
      >
        Live
      </Button>
    </div>
  );
}

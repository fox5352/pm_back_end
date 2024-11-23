import { MouseEvent, ReactNode } from 'react';
import { cn } from '../../../lib/css';

type TabButton = {
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export default function TabButton({
  className = '',
  children,
  isActive = false,
  onClick,
}: TabButton) {
  return (
    <button
      onClick={onClick}
      className={`px-2 first-of-type:border-l-2 border-r-2 border-[--border-one] ${className} ${cn(isActive, 'bg-[--ac-one] text-[--text-two] border-[--ac-one]', '')} duration-200 transition-all ease-linear`}
    >
      {children}
    </button>
  );
}

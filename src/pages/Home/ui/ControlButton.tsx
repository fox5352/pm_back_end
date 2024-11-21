import React from "react";

export type Button = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
};

export default function Button({ onClick, className = "", children }: Button) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-0.5 text-white rounded-md shadow-black bg-[--bg-one] ${className} hover:scale-95 hover:shadow-sm duration-200 transition-all ease-linear`}
    >
      {children}
    </button>
  );
}

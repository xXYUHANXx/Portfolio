"use client";

type WindowHeaderProps = {
  title: string;
  onClose: () => void;
};

export function WindowHeader({ title, onClose }: WindowHeaderProps) {
  return (
    <div className="handle flex items-center p-2 border-b-4 border-black cursor-move relative flex-shrink-0 bg-white rounded-t-[36px]">
      <button
        onClick={onClose}
        className="w-9 h-9 left-2 flex-shrink-0 flex items-center justify-center border-2 border-black mr-2 bg-gray-200 rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className="h-8 w-full flex flex-col justify-around">
        <div className="h-0.5 bg-black"></div>
        <div className="h-0.5 bg-black"></div>
        <div className="h-0.5 bg-black"></div>
        <div className="h-0.5 bg-black"></div>
        <div className="h-0.5 bg-black"></div>
        <div className="h-0.5 bg-black"></div>
      </div>
    </div>
  );
}

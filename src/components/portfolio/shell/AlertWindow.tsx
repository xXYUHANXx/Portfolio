"use client";

import { Window } from "@/components/ui/legacy/Window";
import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import Image from "next/image";

export function AlertWindow({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <Window className="w-[90vw] max-w-3xl max-h-72">
      <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col">
        <WindowHeader title={title} onClose={onClose} />
        <div className="p-6 flex items-start gap-4">
          <Image
            src="https://i.ibb.co/fzWF8CYY/info.png"
            alt="Info icon"
            width={48}
            height={48}
            className="flex-shrink-0"
          />
          <div className="flex-grow">
            <p className="mb-4">{message}</p>
            <button
              onClick={onClose}
              className="block ml-auto bg-white border-2 border-black rounded-lg px-6 py-1 hover:bg-gray-100 active:bg-gray-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Window>
  );
}

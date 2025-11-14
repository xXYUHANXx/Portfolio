"use client";

import Image from "next/image";
import { WindowHeader } from "@/components/retro/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

const deletedFiles = [
  {
    name: "My Hopes and Dreams.txt",
    icon: "https://i.ibb.co/Fb7kZyw8/motivation.png",
  },
  { name: "Motivation.exe", icon: "https://i.ibb.co/bgZ5h3ct/trofeo.png" },
  { name: "Serotonin.dll", icon: "https://i.ibb.co/Z6GBNHS6/serotonin.png" },
  { name: "Sleep_Schedule.dat", icon: "https://i.ibb.co/7t5pcz6D/reloj.png" },
  {
    name: "Will to Live.log",
    icon: "https://i.ibb.co/SwLVJLw2/will-to-live.png",
  },
];

export function RecycleBin({
  onClose,
  title,
  onEmpty,
}: {
  onClose: () => void;
  title: string;
  onEmpty: () => void;
}) {
  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full w-full">
      <WindowHeader title={title} onClose={onClose} />
      <div className="flex justify-end p-2 border-b-2 border-dashed border-black">
        <button
          onClick={onEmpty}
          className="bg-white border-2 border-black rounded-lg px-4 py-1 hover:bg-gray-100 active:bg-gray-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-xs"
        >
          Empty Recycle Bin
        </button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-4">
          {deletedFiles.map((file) => (
            <div
              key={file.name}
              className="flex flex-col items-center text-center gap-1"
            >
              <Image src={file.icon} alt="File icon" width={48} height={48} />
              <p className="text-xs break-words w-full">{file.name}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

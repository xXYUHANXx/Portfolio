
"use client";

import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoBackground } from "@/components/VideoBackground";
import Image from "next/image";

const folders = [
    { name: "app" },
    { name: "components" },
    { name: "domain" },
    { name: "infrastructure" },
    { name: "lib" },
    { name: "public" },
];

export function OSDrive({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full w-full">
      <VideoBackground />
      <WindowHeader title={title} onClose={onClose} />
      <ScrollArea className="flex-grow">
        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-12">
            {folders.map(folder => (
                <div key={folder.name} className="flex flex-col items-center text-center gap-1 transition-transform duration-200 ease-in-out hover:scale-110 group cursor">
                    <Image 
                        src="https://i.ibb.co/sJbKF4XM/Projects.png"
                        alt="Folder icon"
                        width={64}
                        height={64}
                        className="transition-transform duration-200 ease-in-out group-hover:scale-110"
                    />
                    <p className="text-sm break-words w-full px-1">{folder.name}</p>
                </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}

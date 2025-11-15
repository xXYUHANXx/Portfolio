
"use client";

import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameIcon } from "./GameIcon";
import { VideoBackground } from "@/components/VideoBackground";

const games = [
  { name: "Saga Resident Evil", icon: "https://i.ibb.co/fGGzGsTC/residentevil.png" },
  { name: "Minecraft", icon: "https://i.ibb.co/ZpCs5gxp/Minecraft.png" },
  { name: "Terraria", icon: "https://i.ibb.co/Zpgjq8WX/Terraria.png" },
  { name: "Stardew Valley", icon: "https://i.ibb.co/Q3BmTV3L/Stardew-Valley.png" },
  { name: "Hollow Knight", icon: "https://i.ibb.co/gbQx2THq/Hollow-Knight.png" },
  { name: "Hollow Knight Silksong", icon: "https://i.ibb.co/vC9cTc3B/Hollow-Knight-Silksong.jpg" },
  { name: "Counter Strike", icon: "https://i.ibb.co/608jG2Pv/Counter-Strike.png" },
  { name: "Blood Strike", icon: "https://i.ibb.co/C5wmp5c0/Blood-Strike.jpg" },
  { name: "Dead Cells", icon: "https://i.ibb.co/B57rRPn1/Dead-Cells.png" },
];

export function GamesDrive({
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
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-4">{games.length} items</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
            {games.map((game) => (
              <GameIcon key={game.name} name={game.name} iconSrc={game.icon} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

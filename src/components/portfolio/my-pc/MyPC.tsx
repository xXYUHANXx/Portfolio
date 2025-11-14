"use client";

import Image from "next/image";
import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Progress } from "@/components/ui/progress";

const drives = [
  {
    name: "OS (C:)",
    total: 110,
    free: 14.1,
  },
  {
    name: "Games (D:)",
    total: 465,
    free: 160,
  },
  {
    name: "Projects (E:)",
    total: 297,
    free: 85.3,
  },
];

const specs = [
  { label: "CPU", value: "Intel Meme i7 500 MHz" },
  { label: "RAM", value: "640K (More than anyone needs)" },
  { label: "GPU", value: "128K (more than what is going to be used)" },
  { label: "System", value: "YuhanOs 95" },
  { label: "Cache", value: "256K SRAM Passed" },
  { label: "System BIOS", value: "Shadowed (It's shy)" },
  { label: "Video BIOS", value: "Also Shadowed" },
];

export function MyPC({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full w-full">
      <WindowHeader title={title} onClose={onClose} />
      <ScrollArea className="flex-grow">
        <div className="p-6">
          <h2 className="text-base font-semibold mb-4">
            Devices and Drives ({drives.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drives.map((drive) => {
              const used = drive.total - drive.free;
              const percentage = (used / drive.total) * 100;
              return (
                <div
                  key={drive.name}
                  className="flex items-center gap-4 p-2 rounded-md hover:bg-blue-100 cursor-pointer"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src="https://i.ibb.co/60NTxQdy/disk.png"
                      alt="Hard drive icon"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex-grow w-full">
                    <p className="font-semibold">{drive.name}</p>
                    <Progress
                      value={percentage}
                      className="h-4 bg-gray-300 rounded-none mt-1"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      {drive.free.toFixed(1)} GB available from {drive.total} GB
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t-2 border-dashed border-black my-6"></div>

          <h2 className="text-base font-semibold mb-4">
            System Specifications
          </h2>
          <div className="space-y-2 max-w-md mx-auto">
            {specs.map(({ label, value }) => (
              <div key={label} className="flex items-start">
                <span className="w-1/3 font-semibold text-gray-800">
                  {label}:
                </span>
                <span className="w-2/3 text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

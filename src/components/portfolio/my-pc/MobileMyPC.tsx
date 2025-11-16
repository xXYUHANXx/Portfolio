"use client";

import { ArrowLeft } from "lucide-react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

const specs = [
  { label: "Device Name", value: "Yuhan's Phone" },
  { label: "Model", value: "YP-95 Mobile Edition" },
  { label: "OS Version", value: "YuhanOS Mobile 2.3" },
  { label: "Processor", value: "Octa-core Meme Engine" },
  { label: "RAM", value: "4.00 GB" },
  { label: "Caffeine Level", value: "Dangerously High" },
];

export function MobileMyPC({ onBack }: { onBack: () => void }) {
  const totalStorage = 64;
  const usedStorage = 58.3;
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 text-center border-b-2 border-black">
        <button className="w-auto inline-block text-center py-2 px-6 border-2 border-black rounded-full  font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-sm">
          DEVICE INFO
        </button>
        <div className="w-8"></div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-6 font-mono text-sm space-y-8">
          {/* Storage Section */}
          <div>
            <h2 className="text-base font-bold font-display mb-4">Storage</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Internal Storage</span>
                  <span className="text-gray-600">
                    {usedStorage} GB / {totalStorage} GB
                  </span>
                </div>
                <Progress value={percentage} className="h-3" />
              </div>
              <div className="text-xs text-gray-500">
                <p>System: 12.1 GB</p>
                <p>Apps & Data: 25.4 GB</p>
                <p>Memes & Screenshots: 20.8 GB</p>
              </div>
            </div>
          </div>

          {/* Device Specs Section */}
          <div>
            <h2 className="text-base font-bold font-display mb-4">
              Device Specifications
            </h2>
            <div className="space-y-3">
              {specs.map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-600">{label}</span>
                  <span className="text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Mumbo Jumbo */}
          <div className="text-xs text-gray-400 pt-8 text-center">
            <p>
              Yuhan Picos Corporation ©{new Date().getFullYear()}? Seriously?
            </p>
            <p>Don't even think about copying this. Or do, I'm not a cop.</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

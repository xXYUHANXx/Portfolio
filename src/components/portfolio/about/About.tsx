"use client";

import Image from "next/image";
import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { VideoBackground } from "@/components/VideoBackground";

const skills = [
  { label: "Thinking Capacity", value: "Just enough to get by" },
  { label: "Skills", value: "Lighting a lighter with my feet" },
  { label: "Experience", value: "Never enough for you" },
  { label: "Creativity", value: "165 ZB of genius" },
];

export function About({
  onClose,
  title,
  onOpenSkills,
  onOpenCV,
}: {
  onClose: () => void;
  title: string;
  onOpenSkills: () => void;
  onOpenCV: () => void;
}) {
  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full">
      <VideoBackground />
      <WindowHeader title={title} onClose={onClose} />
      <ScrollArea className="flex-grow">
        <div className="p-6">
          <div className="text-center">
            <Image
              src="https://i.ibb.co/21vFQwq4/Pc.png"
              alt="Computer icon"
              width={80}
              height={90}
              className="mx-auto"
              data-ai-hint="retro computer"
            />
            <h1 className="text-2xl font-bold mt-2 font-display">
              YuhanPicos 95
            </h1>
            <p>Version 2.308.20.05...</p>
            <div className="text-center my-6">
              <button
                onClick={onOpenSkills}
                className="bg-white border-2 border-black rounded-lg px-6 py-2 hover:bg-gray-100 active:bg-gray-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                Bio & Skills
              </button>
            </div>
          </div>

          <div className="my-6 relative px-[5%]">
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span>Availability</span>
              <span>Low, but I try</span>
            </div>
            <div className="flex h-[30px] border-2 border-black rounded-md overflow-hidden">
              <div
                style={{ width: "40%" }}
                className="flex justify-end items-center bg-black/20 border-r-2 border-black pr-1.5 text-xs font-semibold"
              >
                Work
              </div>
              <div
                style={{ width: "30%" }}
                className="flex justify-end items-center bg-black/20 border-r-2 border-black pr-1.5 text-xs font-semibold"
              >
                Study
              </div>
              <div
                style={{ width: "20%" }}
                className="flex justify-end items-center bg-black/10 border-r-2 border-black pr-1.5 text-xs font-semibold"
              >
                Social Life
              </div>
              <div
                style={{ width: "10%" }}
                className="flex justify-end items-center bg-transparent pr-1.5 text-xs font-semibold"
              >
                Memes
              </div>
            </div>
          </div>

          <div className="space-y-4 my-6 max-w-md mx-auto">
            {skills.map(({ label, value }) => (
              <div key={label} className="flex">
                <span className="w-1/3 font-bold">{label}</span>
                <span className="w-2/3">{value}</span>
              </div>
            ))}
          </div>

          <div className="text-center my-6">
            <button
              onClick={onOpenCV}
              className="bg-white border-2 border-black rounded-lg px-6 py-2 hover:bg-gray-100 active:bg-gray-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all inline-block"
            >
              Ver CV
            </button>
          </div>

          <footer className="text-center text-xs text-gray-800">
            <p>
              Yuhan Picos Corporation ©{new Date().getFullYear()}? All rights
              reserved.
            </p>
            <p>
              Designed in Venezuela, developed under a bridge on a Canaima
              laptop.
            </p>
          </footer>
        </div>
      </ScrollArea>
    </div>
  );
}

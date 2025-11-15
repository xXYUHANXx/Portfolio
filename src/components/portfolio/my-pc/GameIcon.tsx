"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type GameIconProps = {
  name: string;
  iconSrc: string;
};

export function GameIcon({ name, iconSrc }: GameIconProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <button className="flex flex-col items-center text-center gap-2 group">
      <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-200 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 ease-in-out overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
        <Image
          src={iconSrc}
          alt={`${name} icon`}
          width={96}
          height={96}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <p className="text-sm break-words w-full px-1">{name}</p>
    </button>
  );
}

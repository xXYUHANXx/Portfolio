"use client";

import React, { useEffect, useRef } from "react";

export function ClickSoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playClickSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Play can be interrupted by another click, ignore the error.
        });
      }
    };

    document.body.addEventListener("click", playClickSound);

    return () => {
      document.body.removeEventListener("click", playClickSound);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/click.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
      {children}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

export function useSound(src: string, volume = 1, options: { playbackRate?: number } = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    if (options.playbackRate) {
      audio.playbackRate = options.playbackRate;
    }
    audioRef.current = audio;
  }, [src, volume, options.playbackRate]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        // Ignorar errores si la reproducción es interrumpida
        if (error.name !== "AbortError") {
          console.error("Audio play failed:", error);
        }
      });
    }
  };

  return play;
}

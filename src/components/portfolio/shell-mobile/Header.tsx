"use client";

import React from "react";
import Image from "next/image";
import {
  BatteryIcon,
  WifiIcon,
  SoundIcon,
  SoundOffIcon,
} from "@/components/portfolio/Icons";

const Clock = () => {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "p.m." : "a.m.";
      const formattedHours = (hours % 12 || 12).toString();
      setTime(`${formattedHours}:${minutes} ${ampm}`);
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  return <p className="font-mono text-sm">{time || " "}</p>;
};

export function Header() {
  return (
    <header className="flex justify-between items-center p-2 border-b border-black flex-shrink-0">
      <h1 className="text-lg font-bold font-display">YuhanPicos</h1>
      <div className="flex items-center gap-2 text-xs">
        <BatteryIcon />
        <SoundIcon />
        <WifiIcon />
        <Clock />
      </div>
    </header>
  );
}

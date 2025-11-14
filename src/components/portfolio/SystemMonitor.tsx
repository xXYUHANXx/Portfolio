"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

const Graph = () => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from({ length: 15 }, () => Math.random() * 80 + 10);
      setBars(newBars);
    };

    generateBars();
    const interval = setInterval(generateBars, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-12 border-2 border-t-gray-700 border-l-gray-700 border-b-gray-500 border-r-gray-500 bg-black p-1">
      <div className="w-full h-full border border-gray-700/50 flex items-end justify-between gap-px">
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-px bg-green-400"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export function SystemMonitor() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-48 bg-gray-300 text-black font-mono border-2 border-t-gray-100 border-l-gray-100 border-r-black border-b-black p-1 shadow-lg">
      <div className="bg-black text-green-400 p-2 text-center space-y-1">
        <p className="text-xl leading-none">{format(now, "MM/dd/yyyy")}</p>
        <p className="text-xl leading-none">{format(now, "hh:mm aa")}</p>
      </div>
      <div className="p-2 space-y-2 text-sm">
        <h3 className="text-center font-bold">SYSTEM MONITOR</h3>
        <Graph />
        <div className="space-y-1">
          <p>GRIND: 99% COOL</p>
          <p>RAM : 100% IDEAS</p>
        </div>
      </div>
    </div>
  );
}

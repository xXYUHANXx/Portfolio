"use client";

import React from "react";
import Image from "next/image";

const Clock = () => {
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "P.M." : "A.M.";
      const formattedHours = (hours % 12 || 12).toString();
      setTime(`${formattedHours}:${minutes} ${ampm}`);
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  return <p className="font-mono text-sm">{time || " "}</p>;
};

const MailIcon = () => (
  <a
    href="mailto:yuhanpicos740@gmail.com"
    target="_blank"
    className="block w-6 h-6"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.4 18.4"
      width="24"
      height="24"
    >
      <g>
        <rect
          x="1"
          y="1"
          width="23.4"
          height="16.4"
          fill="#C1C1BF"
          stroke="#1D1D1B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        ></rect>
        <polyline
          points="2.2,15.9 9.5,7 15.8,7 23.2,15.9"
          fill="none"
          stroke="#1D1D1B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        ></polyline>
        <polyline
          points="2.3,2.3 12.7,12.2 23,2.3"
          fill="none"
          stroke="#1D1D1B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        ></polyline>
      </g>
    </svg>
  </a>
);

const BatteryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34.9 18.4"
    width="24"
    height="24"
  >
    <g>
      <rect
        x="1.2"
        y="1.1"
        width="26.9"
        height="16.4"
        fill="#C1C1BF"
        stroke="#1D1D1B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      ></rect>
      <polygon
        points="6,1.1 1.2,1.1 1.2,17.4 22.3,17.4"
        fill="#AFAFA8"
        stroke="#1D1D1B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      ></polygon>
      <g>
        <path
          d="M31.2,12.3h-0.3c-0.3,0-0.6-0.3-0.6-0.6v-5c0-0.3,0.3-0.6,0.6-0.6h0.3c1.4,0,2.5,1.1,2.5,2.5v1.1 C33.7,11.2,32.5,12.3,31.2,12.3z"
          fill="#1D1D1B"
        ></path>
      </g>
    </g>
  </svg>
);

export function Header() {
  return (
    <header className="border-b-4 border-black p-2 flex justify-between items-center flex-shrink-0">
      <div className="flex items-end gap-2 flex-grow">
        <h1 className="text-3xl font-bold font-display leading-none whitespace-nowrap">
          YuhanPicos
        </h1>
        <div className="h-8 w-full flex flex-col justify-around">
          <div className="h-0.5 bg-black"></div>
          <div className="h-0.5 bg-black"></div>
          <div className="h-0.5 bg-black"></div>
          <div className="h-0.5 bg-black"></div>
          <div className="h-0.5 bg-black"></div>
          <div className="h-0.5 bg-black"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right pl-4">
        <div>
          <p className="font-mono text-sm">yuhanpicos740@gmail.com</p>
          <Clock />
        </div>
        <div className="flex items-center gap-1 p-1 border-2 border-gray-400">
          <Image src="/sonido.svg" alt="Sound Icon" width={24} height={24} />
          <MailIcon />
          <BatteryIcon />
        </div>
      </div>
    </header>
  );
}

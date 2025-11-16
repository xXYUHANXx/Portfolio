"use client";

import Image from "next/image";

const mainIcons = [
  {
    id: "my-pc",
    name: "Device Info",
    iconSrc: "https://i.ibb.co/cc4ZSwKZ/config.png",
  },
  {
    id: "projects",
    name: "Projects",
    iconSrc: "https://i.ibb.co/sJbKF4XM/Projects.png",
  },
  {
    id: "about",
    name: "About Me",
    iconSrc: "https://i.ibb.co/G315Npm3/About-Me.png",
  },
  {
    id: "contact",
    name: "Contact",
    iconSrc: "https://i.ibb.co/RT5GfGch/contact.png",
  },
  {
    id: "cv",
    name: "Resume",
    iconSrc: "https://i.ibb.co/qLWrRtZW/Resume.png",
  },
];

type MainIconsProps = {
  onIconClick: (id: string) => void;
};

export function MainIcons({ onIconClick }: MainIconsProps) {
  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-8">
      {mainIcons.map(({ id, name, iconSrc }) => (
        <button
          key={id}
          onClick={() => onIconClick(id)}
          className="flex flex-col items-center gap-1 text-center w-full"
        >
          <Image src={iconSrc} alt={name} width={64} height={64} />
          <span className="text-xs font-mono break-words w-full">{name}</span>
        </button>
      ))}
    </div>
  );
}

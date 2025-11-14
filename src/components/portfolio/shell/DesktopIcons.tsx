"use client";

import Image from "next/image";

const icons = [
  {
    id: "my-pc",
    name: "My PC",
    iconSrc: "https://i.ibb.co/1G8bwQhf/pccom.png",
  },
  {
    id: "recycle-bin",
    name: "Recycle Bin",
    iconSrc: "https://i.ibb.co/LdzPhRBt/recyclebin.png",
  },
  {
    id: "projects",
    name: "PROJECTS",
    iconSrc: "https://i.ibb.co/sJbKF4XM/Projects.png",
  },
  {
    id: "cv",
    name: "RESUME",
    iconSrc: "https://i.ibb.co/qLWrRtZW/Resume.png",
  },
  {
    id: "about",
    name: "ABOUT ME",
    iconSrc: "https://i.ibb.co/G315Npm3/About-Me.png",
  },
  {
    id: "contact",
    name: "CONTACT",
    iconSrc: "https://i.ibb.co/RT5GfGch/contact.png",
  },
  
];

export function DesktopIcons({
  onIconClick,
}: {
  onIconClick: (id: string) => void;
}) {
  return (
    <div className="absolute top-8 right-8 flex justify-end items-start">
      <div className="grid grid-cols-3 gap-x-12 gap-y-8">
        {icons.map(({ id, name, iconSrc }) => (
          <button
            key={id}
            onClick={() => onIconClick(id)}
            className="flex flex-col items-center gap-2 text-center transition-transform duration-200 ease-in-out hover:scale-110"
          >
            <div className="p-1">
              <Image
                src={iconSrc}
                alt={name}
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <span className="font-mono text-sm bg-white px-1">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

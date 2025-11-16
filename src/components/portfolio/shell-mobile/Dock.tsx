"use client";

import { Github, Linkedin, Mail, Home } from "lucide-react";
import React from "react";

const socialLinks = [
  {
    id: "github",
    url: "https://github.com/xXYUHANXx",
    icon: <Github size={24} />,
    label: "GitHub",
    isExternal: true,
  },
  {
    id: "linkedin",
    url: "https://www.linkedin.com/in/yuhanpicos2308/",
    icon: <Linkedin size={24} />,
    label: "LinkedIn",
    isExternal: true,
  },
  {
    id: "contact",
    url: "#",
    icon: <Mail size={24} />,
    label: "Contact",
    isExternal: false,
  },
];

type DockProps = {
  onIconClick: (id: string) => void;
  onHomeClick: () => void;
};

export function Dock({ onIconClick, onHomeClick }: DockProps) {
  return (
    <footer className="flex justify-around items-center p-2 border-t-2 border-black flex-shrink-0 bg-white/80 backdrop-blur-sm">
      <button onClick={onHomeClick} className="p-2" aria-label="Home">
        <Home size={24} />
      </button>

      {socialLinks.map(({ id, url, icon, label, isExternal }) => {
        if (isExternal) {
          return (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
              aria-label={label}
            >
              {icon}
            </a>
          );
        }
        return (
          <button
            key={id}
            onClick={() => onIconClick(id)}
            className="p-2"
            aria-label={label}
          >
            {icon}
          </button>
        );
      })}
    </footer>
  );
}

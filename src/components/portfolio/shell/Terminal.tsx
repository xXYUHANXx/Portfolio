"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const biosLines = [
  `LOLBIOS (C)${new Date().getFullYear()} Laughing Out Loud Inc.`,
  "<<<<<BIOS version 42.0.0",
  "<<<<<<CPU: Intel Comedy i7 500 MHz",
  "<<<<<640K System RAM Passed (But who needs more than 640K, right?)",
  "<<<<<256K Cache SRAM Passed",
  "<<<<<System BIOS shadowed (It's afraid of the light)",
  "<<<<<Video BIOS shadowed (It's shy)",
  "<<<<<Fixed Disk 0: Seagate ST32531A (Sturdy as a Seagate)",
  "<<<<<Mouse initialized (It's not a real mouse, don't worry)",
  "",
  "<<<<<Press <F2> to enter SETUP, <F3> to see a meme",
];

const welcomeLines = [
  `YuhanPicos OS [Version 2.308.2.005]`,
  `(o_o) Yuhan Picos @2005-${new Date().getFullYear()}`,
  "",
  "YP:\\> Welcome, visitor.",
  "YP:\\> Feel free to look around.",
  "YP:\\> Type 'help' to see available commands.",
];

const PROMPT = "YP:\\> ";

type TerminalProps = {
  onCommand?: (command: string) => string;
  onAnimationComplete?: () => void;
  isBooting: boolean;
};

export function Terminal({
  onCommand,
  onAnimationComplete,
  isBooting,
}: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Initial animation effect
  useEffect(() => {
    if (!isBooting) {
      if (!initialAnimationDone) {
        setHistory(welcomeLines);
        setInitialAnimationDone(true);
      }
      return;
    }

    let allLines = biosLines;
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (lineIndex < allLines.length) {
        const currentLine = allLines[lineIndex];
        if (charIndex < currentLine.length) {
          setHistory((prev) => {
            const newHistory = [...prev];
            if (newHistory.length === lineIndex) {
              newHistory.push("");
            }
            newHistory[lineIndex] = currentLine.substring(0, charIndex + 1);
            return newHistory;
          });
          charIndex++;
          timeoutId = setTimeout(type, 1); // Faster typing
        } else {
          lineIndex++;
          charIndex = 0;
          timeoutId = setTimeout(type, 20); // Faster line break
        }
      } else {
        setTimeout(() => {
          setHistory(welcomeLines);
          setInitialAnimationDone(true);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, 300); // Faster transition to desktop
      }
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [isBooting, onAnimationComplete, initialAnimationDone]);

  useEffect(() => {
    if (initialAnimationDone) {
      inputRef.current?.focus();
    }
  }, [initialAnimationDone]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, initialAnimationDone]);

  const handleFocus = () => {
    if (initialAnimationDone && !isBooting) {
      inputRef.current?.focus();
    }
  };

  const processCommand = (command: string) => {
    const [cmd, ...args] = command.trim().toLowerCase().split(" ");
    switch (cmd) {
      case "help":
        return [
          "Available commands:",
          "  help          - Shows this help message.",
          "  clear         - Clears the terminal screen.",
          "  open <app>    - Opens an application (e.g., 'open projects').",
          "                  Available apps: projects, contact, about.",
          "  date          - Displays the current date and time.",
          "  exit          - Closes the terminal (just kidding).",
        ];
      case "clear":
        setHistory(isBooting ? welcomeLines : []);
        return [];
      case "open":
        if (args.length > 0 && onCommand) {
          return [onCommand(args[0])];
        }
        return ["Usage: open <app_name>"];
      case "date":
        return [new Date().toLocaleString()];
      case "exit":
        return ["You can't escape your destiny."];
      case "godmode":
        return [
          "Accessing super-secret mainframe...",
          "...",
          "...",
          "Heck, I don't know. I'm just a terminal.",
          "But you found an easter egg! Congrats!",
        ];
      case "":
        return [];
      default:
        return [
          `'${command}' is not recognized as an internal or external command.`,
        ];
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputValue.trim();
      const newHistory = [...history, PROMPT + command];

      if (command.toLowerCase() === "clear") {
        setHistory([]);
        setInputValue("");
        return;
      }

      const output = processCommand(command);
      setHistory([...newHistory, ...output]);
      setInputValue("");
    }
  };

  const terminalClasses = cn(
    "font-mono text-sm flex flex-col pointer-events-auto",
    isBooting
      ? "w-full max-w-4xl h-[400px] bg-black text-white"
      : "w-full max-w-2xl h-80 bg-[#C0C0C0] text-black rounded-sm shadow-2xl border-2 border-t-white border-l-white border-r-black border-b-black"
  );

  return (
    <div className={terminalClasses} onClick={handleFocus}>
      {!isBooting && (
        <div className="handle flex items-center justify-between p-1 bg-[#000080] text-white cursor-move">
          <span className="flex-1 ml-1 text-left">MS-DOS Prompt</span>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-[#C0C0C0] border-2 border-t-white border-l-white border-r-black border-b-black font-black text-xs flex items-center justify-center">
              _
            </button>
            <button className="w-4 h-4 bg-[#C0C0C0] border-2 border-t-white border-l-white border-r-black border-b-black font-black text-xs flex items-center justify-center">
              <span className="w-2 h-2 border-2 border-t-black border-l-black border-b-white border-r-white"></span>
            </button>
            <button className="w-4 h-4 bg-[#C0C0C0] border-2 border-t-white border-l-white border-r-black border-b-black font-black text-xs flex items-center justify-center">
              X
            </button>
          </div>
        </div>
      )}
      <div
        ref={scrollRef}
        className={cn(
          "p-2 overflow-y-auto flex-1 custom-scrollbar",
          isBooting ? "bg-black text-white" : "bg-black text-white m-1"
        )}
      >
        {history.map((line, index) => (
          <p
            key={index}
            className={cn(
              "whitespace-pre-wrap",
              isBooting && "text-glow"
            )}
          >
            {line}
          </p>
        ))}
        {initialAnimationDone && !isBooting && (
          <div className="flex">
            <span className="whitespace-pre-wrap">{PROMPT}</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white font-mono flex-1 caret-white"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        )}
      </div>
    </div>
  );
}

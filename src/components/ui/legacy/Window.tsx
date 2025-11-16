"use client";

import { cn } from "@/lib/utils";

type WindowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Window({ children, className }: WindowProps) {
  return (
    <div
      className={cn(
        "relative w-[80vw] max-w-5xl h-[90vh] flex flex-col z-20",
        className
      )}
    >
      {children}
    </div>
  );
}

"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Terminal } from "@/components/portfolio/shell/Terminal";
import { Desktop } from "@/components/portfolio/shell/Desktop";
import { MobileDesktop } from "@/components/portfolio/shell-mobile/MobileDesktop";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const isMobile = useIsMobile();

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <Terminal
          onAnimationComplete={handleAnimationComplete}
          isBooting={isLoading}
        />
      </div>
    );
  }

  if (isMobile === undefined) {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
      </div>
    );
  }

  return isMobile ? <MobileDesktop /> : <Desktop />;
}

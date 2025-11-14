
"use client";

import React from "react";
import { Terminal } from "@/components/portfolio/shell/Terminal";
import { Desktop } from "@/components/portfolio/shell/Desktop";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);

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

  return <Desktop />;
}

"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Terminal } from "@/components/portfolio/shell/Terminal";
import { Desktop } from "@/components/portfolio/shell/Desktop";
import { MobileDesktop } from "@/components/portfolio/shell-mobile/MobileDesktop";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [phase, setPhase] = React.useState("zoom"); // zoom -> boot -> desktop
  const isMobile = useIsMobile();

  const handleAnimationComplete = () => {
    setPhase("desktop");
  };

  const handleZoomComplete = () => {
    setPhase("boot");
  };

  if (phase === "zoom") {
    return (
      <div className="bg-black h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-full h-full relative"
          initial={{ scale: 1 }}
          animate={{ scale: 8 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          onAnimationComplete={handleZoomComplete}
        >
          <Image
            src="https://i.ibb.co/q3rR7rBq/background-terminal.jpg"
            alt="Retro Computer"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
      </div>
    );
  }

  if (phase === "boot") {
    return (
      <div className="bg-black h-screen flex items-center justify-center">
        <Terminal
          onAnimationComplete={handleAnimationComplete}
          isBooting={true}
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {isMobile ? <MobileDesktop /> : <Desktop />}
      </motion.div>
    </AnimatePresence>
  );
}

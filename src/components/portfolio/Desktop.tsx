"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "@/components/retro/Window";
import { About } from "@/components/portfolio/About";
import { Header } from "@/components/portfolio/Header";
import { Social } from "@/components/portfolio/Social";
import { Projects } from "@/components/portfolio/Projects";
import { Terminal } from "@/components/portfolio/Terminal";
import { Bio } from "@/components/portfolio/Bio";
import { MyPC } from "@/components/portfolio/MyPC";
import { RecycleBin } from "@/components/portfolio/RecycleBin";
import { DesktopIcons } from "@/components/portfolio/DesktopIcons";
import { AlertWindow } from "@/components/portfolio/AlertWindow";
import { SystemMonitor } from "@/components/portfolio/SystemMonitor";
import { CV } from "@/components/portfolio/CV";
import { cn } from "@/lib/utils";

export function Desktop() {
  const [openWindows, setOpenWindows] = React.useState<{
    [key: string]: boolean;
  }>({
    about: false,
    contact: false,
    projects: false,
    "my-pc": false,
    "recycle-bin": false,
    cv: false,
  });
  const [isBioOpen, setIsBioOpen] = React.useState(false);
  const [activeWindow, setActiveWindow] = React.useState<string | null>(null);
  const [alert, setAlert] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({ isOpen: false, title: "", message: "" });

  const handleIconClick = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: true }));
    setActiveWindow(id);
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows((prev) => ({ ...prev, [id]: false }));
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  };

  const handleEmptyRecycleBin = () => {
    setAlert({
      isOpen: true,
      title: "Error",
      message: "Cannot delete files. They are probably ghosts from another OS.",
    });
    setActiveWindow("alert");
  };

  const handleCloseBio = () => {
    setIsBioOpen(false);
    setActiveWindow("about");
  };

  const handleCloseAlert = () => {
    setAlert({ isOpen: false, title: "", message: "" });
    setActiveWindow(null);
  };

  const handleFocus = (id: string) => {
    if (alert.isOpen && id !== "alert") {
      setActiveWindow("alert");
      return;
    }
    if (isBioOpen && id !== "bio") {
      setActiveWindow("bio");
      return;
    }
    setActiveWindow(id);
  };

  const handleCommand = (command: string) => {
    const validApps = [
      "projects",
      "contact",
      "about",
      "my-pc",
      "recycle-bin",
      "cv",
      "resume",
    ];
    const openCommand = command.startsWith("open ")
      ? command.split(" ")[1]
      : command;

    if (validApps.includes(openCommand)) {
      const appId = openCommand === "resume" ? "cv" : openCommand;
      handleIconClick(appId);
      return `Opening ${appId}...`;
    }
    return `'${command}' is not a recognized app.`;
  };

  const handlePrintCV = () => {
    const printableContent = document.getElementById("printable-cv");
    if (!printableContent) return;

    const printContainer = document.createElement("div");
    printContainer.id = "print-container";
    const clonedContent = printableContent.cloneNode(true) as HTMLElement;

    // Remove the print button from the cloned content
    const printButton = clonedContent.querySelector(".print\\:hidden");
    if (printButton) {
      printButton.parentNode?.removeChild(printButton);
    }

    printContainer.appendChild(clonedContent);
    document.body.appendChild(printContainer);

    window.print();

    document.body.removeChild(printContainer);
  };

  const isAnyWindowOpen =
    Object.values(openWindows).some(Boolean) || isBioOpen || alert.isOpen;

  const windowAnimation = {
    initial: { scale: 0.8, opacity: 0, y: 50 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 20 },
    transition: { type: "spring", stiffness: 200, damping: 20 },
  };

  const backdropAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="bg-black h-screen font-display p-4 flex items-center justify-center relative print:hidden">
      <AnimatePresence>
        {isAnyWindowOpen && (
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10 print:hidden"
            variants={backdropAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            key="backdrop"
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col w-full h-full bg-white shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.3),inset_10px_0_15px_-10px_rgba(0,0,0,0.3),inset_-10px_0_15px_-10px_rgba(0,0,0,0.3)] overflow-hidden rounded-2xl border-4 border-black">
        <Header />
        <div id="desktop-content" className="relative flex-1 scanline-overlay">
          <main className="relative flex-1 p-8 bg-grid-pattern-more-lines h-full">
            <AnimatePresence>
              {openWindows.about && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{
                    zIndex:
                      activeWindow === "about" && !isBioOpen && !alert.isOpen
                        ? 20
                        : 11,
                  }}
                  onClick={() => handleFocus("about")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="about-window"
                >
                  <Window>
                    <About
                      onClose={() => handleCloseWindow("about")}
                      title="ABOUT ME"
                      onOpenSkills={() => {
                        setIsBioOpen(true);
                        setActiveWindow("bio");
                      }}
                      onOpenCV={() => handleIconClick("cv")}
                    />
                  </Window>
                </motion.div>
              )}

              {isBioOpen && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{ zIndex: activeWindow === "bio" ? 21 : 12 }}
                  onClick={() => handleFocus("bio")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="bio-window"
                >
                  <Window>
                    <Bio onClose={handleCloseBio} title="BIO & SKILLS" />
                  </Window>
                </motion.div>
              )}

              {openWindows.cv && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center"
                  style={{
                    zIndex: activeWindow === "cv" ? 20 : 21,
                  }}
                  onClick={() => handleFocus("cv")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="cv-window"
                >
                  <Window className="w-[90vw] max-w-4xl h-[90vh]">
                    <CV
                      onClose={() => handleCloseWindow("cv")}
                      title="CURRICULUM VITAE"
                      onPrint={handlePrintCV}
                    />
                  </Window>
                </motion.div>
              )}

              {openWindows.contact && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{ zIndex: activeWindow === "contact" ? 20 : 11 }}
                  onClick={() => handleFocus("contact")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="contact-window"
                >
                  <Window>
                    <Social
                      onClose={() => handleCloseWindow("contact")}
                      title="CONTACT"
                    />
                  </Window>
                </motion.div>
              )}

              {openWindows.projects && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{ zIndex: activeWindow === "projects" ? 20 : 11 }}
                  onClick={() => handleFocus("projects")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="projects-window"
                >
                  <Window className="w-[90vw] max-w-6xl">
                    <Projects
                      onClose={() => handleCloseWindow("projects")}
                      title="PROYECTOS"
                    />
                  </Window>
                </motion.div>
              )}

              {openWindows["my-pc"] && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{ zIndex: activeWindow === "my-pc" ? 20 : 11 }}
                  onClick={() => handleFocus("my-pc")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="my-pc-window"
                >
                  <Window>
                    <MyPC
                      onClose={() => handleCloseWindow("my-pc")}
                      title="MY PC"
                    />
                  </Window>
                </motion.div>
              )}

              {openWindows["recycle-bin"] && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{
                    zIndex: activeWindow === "recycle-bin" ? 20 : 11,
                  }}
                  onClick={() => handleFocus("recycle-bin")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="recycle-bin-window"
                >
                  <Window>
                    <RecycleBin
                      onClose={() => handleCloseWindow("recycle-bin")}
                      title="RECYCLE BIN"
                      onEmpty={handleEmptyRecycleBin}
                    />
                  </Window>
                </motion.div>
              )}

              {alert.isOpen && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{ zIndex: 22 }}
                  onClick={() => handleFocus("alert")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="alert-window"
                >
                  <AlertWindow
                    title={alert.title}
                    message={alert.message}
                    onClose={handleCloseAlert}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-12 left-8 print:hidden">
              <Terminal onCommand={handleCommand} isBooting={false} />
            </div>

            <DesktopIcons onIconClick={handleIconClick} />

            <div className="absolute bottom-8 right-8 print:hidden">
              <SystemMonitor />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

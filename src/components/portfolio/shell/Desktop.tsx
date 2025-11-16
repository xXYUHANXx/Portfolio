"use client";

import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "@/components/ui/legacy/Window";
import { About } from "@/components/portfolio/about/About";
import { Header } from "@/components/portfolio/shell/Header";
import { Social } from "@/components/portfolio/contact/Social";
import { Projects } from "@/components/portfolio/projects/Projects";
import { Terminal } from "@/components/portfolio/shell/Terminal";
import { Bio } from "@/components/portfolio/about/Bio";
import { MyPC } from "@/components/portfolio/my-pc/MyPC";
import { OSDrive } from "@/components/portfolio/my-pc/OsDrive";
import { RecycleBin } from "@/components/portfolio/recycle-bin/RecycleBin";
import { DesktopIcons } from "@/components/portfolio/shell/DesktopIcons";
import { AlertWindow } from "@/components/portfolio/shell/AlertWindow";
import { SystemMonitor } from "@/components/portfolio/shell/SystemMonitor";
import { CV } from "@/components/portfolio/cv/CV";
import { fetchGitHubProjects } from "@/lib/github";
import type { Project } from "@/domain/projects/entities/Project";
import { GamesDrive } from "@/components/portfolio/my-pc/GamesDrive";
import { WindowHeader } from "@/components/ui/legacy/WindowHeader";

function ProjectsLoader() {
  return (
    <Window className="w-[90vw] max-w-6xl h-[90vh]">
      <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <p>Loading GitHub Projects...</p>
        </div>
      </div>
    </Window>
  );
}

function ProjectsWrapper({ onClose }: { onClose: () => void }) {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadProjects() {
      try {
        const fetchedProjects = await fetchGitHubProjects();
        setProjects(fetchedProjects);
      } catch (e: any) {
        setError(e.message);
      }
    }
    loadProjects();
  }, []);

  if (error) {
    return (
      <Window className="w-[90vw] max-w-6xl h-[90vh]">
        <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full overflow-hidden">
          <div className="flex justify-center items-center h-full text-red-500">
            <p>Error loading projects: {error}</p>
          </div>
        </div>
      </Window>
    );
  }

  return <Projects onClose={onClose} title="PROYECTOS" projects={projects} />;
}

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
    "os-drive": false,
    "games-drive": false,
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
    const printContainerId = "print-container";

    const existingContainer = document.getElementById(printContainerId);
    if (existingContainer) {
      existingContainer.remove();
    }

    const printableContent = document.getElementById("printable-cv");
    if (!printableContent) return;

    const contentToPrint = printableContent.cloneNode(true) as HTMLElement;

    const printContainer = document.createElement("div");
    printContainer.id = printContainerId;
    printContainer.appendChild(contentToPrint);

    document.body.appendChild(printContainer);

    window.onafterprint = () => {
      const container = document.getElementById(printContainerId);
      if (container) {
        container.remove();
      }
      window.onafterprint = null;
    };

    window.print();
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
    <div className="bg-black h-screen font-display p-2 sm:p-4 flex items-center justify-center relative print:hidden">
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
        <div id="desktop-content" className="relative flex-1">
          <main className="relative flex-1 h-full p-4 md:p-8">
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
                  <Window className="w-[60vw] h-[90vh]">
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
                  <Window className="w-[60vw] h-[90vh]">
                    <Bio onClose={handleCloseBio} />
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
                  <Window className="w-[60vw] h-[90vh]">
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
                  <Window className="w-[60vw] h-[90vh]">
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
                  style={{ zIndex: activeWindow === "projects" ? 20 : 21 }}
                  onClick={() => handleFocus("projects")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="projects-window"
                >
                  <Window className="w-[90vw] h-[90vh]">
                    <Suspense fallback={<ProjectsLoader />}>
                      <ProjectsWrapper
                        onClose={() => handleCloseWindow("projects")}
                      />
                    </Suspense>
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
                      onOpenOSDrive={() => handleIconClick("os-drive")}
                      onOpenGamesDrive={() => handleIconClick("games-drive")}
                      onOpenProjects={() => handleIconClick("projects")}
                    />
                  </Window>
                </motion.div>
              )}

              {openWindows["os-drive"] && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{
                    zIndex: activeWindow === "os-drive" ? 20 : 21,
                  }}
                  onClick={() => handleFocus("os-drive")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="os-drive-window"
                >
                  <Window>
                    <OSDrive
                      onClose={() => handleCloseWindow("os-drive")}
                      title="OS (C:)"
                    />
                  </Window>
                </motion.div>
              )}

              {openWindows["games-drive"] && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center print:hidden"
                  style={{
                    zIndex: activeWindow === "games-drive" ? 20 : 21,
                  }}
                  onClick={() => handleFocus("games-drive")}
                  variants={windowAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key="games-drive-window"
                >
                  <Window>
                    <GamesDrive
                      onClose={() => handleCloseWindow("games-drive")}
                      title="Games (D:)"
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
                  <Window className="w-[60vw] h-[80vh]">
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

            <div className="absolute top-12 left-8 print:hidden hidden md:block">
              <Terminal onCommand={handleCommand} isBooting={false} />
            </div>

            <DesktopIcons onIconClick={handleIconClick} />

            <div className="absolute bottom-8 right-8 print:hidden hidden md:block">
              <SystemMonitor />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

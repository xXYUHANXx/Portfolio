"use client";

import React, { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Window } from "@/components/ui/legacy/Window";
import { About } from "@/components/portfolio/about/About";
import { Header } from "@/components/portfolio/shell-mobile/Header";
import { Social } from "@/components/portfolio/contact/Social";
import { Projects } from "@/components/portfolio/projects/Projects";
import { Bio } from "@/components/portfolio/about/Bio";
import { MyPC } from "@/components/portfolio/my-pc/MyPC";
import { OSDrive } from "@/components/portfolio/my-pc/OsDrive";
import { RecycleBin } from "@/components/portfolio/recycle-bin/RecycleBin";
import { AlertWindow } from "@/components/portfolio/shell/AlertWindow";
import { CV } from "@/components/portfolio/cv/CV";
import { fetchGitHubProjects } from "@/lib/github";
import type { Project } from "@/domain/projects/entities/Project";
import { GamesDrive } from "@/components/portfolio/my-pc/GamesDrive";
import { Dock } from "@/components/portfolio/shell-mobile/Dock";
import { MainIcons } from "@/components/portfolio/shell-mobile/MainIcons";
import { MobileProjects } from "@/components/portfolio/projects/MobileProjects";
import { MobileContact } from "@/components/portfolio/contact/MobileContact";


function ProjectsLoader() {
  return (
    <Window className="w-full h-full p-2">
      <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-lg shadow-lg bg-white flex flex-col flex-grow h-full overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <p>Loading GitHub Projects...</p>
        </div>
      </div>
    </Window>
  );
}

function ProjectsWrapper({
  isMobile,
}: {
  isMobile: boolean;
}) {
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
      <Window className="w-full h-full p-2">
        <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-lg shadow-lg bg-white flex flex-col flex-grow h-full overflow-hidden">
          <div className="flex justify-center items-center h-full text-red-500">
            <p>Error loading projects: {error}</p>
          </div>
        </div>
      </Window>
    );
  }

  if (isMobile) {
    return <MobileProjects projects={projects} />;
  }

  return <Projects onClose={() => {}} title="PROYECTOS" projects={projects} />;
}

export function MobileDesktop() {
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

  const handleHomeClick = () => {
    // Close all windows by setting their state to false
    const allClosed = Object.keys(openWindows).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as { [key: string]: boolean });
  
    setOpenWindows(allClosed);
    setIsBioOpen(false);
    setActiveWindow(null);
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

  const windowAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 },
  };

  const renderWindow = (id: string, component: React.ReactNode) => (
    <AnimatePresence>
      {openWindows[id] && (
        <motion.div
          className="absolute inset-0 bg-white"
          style={{ zIndex: activeWindow === id ? 21 : 20 }}
          variants={windowAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          key={`${id}-window`}
        >
          {component}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="bg-black h-screen font-display flex items-center justify-center">
      <div className="w-full max-w-sm h-[95vh] max-h-[800px] bg-white rounded-3xl border-8 border-black shadow-2xl flex flex-col overflow-hidden">
        <Header />
        <main className="relative flex-1 p-4 bg-grid-pattern-more-lines">
          <MainIcons onIconClick={handleIconClick} />

          {renderWindow(
            "about",
            <About
              onClose={() => handleCloseWindow("about")}
              title="ABOUT ME"
              onOpenSkills={() => {
                setIsBioOpen(true);
                setActiveWindow("bio");
              }}
              onOpenCV={() => handleIconClick("cv")}
            />
          )}

          {isBioOpen && (
            <motion.div
              className="absolute inset-0 z-20 bg-white"
              style={{ zIndex: activeWindow === "bio" ? 22 : 19 }}
              variants={windowAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              key="bio-window"
            >
              <Bio onClose={handleCloseBio} title="BIO & SKILLS" />
            </motion.div>
          )}

          {renderWindow(
            "cv",
            <CV
              onClose={() => handleCloseWindow("cv")}
              title="CURRICULUM VITAE"
              onPrint={handlePrintCV}
            />
          )}

          {renderWindow(
            "contact",
            <MobileContact />
          )}

          {renderWindow(
            "projects",
            <Suspense fallback={<ProjectsLoader />}>
              <ProjectsWrapper
                isMobile={true}
              />
            </Suspense>
          )}

          {renderWindow(
            "my-pc",
            <MyPC
              onClose={() => handleCloseWindow("my-pc")}
              title="MY PC"
              onOpenOSDrive={() => handleIconClick("os-drive")}
              onOpenGamesDrive={() => handleIconClick("games-drive")}
              onOpenProjects={() => handleIconClick("projects")}
            />
          )}

          {renderWindow(
            "os-drive",
            <OSDrive
              onClose={() => handleCloseWindow("os-drive")}
              title="OS (C:)"
            />
          )}

          {renderWindow(
            "games-drive",
            <GamesDrive
              onClose={() => handleCloseWindow("games-drive")}
              title="Games (D:)"
            />
          )}

          {renderWindow(
            "recycle-bin",
            <RecycleBin
              onClose={() => handleCloseWindow("recycle-bin")}
              title="RECYCLE BIN"
              onEmpty={handleEmptyRecycleBin}
            />
          )}

          <AnimatePresence>
            {alert.isOpen && (
              <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertWindow
                  title={alert.title}
                  message={alert.message}
                  onClose={handleCloseAlert}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Dock onIconClick={handleIconClick} onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

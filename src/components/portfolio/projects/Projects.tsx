"use client";

import { useState, useEffect } from "react";
import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Folder, FolderOpen, Star, GitFork } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/infrastructure/projects/projects-data";
import {
  IconHTML,
  IconCSS,
  IconJS,
  IconReact,
  IconNextJS,
  IconNode,
  IconJava,
  IconSpringBoot,
  IconPHP,
  IconPython,
  IconFigma,
  IconCSharp,
  IconC,
  IconCPP,
  IconFramerMotion,
  IconTailwindCSS,
  IconFirebase,
  IconGemini,
  IconTypeScript,
  IconWebRTC,
  IconWebSocket,
  IconTelemedicine,
  IconDatabase,
  IconTracking,
  IconLogistics,
  IconPrisma,
  IconPostgreSQL,
} from "@/components/portfolio/SkillIcons";

const topicDetails: {
  [key: string]: { color: string; icon: React.ReactNode };
} = {
  react: { color: "#61DAFB", icon: <IconReact /> },
  nextjs: { color: "#000000", icon: <IconNextJS /> },
  tailwindcss: { color: "#38B2AC", icon: <IconTailwindCSS /> },
  javascript: { color: "#F0DB4F", icon: <IconJS /> },
  typescript: { color: "#007ACC", icon: <IconTypeScript /> },
  "framer-motion": { color: "#0055FF", icon: <IconFramerMotion /> },
  firebase: { color: "#FFCA28", icon: <IconFirebase /> },
  "google-ai": { color: "#448aff", icon: <IconGemini /> },
  webrtc: { color: "#F60", icon: <IconWebRTC /> },
  websocket: { color: "#231F20", icon: <IconWebSocket /> },
  portfolio: { color: "#8A2BE2", icon: null },
  "landing-page": { color: "#22C55E", icon: null },
  html: { color: "#E44D26", icon: <IconHTML /> },
  css: { color: "#1572B6", icon: <IconCSS /> },
  "university-project": { color: "#6B7280", icon: null },
  telemedicine: { color: "#0891B2", icon: <IconTelemedicine /> },
  "database-design": { color: "#E11D48", icon: <IconDatabase /> },
  design: { color: "#F97316", icon: <IconFigma /> },
  "restaurant-ui": { color: "#F59E0B", icon: null },
  logistics: { color: "#1D4ED8", icon: <IconLogistics /> },
  "tracking-app": { color: "#4F46E5", icon: <IconTracking /> },
  prisma: { color: "#0C344B", icon: <IconPrisma /> },
  postgresql: { color: "#336791", icon: <IconPostgreSQL /> },
  Nodejs: { color: "#83CD29", icon: <IconNode /> },
};

export function Projects({
  onClose,
  title,
  projects,
}: {
  onClose: () => void;
  title: string;
  projects: Project[];
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
      return;
    }
    if (
      selectedProject &&
      !projects.find((p) => p.id === selectedProject.id) &&
      projects.length > 0
    ) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  if (!projects.length) {
    return (
      <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full overflow-hidden">
        <WindowHeader title={title} onClose={onClose} />
        <div className="flex justify-center items-center h-full">
          <p>No se encontraron proyectos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full overflow-hidden">
      <WindowHeader title={title} onClose={onClose} />
      <div className="flex flex-grow min-h-0">
        {/* Left Sidebar */}
        <div className="w-1/4 md:w-1/5 border-r-2 border-black p-4 flex flex-col">
          <button className="w-full text-center py-2 border-2 border-black rounded-full mb-6 font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-xs">
            Web Projects
          </button>
          <ScrollArea className="flex-1 pr-2">
            <ul className="space-y-2">
              {projects.map((project) => {
                const isSelected = selectedProject?.id === project.id;
                const isHovered = hoveredId === project.id;
                const isOpen = isSelected || isHovered;
                return (
                  <motion.li
                    key={project.id}
                    animate={{ x: isSelected ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <button
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={cn(
                        "w-full flex items-center gap-2 p-1.5 rounded-md text-left text-sm transition-colors",
                        isSelected
                          ? "text-black"
                          : "text-gray-500 hover:text-black"
                      )}
                    >
                      <div className="w-6 h-6 flex-shrink-0">
                        {isOpen ? <FolderOpen /> : <Folder />}
                      </div>
                      <span className="break-words">{project.name}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="w-3/4 md:w-4/5 flex flex-grow min-h-0">
          <ScrollArea className="w-full h-full">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col md:flex-row h-full"
                >
                  {/* Center Details */}
                  <div
                    className={cn(
                      "w-full p-8 flex flex-col justify-center",
                      selectedProject.imageUrl && "md:w-1/2"
                    )}
                  >
                    <h2 className="font-display text-4xl font-bold mb-1">
                      {selectedProject.name}
                    </h2>
                    <div className="flex items-center gap-4 mb-4 text-gray-700">
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span>{selectedProject.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={16} />
                        <span>{selectedProject.forks_count}</span>
                      </div>
                      {selectedProject.language && (
                        <div className="px-2 py-0.5 text-xs bg-gray-200 rounded-full border border-gray-400">
                          {selectedProject.language}
                        </div>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                      {selectedProject.description ||
                        "No description provided for this repository."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.topics.map((topic) => {
                        const detail = topicDetails[topic] || {
                          color: "#a1a1aa",
                          icon: null,
                        };
                        return (
                          <button
                            key={topic}
                            className="group flex items-center gap-2 bg-white border-2 border-black rounded-md px-3 py-1.5 hover:text-white active:bg-gray-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-xs"
                            style={
                              {
                                "--skill-color": detail.color,
                              } as React.CSSProperties
                            }
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor =
                                detail.color;
                              e.currentTarget.style.borderColor = detail.color;
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                              e.currentTarget.style.borderColor = "black";
                            }}
                          >
                            {detail.icon && (
                              <div className="group-hover:invert">
                                {detail.icon}
                              </div>
                            )}
                            <span>{topic}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-4">
                      {selectedProject.html_url && (
                        <a
                          href={selectedProject.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 w-max px-4 py-2 bg-white border-2 border-black rounded-full font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:bg-gray-200 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-sm group"
                        >
                          <Image
                            src="https://i.ibb.co/Wv050888/Github.png"
                            alt="Repository URL"
                            width={24}
                            height={24}
                            className="w-6 h-6 group-hover:invert"
                            data-ai-hint="Github icon"
                          />
                          Repository
                        </a>
                      )}
                      {selectedProject.homepageUrl && (
                        <a
                          href={selectedProject.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 w-max px-4 py-2 bg-white border-2 border-black rounded-full font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:bg-gray-200 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-sm group"
                        >
                          <Image
                            src="https://i.ibb.co/Xf7VPg2T/navegador.png"
                            alt="Live URL"
                            width={24}
                            height={24}
                            className="w-6 h-6 group-hover:invert"
                            data-ai-hint="web icon"
                          />
                          Web Site
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Image */}
                  {selectedProject.imageUrl && (
                    <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
                      <div className="w-full h-full min-h-[300px] border-4 border-black rounded-2xl shadow-lg overflow-hidden bg-gray-100">
                        <Image
                          src={selectedProject.imageUrl}
                          alt={selectedProject.name}
                          width={600}
                          height={800}
                          className="w-full h-full object-fill object-top"
                          data-ai-hint="website screenshot"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

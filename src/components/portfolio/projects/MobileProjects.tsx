"use client";

import type { Project } from "@/domain/projects/entities/Project";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  IconReact,
  IconNextJS,
  IconTailwindCSS,
  IconJS,
  IconTypeScript,
  IconFramerMotion,
  IconFirebase,
  IconGemini,
  IconWebRTC,
  IconWebSocket,
  IconTelemedicine,
  IconDatabase,
  IconTracking,
  IconLogistics,
  IconPrisma,
  IconPostgreSQL,
  IconNode,
  IconHTML,
  IconCSS,
  IconJava,
  IconSpringBoot,
  IconPHP,
  IconPython,
  IconCSharp,
  IconC,
  IconCPP,
  IconMySQL,
  IconFigma,
} from "@/components/portfolio/SkillIcons";
import { ScrollArea } from "@/components/ui/scroll-area";

const topicIcons: {
  [key: string]: React.ReactNode;
} = {
  react: <IconReact />,
  nextjs: <IconNextJS />,
  tailwindcss: <IconTailwindCSS />,
  javascript: <IconJS />,
  typescript: <IconTypeScript />,
  "framer-motion": <IconFramerMotion />,
  firebase: <IconFirebase />,
  "google-ai": <IconGemini />,
  webrtc: <IconWebRTC />,
  websocket: <IconWebSocket />,
  telemedicine: <IconTelemedicine />,
  "database-design": <IconDatabase />,
  design: <IconFigma />,
  logistics: <IconLogistics />,
  "tracking-app": <IconTracking />,
  prisma: <IconPrisma />,
  postgresql: <IconPostgreSQL />,
  nodejs: <IconNode />,
  html: <IconHTML />,
  css: <IconCSS />,
  java: <IconJava />,
  "spring-boot": <IconSpringBoot />,
  php: <IconPHP />,
  python: <IconPython />,
  csharp: <IconCSharp />,
  c: <IconC />,
  cpp: <IconCPP />,
  mysql: <IconMySQL />,
};

export function MobileProjects({ projects }: { projects: Project[] }) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const contentVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="w-full h-full flex flex-col bg-white bg-grid-pattern-more-lines">
      <div className="p-4 text-center">
        <button className="w-auto inline-block text-center py-2 px-6 border-2 border-black rounded-full  font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-sm">
          PROYECTOS WEB
        </button>
      </div>
      <ScrollArea className="flex-grow">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-6 pb-8 px-4"
          value={activeItem || ""}
          onValueChange={setActiveItem}
        >
          {projects.map((project) => {
            const value = `item-${project.id}`;
            const isOpen = activeItem === value;

            return (
              <AccordionItem
                key={project.id}
                value={value}
                className="border-b-2 border-black"
              >
                <AccordionTrigger className="!no-underline hover:!no-underline text-left">
                  <div className="flex items-center gap-2">
                    <span>▸</span>
                    <h3 className="text-xl font-medium font-display leading-tight">
                      {project.name}
                    </h3>
                  </div>
                </AccordionTrigger>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      variants={contentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-6 space-y-4">
                        <p className="text-sm text-gray-700 font-mono leading-relaxed text-justify">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {project.topics.map((topic) => {
                            const icon = topicIcons[topic];
                            if (!icon) return null;
                            return (
                              <div
                                key={topic}
                                className="w-8 h-8 flex items-center justify-center"
                                title={topic}
                              >
                                {icon}
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          {project.html_url && (
                            <a
                              href={project.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-12 h-12 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:bg-gray-200 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all group"
                              title="Repository"
                            >
                              <Image
                                src="https://i.ibb.co/Wv050888/Github.png"
                                alt="Repository URL"
                                width={24}
                                height={24}
                                className="w-6 h-6 group-hover:invert"
                                data-ai-hint="Github icon"
                              />
                            </a>
                          )}
                          {project.homepageUrl && (
                            <a
                              href={project.homepageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center w-12 h-12 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:bg-gray-200 active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all group"
                              title="Web Site"
                            >
                              <Image
                                src="https://i.ibb.co/Xf7VPg2T/navegador.png"
                                alt="Live URL"
                                width={24}
                                height={24}
                                className="w-6 h-6 group-hover:invert"
                                data-ai-hint="web icon"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
    </div>
  );
}

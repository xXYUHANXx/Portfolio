"use client";

import { useState } from "react";
import { WindowHeader } from "@/components/retro/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Folder, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const projectsData = [
  {
    id: "coduck",
    title: "CoDuck",
    subtitle: "Innovación en Mantenimiento Web",
    description:
      "CoDuck es una plataforma especializada en ofrecer mantenimiento y soporte técnico ilimitado para sitios web. Diseñada para pequeñas empresas, garantiza la actualización de contenido, solución de problemas técnicos, optimización de velocidad y personalización de diseño. Todo gestionado eficientemente a través de Trello. El sitio web de CoDuck, desarrollado en WordPress con integraciones en Stripe, JavaScript y PHP, se centró en un diseño minimalista optimizado para la conversión. El principal desafío fue crear una plataforma rápida y funcional que facilitara la experiencia del usuario, asegurando una navegación intuitiva y eficiente.",
    imageUrl: "https://i.ibb.co/yBYW02N/coduck-preview.png",
    tags: ["WordPress", "Elementor", "PHP", "JavaScript", "Stripe"],
    liveUrl: "#",
  },
  {
    id: "delirium",
    title: "Delirium",
    subtitle: "E-commerce de Ropa Alternativa",
    description:
      "Una tienda online para una marca de ropa con estética oscura y alternativa. El reto fue crear una experiencia de compra inmersiva que reflejara la identidad de la marca, con un sistema de catálogo de productos fácil de gestionar y un checkout seguro.",
    imageUrl: "https://placehold.co/600x800.png",
    tags: ["Shopify", "Liquid", "JavaScript", "CSS"],
    liveUrl: "#",
  },
  {
    id: "ucm",
    title: "UCM",
    subtitle: "Plataforma de Gestión Académica",
    description:
      "Desarrollo de un sistema interno para una universidad, permitiendo a los estudiantes y profesores gestionar horarios, calificaciones y materiales de curso. La interfaz fue diseñada para ser intuitiva y accesible para usuarios con diferentes niveles de habilidad técnica.",
    imageUrl: "https://placehold.co/600x800.png",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "#",
  },
];

export function Projects({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full overflow-hidden">
      <WindowHeader title={title} onClose={onClose} />
      <div className="flex flex-grow min-h-0">
        {/* Left Sidebar */}
        <div className="w-1/4 md:w-1/5 border-r-2 border-black p-4 flex flex-col">
          <button className="w-full text-center py-2 border-2 border-black rounded-full mb-6 font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-xs">
            PROYECTOS WEB
          </button>
          <ScrollArea className="flex-1 pr-2">
            <ul className="space-y-2">
              {projectsData.map((project) => (
                <li key={project.id}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className={cn(
                      "w-full flex items-center gap-2 p-1.5 rounded-md text-left text-sm transition-colors",
                      selectedProject.id === project.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-200"
                    )}
                  >
                    <Folder className="w-4 h-4 flex-shrink-0" />
                    <span>{project.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="w-3/4 md:w-4/5 flex flex-grow min-h-0">
          <ScrollArea className="w-full h-full">
            <div className="flex h-full">
              {/* Center Details */}
              <div className="w-1/2 p-8 flex flex-col justify-center">
                <h2 className="font-display text-4xl font-bold mb-1">
                  {selectedProject.title}
                </h2>
                <p className="text-lg mb-4 font-semibold text-gray-700">
                  {selectedProject.subtitle}
                </p>
                <p className="text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <p className="text-xs font-semibold tracking-widest text-gray-500 mb-6">
                  {selectedProject.tags.join(" | ")}
                </p>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Globe className="w-8 h-8 text-black hover:text-gray-600 transition-colors" />
                </a>
              </div>

              {/* Right Image */}
              <div className="w-1/2 p-8 flex items-center justify-center">
                <div className="w-full h-[90%] border-4 border-black rounded-2xl shadow-lg overflow-hidden">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover object-top"
                    data-ai-hint="website screenshot"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
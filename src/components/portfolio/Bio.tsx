"use client";

import { WindowHeader } from "@/components/retro/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

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
  IconCSharp,
  IconC,
  IconCPP,
  IconFigma,
  IconTypeScript,
  IconPrisma,
  IconPostgreSQL,
  IconMySQL,
  IconTailwindCSS,
  IconFirebase
} from "@/components/portfolio/SkillIcons";
import { cn } from "@/lib/utils";

const skillIcons = [
  { name: "HTML", icon: <IconHTML />, color: "#E44D26" },
  { name: "CSS", icon: <IconCSS />, color: "#1572B6" },
  { name: "JavaScript", icon: <IconJS />, color: "#F0DB4F" },
  { name: "TypeScript", icon: <IconTypeScript />, color: "#007ACC" },
  { name: "PHP", icon: <IconPHP />, color: "#777BB3" },
  { name: "Python", icon: <IconPython />, color: "#306998" },
  { name: "Java", icon: <IconJava />, color: "#0074BD" },
  { name: "Spring Boot", icon: <IconSpringBoot />, color: "#77BC1F" },
  { name: "React", icon: <IconReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <IconNextJS />, color: "#000000" },
  { name: "Node.js", icon: <IconNode />, color: "#83CD29" },
  { name: "C", icon: <IconC />, color: "#03599C" },
  { name: "C++", icon: <IconCPP />, color: "#00599C" },
  { name: "C#", icon: <IconCSharp />, color: "#9B4F96" },
  { name: "Figma", icon: <IconFigma />, color: "#F24E1E" },
  { name: "Prisma", icon: <IconPrisma />, color: "#0C344B" },
  { name: "PostgreSQL", icon: <IconPostgreSQL />, color: "#336791" },
  { name: "MySQL", icon: <IconMySQL />, color: "#4479A1" },
  { name: "Tailwind CSS", icon: <IconTailwindCSS />, color: "#38B2AC" },
  { name: "Firebase", icon: <IconFirebase />, color: "#FFCA28" },
];

export function Bio({
  onClose,
  title,
}: {
  onClose: () => void;
  title: string;
}) {
  const bioText =
    "Estudiante del séptimo semestre de Informática, apasionado por la tecnología y el desarrollo de software. Tengo experiencia práctica en un amplio espectro de lenguajes, incluyendo Python, Java, JavaScript y C#, y me especializo en la creación de experiencias web modernas con React y Next.js. Soy un profesional en formación, proactivo y siempre dispuesto a colaborar para entregar soluciones tecnológicas de alto impacto.";

  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full max-h-[90vh]">
      <WindowHeader title={title} onClose={onClose} />
      <ScrollArea className="flex-grow">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold font-display mb-4 text-center">
              BIO
            </h2>
            <div className="clearfix">
              <Image
                src="https://i.ibb.co/b09NZHc/Yuhan.png"
                alt="Yuhan Picos"
                width={120}
                height={120}
                className="rounded-full border-4 border-black shadow-md float-left mr-4 mb-2"
                style={{
                  shapeOutside: "circle(50%)",
                }}
                data-ai-hint="portrait photo"
              />
              <p className="text-base text-justify leading-relaxed">
                {bioText}
              </p>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-black"></div>

          <div>
            <h2 className="text-lg font-bold font-display mb-4 text-center">
              SKILLS
            </h2>
            <div className="w-full flex flex-wrap gap-2 items-center justify-center mb-4">
              {skillIcons.map((skill, index) => (
                <button
                  key={index}
                  className="group flex items-center gap-2 bg-white border-2 border-black rounded-md px-3 py-1.5 hover:text-white active:bg-gray-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-xs"
                  style={
                    {
                      "--skill-color": skill.color,
                    } as React.CSSProperties
                  }
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = skill.color;
                    e.currentTarget.style.borderColor = skill.color;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.borderColor = "black";
                  }}
                >
                  <div className="group-hover:invert">{skill.icon}</div>
                  <span>{skill.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

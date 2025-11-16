"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import React from "react";
import { ArrowLeft } from "lucide-react";

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
  IconFirebase,
  IconGemini,
  IconFramerMotion,
} from "@/components/portfolio/SkillIcons";

type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <IconReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <IconNextJS />, color: "#000000" },
      { name: "JavaScript", icon: <IconJS />, color: "#F0DB4F" },
      { name: "TypeScript", icon: <IconTypeScript />, color: "#007ACC" },
      { name: "HTML", icon: <IconHTML />, color: "#E44D26" },
      { name: "CSS", icon: <IconCSS />, color: "#1572B6" },
      { name: "Tailwind CSS", icon: <IconTailwindCSS />, color: "#38B2AC" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <IconNode />, color: "#83CD29" },
      { name: "Java", icon: <IconJava />, color: "#0074BD" },
      { name: "Spring Boot", icon: <IconSpringBoot />, color: "#77BC1F" },
      { name: "PHP", icon: <IconPHP />, color: "#777BB3" },
      { name: "Python", icon: <IconPython />, color: "#306998" },
      { name: "C#", icon: <IconCSharp />, color: "#9B4F96" },
      { name: "C", icon: <IconC />, color: "#03599C" },
      { name: "C++", icon: <IconCPP />, color: "#00599C" },
    ],
  },
  {
    title: "Databases & ORMs",
    skills: [
      { name: "PostgreSQL", icon: <IconPostgreSQL />, color: "#336791" },
      { name: "MySQL", icon: <IconMySQL />, color: "#4479A1" },
      { name: "Prisma", icon: <IconPrisma />, color: "#0C344B" },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Figma", icon: <IconFigma />, color: "#F24E1E" },
      { name: "Firebase", icon: <IconFirebase />, color: "#FFCA28" },
      { name: "Google AI", icon: <IconGemini />, color: "#448aff" },
      { name: "Framer Motion", icon: <IconFramerMotion />, color: "#0055FF" },
    ],
  },
];

const socialSkills = [
  { name: "Comunicación", color: "#3B82F6" },
  { name: "Trabajo en Equipo", color: "#10B981" },
  { name: "Resolución de Problemas", color: "#F97316" },
  { name: "Adaptabilidad", color: "#8B5CF6" },
  { name: "Pensamiento Crítico", color: "#EC4899" },
  { name: "Creatividad", color: "#F59E0B" },
];

export function MobileBio({ onBack }: { onBack: () => void }) {
  const bioText =
    "Estudiante del séptimo semestre de Informática, apasionado por la tecnología y el desarrollo de software. Tengo experiencia práctica en un amplio espectro de lenguajes, incluyendo Python, Java, JavaScript y C#, y me especializo en la creación de experiencias web modernas con React y Next.js. Soy un profesional en formación, proactivo y siempre dispuesto a colaborar para entregar soluciones tecnológicas de alto impacto.";

  return (
    <div className="w-full h-full flex flex-col bg-white bg-grid-pattern-more-lines">
      {/* HEADER */}
      <div className="p-4 text-center relative flex items-center justify-center border-b-2 border-black">
        <button
          onClick={onBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="py-2 px-6 border-2 border-black rounded-full font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-sm font-display">
          BIO & SKILLS
        </div>
      </div>

      {/* BODY */}
      <ScrollArea className="flex-grow">
        <div className="p-2 gap-4 flex flex-col">
          {/* BIO SECTION */}
          <div>
            <div className="p-4">
              <div className="max-w-full">
                <Image
                  src="https://i.ibb.co/b09NZHc/Yuhan.png"
                  alt="Yuhan Picos"
                  width={140}
                  height={140}
                  className="float-left mr-4 mb-2 rounded-full border-4 border-black shadow-md"
                />

                <p className="text-base text-justify leading-relaxed font-mono">
                  {bioText}
                </p>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div>
            <h2 className="text-lg font-bold font-display p-2 text-center border-b-2 border-black">
              SKILLS
            </h2>

            <ScrollArea>
              <div className="space-y-8">
                {skillCategories.map((category) => (
                  <div key={category.title}>
                    <h3 className="font-display text-md p-2">
                      {category.title}
                    </h3>

                    {/* 2 columnas mínimo */}
                    <div className="grid grid-cols-2 gap-3">
                      {category.skills.map((skill) => (
                        <button
                          key={skill.name}
                          className="group w-full flex items-center justify-center gap-2 bg-white border-2 border-black rounded-md px-3 py-1.5 shadow-[2px_2px_0_rgba(0,0,0,1)] hover:text-white active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-xs"
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
                          <span className="font-mono text-center">
                            {skill.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* SOCIAL SKILLS */}
          <div>
            <h2 className="text-lg font-bold font-display p-2 text-center border-b-2 border-black">
              SOCIAL SKILLS
            </h2>

            <ScrollArea className="p-4 max-h-[250px] min-h-[150px]">
              <div className="grid grid-cols-2 gap-3">
                {socialSkills.map((skill, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-center bg-white border-2 border-black rounded-md px-3 py-1.5 text-xs shadow-[2px_2px_0_rgba(0,0,0,1)] hover:text-white active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = skill.color;
                      e.currentTarget.style.borderColor = skill.color;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.borderColor = "black";
                    }}
                  >
                    <span className="font-mono">{skill.name}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

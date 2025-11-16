"use client";

import {
  Github,
  Linkedin,
  Smartphone,
  Mail,
  Printer,
  ArrowLeft,
} from "lucide-react";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MobileCV({
  onBack,
  onPrint,
}: {
  onBack: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b-2 border-black sticky top-0 bg-white z-10">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <button className="w-auto inline-block text-center py-2 px-6 border-2 border-black rounded-full  font-semibold shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white text-xs">
          CURRICULUM VITAE
        </button>
        <button
          onClick={onPrint}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Print or Save PDF"
        >
          <Printer size={24} />
        </button>
      </div>

      {/* CV content */}
      <ScrollArea className="flex-grow">
        <div id="printable-cv">
          <div className="max-w-4xl mx-auto bg-white">
            {/* Header */}
            <header className="bg-gray-800 text-white p-6 print:p-4">
              <div className="text-center">
                <h1 className="text-2xl print:text-xl font-bold font-display">
                  Yuhan Picos
                </h1>
                <p className="text-sm print:text-sm mt-1">
                  Desarrollador de Software en Formación
                </p>
              </div>

              <div className="flex justify-center items-center gap-6 mt-4 text-xs">
                <a
                  href="mailto:yuhanpicos.dev@gmail.com"
                  className="flex items-center gap-2 hover:text-gray-300 transition-transform hover:scale-110"
                  title="yuhanpicos.dev@gmail.com"
                >
                  <Mail size={20} />
                </a>

                <a
                  href="https://wa.me/+584164973499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300 transition-transform hover:scale-110"
                  title="+58 416-4973499"
                >
                  <Smartphone size={20} />
                </a>

                <a
                  href="https://github.com/xXYUHANXx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300 transition-transform hover:scale-110"
                  title="GitHub: xXYUHANXx"
                >
                  <Github size={20} />
                </a>

                <a
                  href="https://www.linkedin.com/in/yuhanpicos2308/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300 transition-transform hover:scale-110"
                  title="LinkedIn: yuhanpicos2308"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </header>

            {/* Main */}
            <main className="p-6 print:p-4 text-gray-800 text-sm">
              {/* Perfil Profesional */}
              <section className="mb-6 print:mb-3">
                <h2 className="text-base print:text-base font-bold font-display border-b-2 border-gray-300 pb-1 mb-2">
                  Perfil Profesional
                </h2>
                <p className="text-justify leading-relaxed font-mono">
                  Estudiante del séptimo semestre de Informática, apasionado por
                  la tecnología y el desarrollo de software. Experiencia en
                  Python, Java, JavaScript, C# y desarrollo web con React y
                  Next.js. Proactivo, con disposición para aprender y aportar
                  soluciones eficientes.
                </p>
              </section>

              {/* Habilidades Técnicas */}
              <section className="mb-6 print:mb-3">
                <h2 className="text-base print:text-base font-bold font-display border-b-2 border-gray-300 pb-1 mb-2">
                  Habilidades Técnicas
                </h2>
                <div className="space-y-4 print:space-y-2 font-mono">
                  <div>
                    <h3 className="text-xs font-semibold mb-1 font-display">
                      Frontend
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        <span className="font-bold">React & Next.js</span>{" "}
                        (Especialidad)
                      </li>
                      <li>JavaScript & TypeScript</li>
                      <li>HTML5 & CSS3 (Tailwind CSS)</li>
                      <li>Figma (Diseño y prototipado)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold mb-1 font-display">
                      Backend
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Node.js & Express</li>
                      <li>Java & Spring Boot</li>
                      <li>PHP, Python, C#, C/C++</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold mb-1 font-display">
                      Bases de Datos
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>PostgreSQL & MySQL</li>
                      <li>Prisma (ORM)</li>
                      <li>Modelado de Bases de Datos</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold mb-1 font-display">
                      Herramientas y Tecnologías
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Git & GitHub</li>
                      <li>Firebase (Auth, Firestore)</li>
                      <li>Google AI & Genkit</li>
                      <li>Framer Motion</li>
                      <li>WebRTC & WebSockets</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Educación */}
              <section className="mb-6 print:mb-3">
                <h2 className="text-base print:text-base font-bold font-display border-b-2 border-gray-300 pb-1 mb-2">
                  Educación
                </h2>
                <div>
                  <h3 className="text-xs font-semibold font-display">
                    Licenciatura en Informática
                  </h3>
                  <p className="text-gray-600 text-xs font-mono">
                    Universidad de Oriente (UDO) | 2022 - Presente
                  </p>
                  <p className="mt-1 font-mono">
                    Séptimo semestre, enfoque en desarrollo de software y
                    sistemas de información.
                  </p>
                </div>
              </section>

              {/* Proyectos */}
              <section>
                <h2 className="text-base print:text-base font-bold font-display border-b-2 border-gray-300 pb-1 mb-2">
                  Proyectos Destacados
                </h2>
                <div className="space-y-4 print:space-y-3 font-mono">
                  <div>
                    <h3 className="text-xs font-semibold font-display">
                      Cargo Track — App de Logística Full-Stack
                    </h3>
                    <p className="text-justify leading-relaxed">
                      Aplicación full-stack para la gestión de envíos. Permite
                      registro de usuarios, cotizaciones y seguimiento en tiempo
                      real, además de un panel administrativo para manejo de
                      rutas y logística.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold font-display">
                      Momentos Robin Hood — App de Recetas con IA
                    </h3>
                    <p className="text-justify leading-relaxed">
                      Plataforma web de recetas desarrollada con Next.js,
                      Firebase y Google AI, ofreciendo una experiencia moderna y
                      dinámica.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

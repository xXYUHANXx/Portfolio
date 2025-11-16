"use client";

import { Github, Linkedin, Smartphone, Mail, Printer } from "lucide-react";
import Link from "next/link";
import React from "react";
import { WindowHeader } from "@/components/ui/legacy/WindowHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function CV({
  onClose,
  title,
  onPrint,
}: {
  onClose: () => void;
  title: string;
  onPrint: () => void;
}) {
  return (
    <div className="relative font-mono text-sm bg-grid-pattern-more-lines border-4 border-black rounded-[40px] shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white flex flex-col flex-grow h-full overflow-hidden">
      <WindowHeader title={title} onClose={onClose} />
      <div className="flex-grow overflow-hidden">
        <ScrollArea className="w-full h-full">
          <div id="printable-cv">
            <div className="max-w-4xl mx-auto bg-white">
              {/* Header */}
              <header className="bg-gray-800 text-white p-8 print:p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 text-center">
                    <h1 className="text-4xl print:text-3xl font-bold font-display">
                      Yuhan Picos
                    </h1>
                    <p className="text-xl print:text-lg mt-2">
                      Desarrollador de Software en Formación
                    </p>
                  </div>
                  <button
                    onClick={onPrint}
                    className="print:hidden p-2 ml-4 rounded-full hover:bg-gray-700 transition-colors"
                    title="Imprimir / Guardar como PDF"
                  >
                    <Printer size={24} />
                  </button>
                </div>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm print:text-xs">
                  <a
                    href="mailto:yuhanpicos.dev@gmail.com"
                    className="flex items-center gap-2 hover:text-gray-300"
                  >
                    <Mail size={16} />
                    <span>yuhanpicos740@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/+584164973499"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-gray-300"
                  >
                    <Smartphone size={16} />
                    <span>+58 416-4973499</span>
                  </a>
                  <a
                    href="https://github.com/xXYUHANXx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-gray-300"
                  >
                    <Github size={16} />
                    <span>xXYUHANXx</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yuhanpicos2308/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-gray-300"
                  >
                    <Linkedin size={16} />
                    <span>yuhanpicos2308</span>
                  </a>
                </div>
              </header>

              <main className="p-8 print:p-6 text-gray-800">
                {/* Perfil Profesional */}
                <section className="mb-8 print:mb-4">
                  <h2 className="text-2xl print:text-xl font-bold font-display border-b-2 border-gray-300 pb-2 mb-4">
                    Perfil Profesional
                  </h2>
                  <p className="text-justify leading-relaxed">
                    Estudiante del séptimo semestre de Informática, apasionado
                    por la tecnología y el desarrollo de software. Tengo
                    experiencia práctica en un amplio espectro de lenguajes,
                    incluyendo Python, Java, JavaScript y C#, y me especializo
                    en la creación de experiencias web modernas con React y
                    Next.js. Soy un profesional en formación, proactivo y
                    siempre dispuesto a colaborar para entregar soluciones
                    tecnológicas de alto impacto.
                  </p>
                </section>

                {/* Habilidades Técnicas */}
                <section className="mb-8 print:mb-4">
                  <h2 className="text-2xl print:text-xl font-bold font-display border-b-2 border-gray-300 pb-2 mb-4">
                    Habilidades Técnicas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4">
                    <div>
                      <h3 className="text-lg print:text-base font-semibold mb-2">
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
                      <h3 className="text-lg print:text-base font-semibold mb-2">
                        Backend
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Node.js & Express</li>
                        <li>Java & Spring Boot</li>
                        <li>PHP, Python, C# & C/C++</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg print:text-base font-semibold mb-2">
                        Bases de Datos
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>PostgreSQL & MySQL</li>
                        <li>Prisma (ORM)</li>
                        <li>Diseño de Bases de Datos Relacionales</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg print:text-base font-semibold mb-2">
                        Herramientas y Tecnologías
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Git & GitHub</li>
                        <li>Firebase (Auth, Firestore)</li>
                        <li>Google AI & Genkit</li>
                        <li>Framer Motion (Animaciones)</li>
                        <li>WebRTC & WebSockets</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Educación */}
                <section className="mb-8 print:mb-4">
                  <h2 className="text-2xl print:text-xl font-bold font-display border-b-2 border-gray-300 pb-2 mb-4">
                    Educación
                  </h2>
                  <div>
                    <h3 className="text-lg print:text-base font-semibold">
                      Licenciatura en Informática
                    </h3>
                    <p className="text-gray-600">
                      Universidad de Oriente (UDO) | 2022 - Presente
                    </p>
                    <p className="mt-1">
                      Cursando el 7mo semestre, enfocado en desarrollo de
                      software y sistemas de información.
                    </p>
                  </div>
                </section>

                {/* Proyectos */}
                <section>
                  <h2 className="text-2xl print:text-xl font-bold font-display border-b-2 border-gray-300 pb-2 mb-4">
                    Proyectos Destacados
                  </h2>
                  <div className="space-y-6 print:space-y-4">
                    <div>
                      <h3 className="text-lg print:text-base font-semibold">
                        Cargo Track - App de Logística Full-Stack
                      </h3>
                      <p className="text-justify leading-relaxed">
                        Aplicación full-stack para una agencia de envíos,
                        desarrollada para la asignatura 'Diseño de Base de
                        Datos'. El sistema permite a los usuarios registrarse,
                        cotizar envíos y realizar un seguimiento en tiempo real
                        de sus paquetes. Incluye un panel de administración para
                        la gestión de rutas, estados y logística, todo soportado
                        por una base de datos relacional compleja con Next.js,
                        Prisma y PostgreSQL.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg print:text-base font-semibold">
                        Momentos Robin Hood - App de Recetas con IA
                      </h3>
                      <p className="text-justify leading-relaxed">
                        Plataforma web sofisticada para explorar y disfrutar
                        recetas venezolanas. Construida con Next.js, Firebase
                        para la base de datos en tiempo real y autenticación, y
                        enriquecida con Google AI para ofrecer una experiencia
                        de usuario inteligente y moderna.
                      </p>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

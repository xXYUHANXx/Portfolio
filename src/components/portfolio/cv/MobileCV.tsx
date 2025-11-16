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

export function MobileCV({
  onBack,
  onPrint,
}: {
  onBack: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="w-full h-full flex flex-col bg-white font-mono">
      {/* HEADER SUPERIOR */}
      <div className="p-4 flex items-center justify-between border-b-2 border-black sticky top-0 bg-white z-10">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>

        <span className="font-semibold font-display text-sm">
          CURRICULUM VITAE
        </span>

        <button
          onClick={onPrint}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Print or Save as PDF"
        >
          <Printer size={24} />
        </button>
      </div>

      {/* CUERPO COMPLETO – SIN SCROLL INTERNO */}
      <div className="flex-grow overflow-visible print:overflow-visible">
        <div id="printable-cv">
          <div className="max-w-4xl mx-auto bg-white">
            {/* HEADER DE INFORMACIÓN */}
            <header className="bg-gray-800 text-white p-6 print:p-4 font-mono">
              <div className="text-center">
                <h1 className="text-3xl print:text-2xl font-display font-bold">
                  Yuhan Picos
                </h1>

                <p className="text-lg print:text-base mt-1">
                  Desarrollador de Software en Formación
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 mt-4 text-xs font-mono">
                <a
                  href="mailto:yuhanpicos.dev@gmail.com"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <Mail size={14} />
                  <span>yuhanpicos.dev@gmail.com</span>
                </a>

                <a
                  href="https://wa.me/+584164973499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <Smartphone size={14} />
                  <span>+58 416-4973499</span>
                </a>

                <a
                  href="https://github.com/xXYUHANXx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <Github size={14} />
                  <span>xXYUHANXx</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/yuhanpicos2308/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <Linkedin size={14} />
                  <span>yuhanpicos2308</span>
                </a>
              </div>
            </header>

            {/* MAIN */}
            <main className="p-6 print:p-4 text-gray-800 text-sm font-mono">
              {/* PERFIL PROFESIONAL */}
              <section className="mb-6 print:mb-3">
                <h2 className="text-xl print:text-lg font-display font-bold border-b-2 border-gray-300 pb-1 mb-2">
                  Perfil Profesional
                </h2>

                <p className="text-justify leading-relaxed font-mono">
                  Estudiante del séptimo semestre de Informática, apasionado por
                  la tecnología y el desarrollo de software. Cuento con
                  experiencia práctica en diversos lenguajes como Python, Java,
                  JavaScript y C#, con especial enfoque en la construcción de
                  aplicaciones web modernas utilizando React y Next.js. Me
                  considero una persona proactiva, con disposición para aprender
                  y aportar soluciones tecnológicas eficientes.
                </p>
              </section>

              {/* HABILIDADES TÉCNICAS */}
              <section className="mb-6 print:mb-3">
                <h2 className="text-xl print:text-lg font-display font-bold border-b-2 border-gray-300 pb-1 mb-2">
                  Habilidades Técnicas
                </h2>

                <div className="space-y-4 print:space-y-2 font-mono">
                  <div>
                    <h3 className="text-base font-display font-semibold mb-1">
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
                    <h3 className="text-base font-display font-semibold mb-1">
                      Backend
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Node.js & Express</li>
                      <li>Java & Spring Boot</li>
                      <li>PHP, Python, C#, C/C++</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-semibold mb-1">
                      Bases de Datos
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>PostgreSQL & MySQL</li>
                      <li>Prisma (ORM)</li>
                      <li>Modelado de Bases de Datos</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-semibold mb-1">
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

              {/* EDUCACIÓN */}
              <section className="mb-6 print:mb-3">
                <h2 className="text-xl print:text-lg font-display font-bold border-b-2 border-gray-300 pb-1 mb-2">
                  Educación
                </h2>

                <div>
                  <h3 className="text-base font-display font-semibold">
                    Licenciatura en Informática
                  </h3>

                  <p className="text-gray-600 text-xs font-mono">
                    Universidad de Oriente (UDO) | 2022 - Presente
                  </p>

                  <p className="mt-1">
                    Cursando el séptimo semestre, con enfoque en desarrollo de
                    software y sistemas de información.
                  </p>
                </div>
              </section>

              {/* PROYECTOS */}
              <section>
                <h2 className="text-xl print:text-lg font-display font-bold border-b-2 border-gray-300 pb-1 mb-2">
                  Proyectos Destacados
                </h2>

                <div className="space-y-4 print:space-y-3 font-mono">
                  <div>
                    <h3 className="text-base font-display font-semibold">
                      Cargo Track — App de Logística Full-Stack
                    </h3>
                    <p className="text-justify leading-relaxed">
                      Aplicación full-stack para la gestión de envíos, diseñada
                      para la asignatura "Diseño de Base de Datos". Permite
                      registro de usuarios, cotizaciones y seguimiento en tiempo
                      real, además de un panel administrativo para manejo de
                      rutas y logística.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-semibold">
                      Momentos Robin Hood — App de Recetas con IA
                    </h3>
                    <p className="text-justify leading-relaxed">
                      Plataforma web de recetas venezolanas desarrollada con
                      Next.js, Firebase y tecnologías de Google AI, ofreciendo
                      una experiencia moderna y dinámica para el usuario.
                    </p>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

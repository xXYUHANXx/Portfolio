import type { Project } from "@/domain/projects/entities/Project"

export const projectsData: Project[] = [
  {
    id: 123456,
    name: "Portfolio",
    description:
      "Mi portafolio personal interactivo, diseñado como un sistema operativo de escritorio de los 90. Creado con Next.js, TypeScript y Framer Motion.",
    html_url: "https://github.com/xXYUHANXx/Portfolio",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: ["nextjs", "react", "typescript", "tailwindcss", "framer-motion"],
    private: false,
    imageUrl: "https://i.ibb.co/hF6mQXkB/image.png",
    homepageUrl: "https://portfolio-yuhanpicos.vercel.app/",
  },
  {
    id: 789012,
    name: "Momentos Robin Hood",
    description:
      "Una aplicación web sofisticada para explorar y disfrutar recetas venezolanas, construida con Next.js, Firebase y Google AI para ofrecer una experiencia de usuario completa y moderna.",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: [
      "typescript",
      "tailwindcss",
      "nextjs",
      "framer-motion",
      "firebase",
      "google-ai",
    ],
    private: true,
    imageUrl: "https://i.ibb.co/hxFXj1bJ/Portada.jpg",
    homepageUrl: "https://momentosrobinhood.vercel.app/",
  },
  {
    id: 345678,
    name: "Remote Monitoring Web",
    description:
      "Frontend para un sistema de telemedicina y monitoreo remoto, permitiendo videollamadas, chat y seguimiento de signos vitales en tiempo real para un proyecto universitario.",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    topics: [
      "react",
      "typescript",
      "webrtc",
      "websocket",
      "telemedicine",
    ],
    private: true,
    imageUrl: "https://i.ibb.co/RGyYTPqk/Rm-web.png",
  },
  {
    id: 901234,
    name: "Juicy Burgers Meals",
    description:
      "Proyecto básico para 'Interacción Hombre-Máquina'. Simula la interfaz de un restaurante para gestionar comandas y mesas, utilizando HTML, CSS y JavaScript vainilla.",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    topics: ["html", "css", "javascript"],
    private: true,
    imageUrl: "https://i.ibb.co/My4MDXK3/JBM.png",
  },
  {
    id: 567890,
    name: "Cargo Track",
    description:
      "Aplicación full-stack de una agencia de envíos, desarrollada para la asignatura 'Diseño de Base de Datos'. El sistema permite a los usuarios registrarse, cotizar envíos y realizar un seguimiento en tiempo real de sus paquetes. Incluye un panel de administración para la gestión de rutas, estados y logística, todo soportado por una base de datos relacional compleja.",
    html_url: "https://github.com/xXYUHANXx/NEXTJS",
    stargazers_count: 1,
    forks_count: 0,
    language: "TypeScript",
    topics: ["database-design", "tracking-app", "logistics", "nextjs", "typescript", "tailwindcss", "framer-motion", "prisma", "react", "postgresql", "Nodejs"],
    private: false,
  },
];

import { projectsData } from "@/infrastructure/projects/projects-data";
import type { Project } from "@/domain/projects/entities/Project";

export async function fetchGitHubProjects(): Promise<Project[]> {
    // Simula una pequeña demora para mantener la sensación de carga asíncrona si se desea,
    // pero principalmente ahora solo importa los datos locales.
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Devuelve los datos directamente desde el archivo local.
    // Ya no se hace fetch a la API de GitHub.
    return projectsData;
}

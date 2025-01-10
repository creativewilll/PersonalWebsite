import { Project, ProjectType } from '../../types';
import projectsData from './all-projects.json';

interface ProjectsData {
  projects: Array<Omit<Project, 'featured' | 'priority'> & {
    featured?: boolean;
    priority?: number;
  }>;
}

export class ProjectManager {
  private projects: Project[];

  constructor() {
    const data = projectsData as ProjectsData;
    // Initialize with data from JSON, ensuring featured and priority fields exist
    this.projects = data.projects.map(project => ({
      ...project,
      featured: project.featured ?? false,
      priority: project.priority ?? 999
    }));
  }

  // Get all projects
  getAllProjects(): Project[] {
    return [...this.projects].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }

  // Get featured projects
  getFeaturedProjects(): Project[] {
    return this.projects
      .filter(project => project.featured)
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }

  // Get projects by type
  getProjectsByType(type: ProjectType): Project[] {
    return this.projects
      .filter(project => project.type === type)
      .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }

  // Add a new project
  addProject(project: Omit<Project, 'id'>): Project {
    const newProject: Project = {
      ...project,
      id: this.generateProjectId(),
      featured: project.featured ?? false,
      priority: project.priority ?? this.getNextPriority()
    };
    this.projects.push(newProject);
    this.saveProjects();
    return newProject;
  }

  // Update an existing project
  updateProject(id: string, updates: Partial<Project>): Project {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Project with id ${id} not found`);

    this.projects[index] = {
      ...this.projects[index],
      ...updates
    };
    this.saveProjects();
    return this.projects[index];
  }

  // Delete a project
  deleteProject(id: string): void {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error(`Project with id ${id} not found`);

    this.projects.splice(index, 1);
    this.saveProjects();
  }

  // Toggle featured status
  toggleFeatured(id: string): Project {
    const project = this.projects.find(p => p.id === id);
    if (!project) throw new Error(`Project with id ${id} not found`);

    project.featured = !project.featured;
    this.saveProjects();
    return project;
  }

  // Update project priority
  updatePriority(id: string, priority: number): Project {
    const project = this.projects.find(p => p.id === id);
    if (!project) throw new Error(`Project with id ${id} not found`);

    project.priority = priority;
    this.saveProjects();
    return project;
  }

  // Private helper methods
  private generateProjectId(): string {
    return Math.max(...this.projects.map(p => parseInt(p.id)), 0) + 1 + '';
  }

  private getNextPriority(): number {
    return Math.max(...this.projects.map(p => p.priority ?? 0), 0) + 1;
  }

  private saveProjects(): void {
    // In a real application, this would save to a backend
    // For now, we'll just log that changes were made
    console.log('Projects updated:', this.projects);
  }
}

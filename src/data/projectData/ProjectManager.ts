import { Project, ProjectType } from '../../types';
import projectsData from './all-projects.json';
import { projectMarkdownData } from './projectLoader';

interface ProjectsData {
  projects: Array<Omit<Project, 'featured' | 'priority' | 'slug' | 'content' | 'seo' | 'tags' | 'relatedProjects'> & {
    featured?: boolean;
    priority?: number;
    slug?: string;
  }>;
}

export class ProjectManager {
  private projects: Project[];

  constructor() {
    const data = projectsData as ProjectsData;
    
    // Start with markdown projects
    const allProjects: Project[] = [...projectMarkdownData];

    // Merge in JSON projects if they don't exist yet (by slug)
    data.projects.forEach(jsonProj => {
      const slug = jsonProj.slug || jsonProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const existing = allProjects.find(p => p.slug === slug);
      if (!existing) {
        allProjects.push({
          ...jsonProj,
          slug,
          id: jsonProj.id,
          featured: jsonProj.featured ?? false,
          priority: jsonProj.priority ?? 999,
          content: '', // Default empty content
          seo: {
            title: `${jsonProj.title} | William Spurlock`,
            description: jsonProj.description,
            keywords: [],
            ogImage: jsonProj.image,
            publishedTime: new Date().toISOString(),
            modifiedTime: new Date().toISOString(),
          },
          tags: [],
          relatedProjects: []
        } as Project);
      } else {
        // Merge attributes if needed, markdown takes precedence for content-heavy fields
        Object.assign(existing, {
          ...jsonProj,
          ...existing, // existing (markdown) wins
          id: existing.id || jsonProj.id // keep ID consistent if possible
        });
      }
    });

    this.projects = allProjects;
  }

  // Get all projects
  getAllProjects(): Project[] {
    return [...this.projects].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
  }
  
  // Get a specific project by slug
  getProjectBySlug(slug: string): Project | undefined {
    return this.projects.find(p => p.slug === slug);
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

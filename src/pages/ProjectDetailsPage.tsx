import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectManager } from '../data/projectData/ProjectManager';
import { ProjectDetails } from '../components/Projects/ProjectDetails';
import { MetaTags } from '../components/seo/MetaTags';
import { siteUrl } from '../lib/siteUrl';
import { NotFoundPage } from './NotFoundPage';

const projectManager = new ProjectManager();

export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const project = projectManager.getProjectBySlug(slug || '');
  
  if (!project) {
    return <NotFoundPage />;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
      <MetaTags 
        title={project.seo?.title || project.title}
        description={project.seo?.description || project.description}
        image={project.image ? `https://williamspurlock.com${project.image}` : undefined}
        url={siteUrl(`/projects/${slug}`)}
        canonical={siteUrl(`/projects/${slug}`)}
        type="article"
      />
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectDetails project={project} />
      </div>
    </div>
  );
}

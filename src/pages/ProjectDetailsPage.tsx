import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectManager } from '../data/projectData/ProjectManager';
import { ProjectDetails } from '../components/Projects/ProjectDetails';

const projectManager = new ProjectManager();

export function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const project = projectManager.getProjectBySlug(slug || '');
  
  useEffect(() => {
    if (!project && slug) {
      navigate('/projects', { replace: true });
    }
  }, [project, slug, navigate]);
  
  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-12 sm:pt-32 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-10 w-64 bg-purple-200 rounded-lg mb-4 mx-auto"></div>
          <div className="h-4 w-32 bg-purple-100 rounded-lg mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-32">
      <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectDetails project={project} />
      </div>
    </div>
  );
}

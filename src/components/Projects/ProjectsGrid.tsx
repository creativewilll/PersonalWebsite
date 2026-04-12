import React from 'react';
import { Project } from '../../types';
import { ProjectManager } from '../../data/projectData/ProjectManager';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const projectManager = new ProjectManager();

interface ProjectsGridProps {
  selectedType?: 'agent' | 'workflow' | 'fullstack' | 'all';
  showFeatured?: boolean;
}

// Animation variants for project cards
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  idle: {
    rotate: [-0.5, 0.5],
    transition: {
      rotate: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  }
};

export function ProjectsGrid({ selectedType, showFeatured = false }: ProjectsGridProps) {
  const navigate = useNavigate();

  const projects = showFeatured 
    ? projectManager.getFeaturedProjects()
    : projectManager.getAllProjects();

  const filteredProjects = selectedType === 'all'
    ? projects
    : projects.filter(project => project.type === selectedType);

  const handleCardClick = (project: Project) => {
    // Navigate to detailed page
    navigate(`/projects/${project.slug}`);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'fullstack':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'workflow':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'agent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fullstack':
        return 'Full Stack';
      case 'workflow':
        return 'Workflow';
      case 'agent':
        return 'AI Agent';
      default:
        return type;
    }
  };

  return (
    <div className="relative w-full">
      {/* Projects Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
        {filteredProjects.map((project, index) => (
          <motion.div role="article"
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={["animate", "idle"]}
            whileHover="hover"
            custom={index}
            transition={{
              animate: {
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300 bg-white/5 backdrop-blur-[12px] border border-white/10 mx-auto w-full transform hover:-translate-y-1"
            onClick={() => handleCardClick(project)}
          >
            {/* Badges Container */}
            <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap justify-between items-start gap-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeStyles(project.type)} shadow-sm`}
              >
                {getTypeLabel(project.type)}
              </motion.div>
              {project.timeline === "IN PROGRESS" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="px-3 py-1 text-xs font-medium text-amber-900 bg-amber-100 border border-amber-200 rounded-full shadow-sm"
                >
                  In Progress
                </motion.div>
              )}
            </div>

            {/* Project Image */}
            <div className="aspect-[4/3] relative overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-indigo-900/95 via-purple-900/70 to-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Project Info */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4"
              initial={{ y: 10, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2">
                {project.title}
              </h3>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal - Removed as we now use dedicated project pages */}
    </div>
  );
}

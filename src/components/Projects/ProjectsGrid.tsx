import React, { useState } from 'react';
import { Project } from '../../types';
import { ProjectManager } from '../../data/projectData/ProjectManager';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const projects = showFeatured 
    ? projectManager.getFeaturedProjects()
    : projectManager.getAllProjects();

  const filteredProjects = selectedType === 'all'
    ? projects
    : projects.filter(project => project.type === selectedType);

  const handleCardClick = (project: Project) => {
    if (!project.quickViewEnabled) return;
    setSelectedProject(project);
    setTimeout(() => setIsExpanded(true), 50);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => setSelectedProject(null), 300);
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
          <motion.div
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
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 border border-purple-100/30 mx-auto w-full transform hover:-translate-y-1"
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

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: isExpanded ? 1 : 0.9,
                opacity: isExpanded ? 1 : 0,
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-fuchsia-900/95 rounded-2xl overflow-hidden max-w-3xl w-[95%] mx-auto shadow-2xl border border-white/20"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={selectedProject.quickViewImage || selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-purple-800/50 to-transparent" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <p className="text-sm text-gray-300 mb-4">{selectedProject.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Features</h3>
                    <ul className="space-y-1">
                      {selectedProject.features.map((feature) => (
                        <li key={feature} className="text-sm text-gray-300">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Timeline</h3>
                    <p className="text-sm text-gray-300">{selectedProject.timeline}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

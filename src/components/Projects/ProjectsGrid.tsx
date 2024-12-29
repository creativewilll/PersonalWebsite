import React, { useState } from 'react';
import { Project } from '../../types';
import allProjectsJson from '../../data/projectData/all-projects.json';

interface ProjectsData {
  projects: Project[];
}

const allProjectsData = allProjectsJson as ProjectsData;
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsGridProps {
  selectedType: 'agent' | 'workflow' | 'fullstack';
}

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

export function ProjectsGrid({ selectedType }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredProjects = allProjectsData.projects.filter(project => project.type === selectedType);

  const handleCardClick = (project: Project) => {
    if (!project.quickViewEnabled) return;
    setSelectedProject(project);
    setTimeout(() => setIsExpanded(true), 50);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="relative w-full">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg bg-sky-100 border border-sky-200/50 mx-auto w-full max-w-sm"
            onClick={() => handleCardClick(project)}
          >
            {project.timeline === "IN PROGRESS" && (
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                <div className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-amber-900 bg-amber-100 rounded-full border border-amber-200 shadow-sm">
                  In Progress
                </div>
              </div>
            )}
            <div className="aspect-video relative">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-purple-800/50 to-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.85 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4"
              initial={{ y: 10, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white">
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: isExpanded ? 1 : 0.9,
                opacity: isExpanded ? 1 : 0,
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-fuchsia-900/95 rounded-2xl overflow-hidden max-w-4xl w-[95%] sm:w-[90%] mx-auto shadow-2xl border border-white/20"
            >
              <div className="relative aspect-video">
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
              <div className="p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{selectedProject.title}</h2>
                <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-indigo-500/30 rounded-full text-sm text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/30 rounded-full text-sm text-purple-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Timeline</h3>
                    <p className="text-gray-300">{selectedProject.timeline}</p>
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

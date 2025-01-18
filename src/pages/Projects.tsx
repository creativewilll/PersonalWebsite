import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project } from '../types';
import allProjectsJson from '../data/projectData/all-projects.json';
import { Github, ExternalLink, X } from 'lucide-react';

interface ProjectsData {
  projects: Project[];
}

const allProjectsData = allProjectsJson as ProjectsData;

type ProjectType = 'all' | 'agent' | 'workflow' | 'fullstack';

const filters: { type: ProjectType; label: string }[] = [
  { type: 'all', label: 'All Projects' },
  { type: 'agent', label: 'AI Agents' },
  { type: 'workflow', label: 'AI Workflows' },
  { type: 'fullstack', label: 'Applications' }
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  hover: { 
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export function ProjectsPage() {
  const [selectedType, setSelectedType] = useState<ProjectType>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredProjects = allProjectsData.projects.filter(project => 
    selectedType === 'all' ? true : project.type === selectedType
  );

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
    <div className="min-h-screen pt-20 pb-12">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-purple-900/90 to-yellow-700/90 backdrop-blur-md py-12 sm:py-16 mb-8 sm:mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4"
          >
            Project Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-center max-w-2xl mx-auto text-base sm:text-lg"
          >
            Explore my portfolio of AI agents, automation workflows, and full-stack applications
          </motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {filters.map(({ type, label }) => (
            <motion.button
              key={type}
              onClick={() => setSelectedType(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-full transition-all duration-300 ${
                selectedType === type
                  ? 'bg-gradient-to-r from-purple-500 to-yellow-400 text-white shadow-lg'
                  : 'bg-white/80 text-purple-900 hover:bg-white shadow-sm'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        ref={ref}
        initial="initial"
        animate={inView ? "animate" : "initial"}
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="max-w-7xl mx-auto px-2 sm:px-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleCardClick(project)}
            className={`relative bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-md overflow-hidden cursor-pointer 
              transition-all duration-300 flex flex-col h-[220px] sm:h-[320px] ${
              project.quickViewEnabled ? 'hover:shadow-xl' : ''
            }`}
          >
            <div className="relative h-[120px] sm:h-[180px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            <div className="p-2 sm:p-4 flex flex-col flex-grow">
              <h3 className="text-sm sm:text-lg font-semibold text-slate-800 mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-2">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 sm:line-clamp-3 mb-1 sm:mb-2">
                {project.description}
              </p>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex -space-x-1">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <img
                      key={i}
                      src={tech.icon}
                      alt={tech.name}
                      className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white p-0.5 border border-slate-200"
                      title={tech.name}
                    />
                  ))}
                </div>
                
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: isExpanded ? 1 : 0.9,
                opacity: isExpanded ? 1 : 0,
              }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-video md:aspect-auto">
                  <img
                    src={selectedProject.quickViewImage || selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 mt-6">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
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

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ProjectsGrid } from './ProjectsGrid';

type ProjectType = 'agent' | 'workflow' | 'fullstack';

interface ProjectsProps {
  className?: string;
}

export function Projects({ className = '' }: ProjectsProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>('agent');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filters: { type: ProjectType; label: string }[] = [
    { type: 'agent', label: 'AI Agents' },
    { type: 'workflow', label: 'AI Workflows' },
    { type: 'fullstack', label: 'Full-Stack Apps' }
  ];

  return (
    <section id="projects" ref={ref} className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
      <div className="relative w-full sm:w-11/12 lg:w-[90%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                       from-purple-700 to-yellow-500 mb-2 sm:mb-4 px-4">
            Featured Projects
          </h2>
          <p className="text-purple-800 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Interactive project showcase
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center mb-6 sm:mb-8 gap-2 sm:gap-3 px-3 sm:px-2">
            {filters.map(({ type, label }) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base rounded-full transition-all duration-300 whitespace-nowrap ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-purple-500 to-yellow-400 text-white shadow-lg'
                    : 'bg-white/30 text-purple-800 hover:bg-white/40 backdrop-blur-sm'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
          <ProjectsGrid selectedType={selectedType} />
        </motion.div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Brain, Zap } from 'lucide-react';

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      icon: Rocket,
      title: 'Rapid Prototyping',
      description: 'Quick iteration and development of MVPs to test ideas and get feedback fast.'
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Implementing cutting-edge AI solutions to solve complex business problems.'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Enhancing application speed and efficiency for better user experience.'
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Services</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Specialized solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:transform hover:scale-105 transition-all"
              >
                <Icon className="w-12 h-12 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
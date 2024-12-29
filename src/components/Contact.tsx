import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Calendar } from 'lucide-react';
import { PopupWidget } from 'react-calendly';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-gradient-to-b from-teal-950 via-cyan-950 to-sky-950 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-l from-sky-500/10 to-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative w-[80%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                       from-teal-200 via-cyan-200 to-teal-200 mb-4">
            Get in Touch
          </h2>
          <p className="text-teal-200 text-lg max-w-2xl mx-auto">
            Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group flex items-start space-x-4 p-6 rounded-lg bg-gradient-to-br from-teal-900/50 to-cyan-900/50 
                        backdrop-blur-sm border border-teal-700/20 hover:border-teal-600/30 
                        transform transition-all duration-300
                        shadow-lg shadow-teal-900/20 hover:shadow-teal-800/30"
            >
              <Mail className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-teal-200 group-hover:text-teal-100 transition-colors duration-300">
                  Email
                </h3>
                <p className="text-teal-300 group-hover:text-teal-200 transition-colors duration-300 mt-1">
                  creativelywill@gmail.com
                </p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="group flex items-start space-x-4 p-6 rounded-lg bg-gradient-to-br from-teal-900/50 to-cyan-900/50 
                        backdrop-blur-sm border border-teal-700/20 hover:border-teal-600/30 
                        transform transition-all duration-300
                        shadow-lg shadow-teal-900/20 hover:shadow-teal-800/30"
            >
              <MapPin className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-teal-200 group-hover:text-teal-100 transition-colors duration-300">
                  Location
                </h3>
                <p className="text-teal-300 group-hover:text-teal-200 transition-colors duration-300 mt-1">
                  Oakland County, MI
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="group">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-teal-900/30 backdrop-blur-sm 
                         border border-teal-700/20 group-hover:border-teal-600/30
                         rounded-lg text-white placeholder-teal-400
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                         transition-all duration-300"
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-teal-900/30 backdrop-blur-sm 
                         border border-teal-700/20 group-hover:border-teal-600/30
                         rounded-lg text-white placeholder-teal-400
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                         transition-all duration-300"
              />
            </div>
            <div className="group">
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 bg-teal-900/30 backdrop-blur-sm 
                         border border-teal-700/20 group-hover:border-teal-600/30
                         rounded-lg text-white placeholder-teal-400
                         focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                         transition-all duration-300"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full px-8 py-4 rounded-lg font-semibold overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 
                            transition-transform duration-300 group-hover:scale-105" />
              <span className="relative text-white flex items-center justify-center gap-2">
                Send Message
                <Mail className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </motion.form>
        </div>

        {/* Calendly Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-semibold text-teal-200">
                Schedule a Call
              </h3>
            </div>
            <p className="text-teal-300">
              Book a convenient time for us to discuss your project in detail
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 py-4 rounded-lg font-semibold overflow-hidden group mx-auto block"
            onClick={() => {
              const config = {
                url: 'https://calendly.com/velocitysocials',
              };
              // @ts-ignore
              window.Calendly.initPopupWidget(config);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 
                          transition-transform duration-300 group-hover:scale-105" />
            <span className="relative text-white flex items-center justify-center gap-2">
              Schedule Now
              <Calendar className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.button>
          <PopupWidget
            url="https://calendly.com/velocitysocials"
            rootElement={document.getElementById('root') as HTMLElement}
            text="Schedule a Call"
            textColor="#FFFFFF"
            color="#0D9488"
          />
        </motion.div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}

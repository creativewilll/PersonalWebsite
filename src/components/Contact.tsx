import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Calendar } from 'lucide-react';

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="contact" ref={ref} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="relative w-[90%] sm:w-[85%] lg:w-[80%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                       from-purple-700 to-yellow-500 mb-2 sm:mb-4">
            Want to know more? 
          </h2>
          <p className="text-purple-800 text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0">
            Let's get in touch! Fill in your contact info below and send me a message! 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Contact Info Cards */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-lg bg-white/40 
                        backdrop-blur-sm border border-white/40 hover:border-white/60 
                        transform transition-all duration-300
                        shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-purple-500 transition-colors duration-300 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-800 group-hover:text-purple-700 transition-colors duration-300">
                  Email
                </h3>
                <p className="text-sm sm:text-base text-purple-700 group-hover:text-purple-600 transition-colors duration-300 mt-1">
                  creativelywill@gmail.com
                </p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -5 }}
              className="group flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-lg bg-white/40 
                        backdrop-blur-sm border border-white/40 hover:border-white/60 
                        transform transition-all duration-300
                        shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-purple-500 transition-colors duration-300 mt-1" />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-800 group-hover:text-purple-700 transition-colors duration-300">
                  Location
                </h3>
                <p className="text-sm sm:text-base text-purple-700 group-hover:text-purple-600 transition-colors duration-300 mt-1">
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
            className="space-y-4 sm:space-y-6"
          >
            <div className="group">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm 
                         border border-white/40 group-hover:border-white/60
                         rounded-lg text-purple-800 placeholder-purple-400 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50
                         transition-all duration-300"
              />
            </div>
            <div className="group">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm 
                         border border-white/40 group-hover:border-white/60
                         rounded-lg text-purple-800 placeholder-purple-400 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50
                         transition-all duration-300"
              />
            </div>
            <div className="group">
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm 
                         border border-white/40 group-hover:border-white/60
                         rounded-lg text-purple-800 placeholder-purple-400 text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-purple-500/50
                         transition-all duration-300"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-yellow-400 
                            transition-transform duration-300 group-hover:scale-105" />
              <span className="relative text-white flex items-center justify-center gap-2">
                Send Message
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
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
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-purple-800">
                Take Your Spot in my Calendar
              </h3>
            </div>
            <p className="text-sm sm:text-base text-purple-700 px-4 sm:px-0">
              Schedule a quick, 15-minute call with me to discuss your business, goals, and how AI can help take your business to the next level.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold overflow-hidden group mx-auto block"
            onClick={() => {
              const config = {
                url: 'https://calendly.com/velocitysocials',
              };
              // @ts-ignore
              window.Calendly.initPopupWidget(config);
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-yellow-400 
                          transition-transform duration-300 group-hover:scale-105" />
            <span className="relative text-white flex items-center justify-center gap-2">
              Schedule Now
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

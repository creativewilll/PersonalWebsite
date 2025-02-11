import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { UpworkIcon } from './ui/UpworkIcon';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16 lg:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">WS</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Streamlining business processes with advanced AI agents and automations.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:creativelywill@gmail.com" className="flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                creativelywill@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Oakland County, MI
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-sm sm:text-base text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#experience" className="block text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Experience</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Connect</h4>
            <div className="flex gap-3 sm:gap-4">
              <a href="https://github.com/BigRock12123" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://linkedin.com/in/will_spurlock" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01e5f4af96d3c88817?mp_source=share" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <UpworkIcon />
              </a>
              <a href="mailto:creativelywill@gmail.com"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center text-sm sm:text-base text-gray-400">
          <p>© {new Date().getFullYear()} Will Spurlock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { UpworkIcon } from './ui/UpworkIcon';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">WS</h3>
            <p className="text-gray-400">
              Creating exceptional digital experiences through innovative development solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2">
              <a href="mailto:creativelywill@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                creativelywill@gmail.com
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                Oakland County, MI
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
              <a href="#experience" className="block text-gray-400 hover:text-white transition-colors">Experience</a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/BigRock12123" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/will_spurlock" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.upwork.com/freelancers/~01e5f4af96d3c88817?mp_source=share" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <UpworkIcon />
              </a>
              <a href="mailto:creativelywill@gmail.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Will Spurlock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

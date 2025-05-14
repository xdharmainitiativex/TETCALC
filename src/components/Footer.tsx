import { Github, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center text-sm text-gray-600 dark:text-gray-400 gap-x-6 gap-y-3 md:gap-y-0">
          <p className="whitespace-nowrap">
            © 2025 TET Calculator. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 md:gap-y-0">
            <a 
              href="#" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              Terms of Service
            </a>
            <div className="flex items-center whitespace-nowrap">
              <span>Hand crafted with</span>
              <Heart size={14} className="mx-1.5 text-red-500 animate-pulse" />
              <span>by Supratim</span>
            </div>
          </div>
          <a 
            href="https://github.com/SupratimRK" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
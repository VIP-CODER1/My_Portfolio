import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const smoothScrollTo = (elementId) => {
    console.log(`Attempting to scroll to: ${elementId}`);
    
    // Close mobile menu first
    setIsOpen(false);
    
    // Add a small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(elementId) || document.querySelector(`#${elementId}`);
      
      if (element) {
        console.log(`Found element: ${elementId}`);
        
        // Get the element's position
        const elementTop = element.offsetTop;
        const navbarHeight = 80; // Approximate navbar height
        const targetPosition = elementTop - navbarHeight;
        
        // Smooth scroll using window.scrollTo
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
        
        console.log(`Scrolled to position: ${targetPosition}`);
      } else {
        console.log(`Element with ID "${elementId}" not found`);
        // List all available sections for debugging
        const sections = document.querySelectorAll('section[id]');
        console.log('Available sections:', Array.from(sections).map(s => s.id));
        
        // Try to find by partial match
        const allElements = document.querySelectorAll('[id*="' + elementId + '"]');
        if (allElements.length > 0) {
          console.log(`Found similar elements:`, Array.from(allElements).map(el => el.id));
        }
      }
    }, 150);
  };

  return (
    <motion.nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-md shadow-2xl" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => smoothScrollTo("hero")}
              className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent hover:from-yellow-400 hover:to-orange-500 transition-all duration-300"
            >
              Vipul Kumar
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: "Home", id: "hero" },
              { name: "Experience", id: "experience" },
              { name: "Projects", id: "projects" },
              { name: "About", id: "about" },
              { name: "Contact", id: "contact" }
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => smoothScrollTo(item.id)}
                className="relative text-white dark:text-white light:text-gray-900 hover:text-orange-400 transition-colors duration-300 font-medium"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-200/50 backdrop-blur-sm border border-gray-700 dark:border-gray-700 light:border-gray-300 hover:border-orange-400 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800/50 dark:bg-gray-800/50 light:bg-gray-200/50 backdrop-blur-sm border border-gray-700 dark:border-gray-700 light:border-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
            </motion.button>
            
            <motion.button
              onClick={toggleMenu}
              className="text-white dark:text-white light:text-gray-900 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-md rounded-lg border border-gray-700 dark:border-gray-700 light:border-gray-300 overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {[
                  { name: "Home", id: "hero" },
                  { name: "About", id: "about" },
                  { name: "Projects", id: "projects" },
                  { name: "Contact", id: "contact" }
                ].map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(`Mobile menu clicked: ${item.name} -> ${item.id}`);
                      smoothScrollTo(item.id);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(`Mobile menu touched: ${item.name} -> ${item.id}`);
                      smoothScrollTo(item.id);
                    }}
                    className="block w-full text-left px-4 py-3 text-white dark:text-white light:text-gray-900 hover:bg-orange-400/20 hover:text-orange-400 transition-all duration-300 touch-manipulation"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{ touchAction: 'manipulation' }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

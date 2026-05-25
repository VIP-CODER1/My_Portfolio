import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";

// Lazy load components for better performance
const Hero = lazy(() => import("./components/Hero"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// Loading component
const LoadingSpinner = () => (
  <motion.div
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="relative">
      <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-yellow-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
  </motion.div>
);

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900 transition-colors duration-300">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-gray-900 dark:bg-gray-900 light:bg-gray-100"></div>}>
          <Experience />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-gray-900 dark:bg-gray-900 light:bg-gray-100"></div>}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-gray-900 dark:bg-gray-900 light:bg-gray-100"></div>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-gray-900 dark:bg-gray-900 light:bg-gray-100"></div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-gray-900 dark:bg-gray-900 light:bg-gray-100"></div>}>
          <Contact />
        </Suspense>
        <Suspense fallback={<div className="h-32 bg-gray-900 dark:bg-gray-900 light:bg-gray-100"></div>}>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;

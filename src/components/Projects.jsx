import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import GBImage from "../assets/GB.png";
import TTImage from "../assets/TT.png";
import VGImage from "../assets/GYM.png";

const projects = [
  {
    name: "GharBazaar",
    description: "A comprehensive MERN stack real estate platform providing modern and mobile-friendly experience for buying, selling, and listing properties online with advanced search filters and user management.",
    longDescription: "GharBazaar is a full-featured real estate platform built with MongoDB, Express.js, React, and Node.js. It includes features like property listings, advanced search filters, user authentication, admin dashboard, and responsive design. The platform supports image uploads, property categorization, and real-time notifications.",
    link: "https://gharbazaar-nfji.onrender.com/",
    github: "https://github.com/VIP-CODER1/GharBazaar",
    tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    image: GBImage,
    featured: true
  },
 {
    name: "TaskTracker with OpenAI",
    description: "A modern task management application with AI integration, built using MERN stack. Features intelligent task categorization, automated scheduling, and team collaboration tools.",
    longDescription: "This innovative task management system leverages OpenAI's API to provide intelligent task categorization, automated deadline suggestions, and smart project recommendations. Built with a clean, intuitive interface and real-time collaboration features.",
    link: "https://github.com/VIP-CODER1/Task-Tracker-with-OpenAI",
    github: "https://github.com/VIP-CODER1/Task-Tracker-with-OpenAI",
    tech: ["React", "Node.js", "MongoDB", "OpenAI API", "Socket.io"],
    image: TTImage,
    featured: true
  },
 {
    name: "VIP-GYM-CLUB",
    description: "Comprehensive gym management system designed for both gym owners and fitness enthusiasts. Features membership tracking, workout planning, and administrative tools.",
    longDescription: "A complete gym management solution with member registration, workout tracking, payment processing, and administrative dashboard. Includes features for personal trainers to manage clients and track progress.",
    link: "https://github.com/VIP-CODER1/VIP-GYM-CLUB",
    github: "https://github.com/VIP-CODER1/VIP-GYM-CLUB",
    tech: ["React", "Node.js", "MongoDB", "Express", "JWT"],
    image: VGImage,
    featured: false
  },
  {
    name: "SmartImage Compressor",
    description: "Advanced image compression tool supporting multiple formats with adjustable compression ratios. Optimizes images while maintaining quality for web applications.",
    longDescription: "A client-side image compression tool that supports JPEG, PNG, and WebP formats. Features batch processing, quality adjustment, and preview functionality. Built with modern web technologies for optimal performance.",
    link: "https://vip-coder1.github.io/Image_Compressor/",
    github: "https://github.com/VIP-CODER1/Image_Compressor",
    tech: ["HTML5", "JavaScript", "Canvas API", "CSS3"],
    image: "/api/placeholder/600/400",
    featured: false
  },
  {
    name: "CodeCraft Academy",
    description: "Interactive coding platform similar to GeeksforGeeks with problem-solving challenges, contests, and comprehensive tutorials for programming enthusiasts.",
    longDescription: "A comprehensive coding platform featuring algorithmic problems, coding contests, tutorial system, and progress tracking. Includes code editor with syntax highlighting and real-time execution.",
    link: "https://vip-coder1.github.io/CodeCraft-Academy/",
    github: "https://github.com/VIP-CODER1/CodeCraft-Academy",
    tech: ["React", "JavaScript", "CSS3", "Local Storage"],
    image: "/api/placeholder/600/400",
    featured: false
  },
  {
    name: "Dynamic Exam Scheduler",
    description: "Intelligent exam scheduling system with automated invigilator assignment, conflict detection, and resource optimization for educational institutions.",
    longDescription: "An advanced scheduling system that automatically assigns invigilators, detects scheduling conflicts, and optimizes resource allocation. Features include room management, time slot optimization, and reporting capabilities.",
    link: "https://github.com/VIP-CODER1/exam_time-management",
    github: "https://github.com/VIP-CODER1/exam_time-management",
    tech: ["Python", "Django", "SQLite", "Algorithm Design"],
    image: "/api/placeholder/600/400",
    featured: false
  }
];

// 3D Tilt Card Component
const ProjectCard = ({ project, index, onDetailsClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  return (
    <motion.div
      ref={ref}
      className="group relative h-96 perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 3D Tilt Effect */}
      <motion.div
        className="relative w-full h-full transition-transform duration-300"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Card */}
        <div className={`absolute inset-0 backdrop-blur-sm rounded-2xl border overflow-hidden group-hover:border-orange-400 transition-all duration-300 ${
          isDark 
            ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700" 
            : "bg-gradient-to-br from-gray-100/90 to-gray-200/90 border-gray-300"
        }`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-2xl"></div>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-yellow-500 text-black text-xs font-bold rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className={`px-2 py-1 text-xs rounded-full border ${
                    isDark 
                      ? "bg-gray-700/50 text-gray-300 border-gray-600" 
                      : "bg-gray-300/50 text-gray-700 border-gray-400"
                  }`}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className={`px-2 py-1 text-xs rounded-full border ${
                  isDark 
                    ? "bg-gray-700/50 text-gray-300 border-gray-600" 
                    : "bg-gray-300/50 text-gray-700 border-gray-400"
                }`}>
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Project Image */}
            {project.image && typeof project.image !== 'string' && (
              <div className="mb-4 h-32 rounded-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Project Title */}
            <h3 className={`text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors duration-300 ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              {project.name}
            </h3>

            {/* Project Description */}
            <p className={`text-sm leading-relaxed flex-grow mb-6 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
              
              <motion.button
                onClick={() => onDetailsClick(project)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg hover:border-orange-400 hover:text-orange-400 transition-all duration-300 ${
                  isDark 
                    ? "border-gray-600 text-gray-300" 
                    : "border-gray-400 text-gray-700"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                Details
              </motion.button>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.1 : 0 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, isOpen, onClose }) => {
  const { isDark } = useTheme();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            className={`relative rounded-2xl border max-w-4xl w-full max-h-[90vh] overflow-y-auto ${
              isDark 
                ? "bg-gray-900 border-gray-700" 
                : "bg-white border-gray-300"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-300 ${
                isDark 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <X className={`w-6 h-6 ${isDark ? "text-white" : "text-gray-900"}`} />
            </button>

            {/* Modal Header */}
            <div className={`p-8 border-b ${isDark ? "border-gray-700" : "border-gray-300"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{project.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
              key={index}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          isDark 
                            ? "bg-gray-800 text-gray-300 border-gray-600" 
                            : "bg-gray-200 text-gray-700 border-gray-400"
                        }`}
                      >
                        {tech}
                      </span>
          ))}
        </div>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project Image */}
                <div className={`rounded-lg h-64 flex items-center justify-center border overflow-hidden ${
                  isDark 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-gray-100 border-gray-300"
                }`}>
                  {project.image && typeof project.image === 'string' && project.image.startsWith('/api/placeholder') ? (
                    <span className={isDark ? "text-gray-500" : "text-gray-400"}>Project Screenshot</span>
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  )}
                  <span 
                    className={`${isDark ? "text-gray-500" : "text-gray-400"} hidden`}
                    style={{ display: 'none' }}
                  >
                    Project Screenshot
                  </span>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>About This Project</h3>
                  <p className={`leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {project.longDescription}
                  </p>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </motion.a>
                    
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-6 py-3 border rounded-lg hover:border-orange-400 hover:text-orange-400 transition-all duration-300 ${
                          isDark 
                            ? "border-gray-600 text-gray-300" 
                            : "border-gray-400 text-gray-700"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        Source Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isDark } = useTheme();

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "featured" 
    ? projects.filter(p => p.featured)
    : projects.filter(p => p.tech.includes(filter));

  return (
    <section id="projects" className={`py-20 text-white dark:text-white light:text-gray-900 overflow-hidden transition-colors duration-300 ${
      isDark 
        ? "bg-gradient-to-br from-black via-gray-900 to-black" 
        : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"
    }`}>
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-400 light:text-gray-600 max-w-3xl mx-auto mb-8">
            Explore my portfolio of innovative projects showcasing modern web technologies and creative problem-solving
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["all", "featured", "React", "Node.js", "Python"].map((filterOption) => (
            <motion.button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === filterOption
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-black"
                  : "bg-gray-800 dark:bg-gray-800 light:bg-gray-200 text-gray-300 dark:text-gray-300 light:text-gray-700 hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-300 hover:text-orange-400"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onDetailsClick={setSelectedProject}
            />
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default Projects;

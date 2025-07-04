import React from "react";

const projects = [

  {
    name: "GharBazaar",
    description: "GharBazzar is a MERN stack real estate platform that provides a modern and mobile-friendly experience for buying, selling, and listing properties online.",
    link: "https://gharbazaar-nfji.onrender.com/",
  },

 {
    name: "TaskTracker with OpenAI ",
    description: "A modern Task Tracker with OpenAI application built with the MERN stack (MongoDB, Express, React, Node.js) and enhanced with OpenAI integration. TaskTracker helps teams organize, assign, and track tasks efficiently with a beautiful and intuitive interface.",
    link: "https://github.com/VIP-CODER1/Task-Tracker-with-OpenAI",
  },
   
 {
    name: "VIP-GYM-CLUB",
    description: "All-in-one solution for managing gym operations efficiently and effectively,Whether you're a gym owner or a fitness enthusiast, our system is designed to cater to your needs.",
    link: "https://github.com/VIP-CODER1/VIP-GYM-CLUB",
  },
  {
    name: "SmartImage Compressor",
    description: "Compress images of various formats (JPEG, PNG). Adjustable compression ratio for customization.",
    link: "https://vip-coder1.github.io/Image_Compressor/",
  },
  {
    name: "Coding Platform like GeeksforGeeks",
    description: "Developed a coding platform similar to GeeksforGeeks. Implemented features for problem-solving, contests, and tutorials.",
    link: "https://vip-coder1.github.io/CodeCraft-Academy/",
  },
  {
    name: "Dynamic Exam Scheduler",
    description: "An exam scheduling system with invigilator duty assignment.",
    link: "https://github.com/VIP-CODER1/exam_time-management",
  },
  
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-gray-900 text-gray-100">
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-orange-500">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="transform hover:scale-[1.1] transition duration-300 p-6 rounded-lg shadow-[0_10px_15px_-3px_rgba(255,165,0,0.4),0_4px_6px_-2px_rgba(255,165,0,0.1)]"
            >
              <h3 className="text-2xl font-bold mb-2 text-yellow-500">{project.name}</h3>
              <p className="mb-4">{project.description}</p>
              <a href={project.link} className="text-blue-500 hover:underline">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

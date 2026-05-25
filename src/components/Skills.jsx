import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Braces,
  Workflow,
  Brain,
} from "lucide-react";

const skills = [
  { name: "Frontend (React / Next.js)", icon: Code2, color: "#ff6b35", level: 92 },
  { name: "Backend & REST APIs", icon: Server, color: "#4ecdc4", level: 88 },
  { name: "Databases (SQL & NoSQL)", icon: Database, color: "#45b7d1", level: 82 },
  { name: "TypeScript / JavaScript", icon: Braces, color: "#3178c6", level: 90 },
  { name: "Integrations & Automation", icon: Workflow, color: "#f9ca24", level: 85 },
  { name: "DSA & Problem Solving", icon: Brain, color: "#6c5ce7", level: 80 }
];

const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "white" },
  { name: "Node.js", color: "#68a063" },
  { name: "Express", color: "white" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "REST APIs", color: "#ff6b35" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB", color: "#4db33d" },
  { name: "Python", color: "#3776ab" },
  { name: "HTML5", color: "#e34f26" },
  { name: "CSS3", color: "#1572b6" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Three.js", color: "red" },
  { name: "AWS", color: "#ff9900" },
  { name: "Git & GitHub", color: "#f05032" }
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-clip"
    >
      <div className="container mx-auto px-4">
        {/* Skills */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-orange-400">
            Skills & Expertise
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                onHoverStart={() => setHoveredSkill(index)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <div className="relative p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 group-hover:border-orange-400 transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <motion.div
                      className="mb-4 flex justify-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon
                        className="w-8 h-8 text-orange-400"
                        style={{ color: hoveredSkill === index ? skill.color : "#ff6b35" }}
                      />
                    </motion.div>
                    <h4 className="font-semibold text-white mb-2">{skill.name}</h4>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 mt-1">{skill.level}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-4xl font-bold text-center mb-12 text-orange-400">
            Tech Stack
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div
                  className="px-6 py-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 group-hover:border-opacity-50 transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: `${tech.color}40`,
                    boxShadow: `0 0 20px ${tech.color}20`
                  }}
                >
                  <span
                    className="font-medium text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
